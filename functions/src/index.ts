import * as functions from "firebase-functions";
import express from 'express';
import bodyParser from "body-parser";
import _ from "lodash";
import axios from "axios";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { CloudTasksClient, protos } from "@google-cloud/tasks";

import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";

initializeApp();

const client = new CloudTasksClient();
const db = getFirestore();

const app = express()

app.use(bodyParser.json());

// Helius webhook checking NFT events
app.post("/hook", async(req, res) => { 
    const { type, timestamp, events, nativeTransfers } = req.body[0];

    // Get NFT Metadata
    const { mint } = events.nft.nfts[0]    
    const fetchMetadataUrl = `https://api.helius.xyz/v0/tokens/metadata?api-key=${process.env.HELIUS_SECRET!}`
    const { data } = await axios.post(fetchMetadataUrl, { mintAccounts: [mint]})

    // Get Database Reference
    const docRef = data[0].offChainData?.name.split('#')[1];
    const nftRef = db.collection("Destruct").doc(docRef.toString());
    const doc = (await nftRef.get()).data();

    // Google Cloud Tasks setup
    const project = 'destruct';
    const queue = 'update-metadata-queue';
    const location = 'us-central1';
    const url = 'https://us-central1-destruct.cloudfunctions.net/widgets/update-metadata';
    const serviceAccountEmail = "destruct@appspot.gserviceaccount.com";
    
    // Construct the fully qualified queue name.
    const parent = client.queuePath(project, location, queue);

    // NFT SALE EVENT
    // 1. Check if royalties were paid
    // 2. Schedule a task to update the NFTs metadata after countdown runs out
    // 3. Update Database -> set a countdown start time

    if (type === "NFT_SALE") {
      // 1. Check royalties
      const royaltyReceiver = "3NoPerEGS1JpPA6FGYpPfKJ8QUkBjYPngST2pwpQt7ED";
      const sfbp = 500;
      const saleAmount = events.nft.amount
      const royaltiesToPay = saleAmount * sfbp / 10000;
      const royaltyPayment = _.find(nativeTransfers, { toUserAccount: royaltyReceiver})

      let royaltiesPaid = false;

      if (royaltyPayment) {
        if (royaltyPayment.amount === royaltiesToPay) {
          console.log("Royalties were paid!");
          royaltiesPaid = true;
          
        } else {
          const amountPaid = royaltyPayment.amount / royaltiesToPay;
          console.log(amountPaid + " of royalties were paid!");
        }
      } else {
        console.log("Royalties were NOT paid!");
      }

      let taskName;
      // 2. Schedule Task
      if (!royaltiesPaid) {

        const inSeconds = doc?.lifespan;
        const payload = { mint };

        const task = protos.google.cloud.tasks.v2.Task.fromObject({
          httpRequest: {
            headers: {
              'Content-Type': 'application/json',
            },
            httpMethod: 'POST',
            url,
            body: Buffer.from(JSON.stringify(payload)).toString("base64"),
            oidcToken: {
              serviceAccountEmail
            }
          },
          scheduleTime: {
              seconds: inSeconds + Date.now() / 1000
            }
        })

        // Send create task request.
        console.log('Sending task:');
        const request = { parent: parent, task: task };
        const [response] = await client.createTask(request);
        taskName = response.name;
        console.log(`Created task ${response.name}`);
      }

      // 3. Update Database Entry
      await nftRef.update({
        staked: false,
        countdownStartTime: royaltiesPaid ? null : timestamp, // if royalties were paid start time is set to null; else using timestamp of sales tx
        royaltiesPaid: royaltiesPaid,
        taskName: taskName
      })

    } else if (type === "DEPOSIT_GEM") {
      // NFT STAKE EVENT
      // 1. Cancel Task if existant
      // 2. Update Database -> Pause countdown

      // 1.
      if (doc?.taskName) {
        const task = {
          name: doc?.name
        }

        // Send create task request.
        console.log('Sending task:');
        const [response] = await client.deleteTask(task);
        console.log(`delete task ${response}`); 
      }

      // 2.
      await nftRef.update({
        staked: true,
        countdownStartTime: null, // countdown is stopped and reseted to full lifespan duration
        taskName: ""
      });

    } else if (type === "WITHDRAW_GEM") {
      // NFT UNSTAKE EVENT
      // 1. Schedule task
      // 2. Update database -> Continue countdown

      // 1. 
      const inSeconds = doc?.lifespan;
      const payload = { mint };

      const task = protos.google.cloud.tasks.v2.Task.fromObject({
        httpRequest: {
          headers: {
            'Content-Type': 'application/json',
          },
          httpMethod: 'POST',
          url,
          body: Buffer.from(JSON.stringify(payload)).toString("base64"),
          oidcToken: {
            serviceAccountEmail
          }
        },
        scheduleTime: {
            seconds: inSeconds + Date.now() / 1000
          }
      })

      // Send create task request.
      console.log('Sending task:');
      const request = { parent: parent, task: task };
      const [response] = await client.createTask(request);
      console.log(`Created task ${response.name}`);

      // 2.
      await nftRef.update({
        staked: false,
        countdownStartTime: timestamp, // countdown is stopped and reseted to full lifespan duration
        taskName: response.name
      });

    } else if (type === "REPAY_ROYALTIES") {
      // TODO: Possible when Helius supports programs with published IDLs
      // NFT REPAY ROYALTIES EVENT
      // 1. Cancel Task if existant
      // 2. Update Database -> Reset and pause countdown / prolongate countdown
    }
    
    res.status(200).end()
})

// Update Metadata
app.post("/update-metadata/", async(req, res) => {  
  const { mint } = req.body;

  const connection = new Connection(process.env.RPC_URL!);
  const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.KP!)))
  
  const metaplex = new Metaplex(connection).use(keypairIdentity(keypair));
  const nft = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(mint) })
  console.log("Updating " + nft.name);

  // Update Metadata
  // await metaplex.nfts().update({
  //   nftOrSft: nft,
  //   name: "expired"
  // })
  
  res.status(200).end();
})

exports.widgets = functions.https.onRequest(app)