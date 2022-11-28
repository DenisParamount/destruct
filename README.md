# DESTRUCT
DESTRUCT is a project based on the idea of 'life-span' for NFT's. Check out the video below to understand the concept. 

[![Watch the video](https://img.youtube.com/vi/krO8dXZs_PE/maxresdefault.jpg)](https://youtu.be/krO8dXZs_PE)

## Description

DESTRUCT is a social experiment. DESTRUCT is something new, something fresh. DESTRUCT is art. DESTRUCT is you. 

We created DESTRUCT to bring on a new fresh look into the NFT space, along with an interesting solution to the royalty 'problem'.

The core concept of our solution is a ‘life-span’ mechanism for NFT’s. Let me explain. For example, you want to buy an NFT that is currently available. Simple as that, you buy it, pay royalties and get all the benefits. But what happens if you don’t pay them? You can’t access their Discord server, maybe your NFT has even dissappeared, bad things. 

Well, here is where we come in. Since you decided to use DESTRUCT, each NFT that was sold without royalties now has a, say, 24 hour countdown, ‘life-span’ as we call it. It’s a ticking clock which every NFT with unpaid royalties gets. 

You might be wondering: so what, my NFT just dies? 

Not exactly. If you stake your NFT - then the countdown is paused. You can also pay royalties or a fee on the site of the project and then countdown is either terminated or prolongated. You can also sell your NFT, in which case the countdown is canceled if royalties have been paid by new buyer or renewed if otherwise. If by any case the clock runs out - DESTRUCTION. Metadata of your NFT changes: benefits are revoked, rarity changes or it turns into a useless black square. Project decides. 

But what’s the benefits? 

In our opinion, it’s the golden middle for everyone. You wanna trade? Fine, trade it, but be cautious about the ‘life-span’. You wanna see if the project is worth it? Even better, you have 24 hours to check it out and if everything is cool, pay and stay. You wanna hold? Perfect, pay the royalties and hold. 

**Potential Impact**

Bringing the life-span idea to NFT space brings on a lot of new frontiers. Each collection can become deflationary this way, which can help increase the floor price for a project (law of supply and demand). Moreover, it can bring a sort of gamified process to the whole space, cause now people won't just trade NFT's, they will will have to take that life-span into account (first come fisrt serve at it's finest). Futhermore, people will finally be able to check out the project to see if they like it (and pay no money for it), which can help people be more satisfied with the space in general. The whole idea of life-span is also hand in hand with decentralisation, since people decide whether to burn the NFT or not. Things like NFT 'cemetery' (all NFT's that turned black) can come into existence, which will be a very interesting thing to see. There are tons of ways and creative opportunities that can be designed using a life-span mechanism. 

**Functionality** 

As of now, project is functioning off-chain using Helius and Google cloud (all code and description of the process can be found bellow). We are currently working on a on-chain solution using CLockwork. 

**Novelty**

Yes, there were ways to make diflationary collections in the past (like DeGods PHBT), but they didn't really work out and weren't used for monitisation, whilst our idea is new and unique and offers not only an interesting solution, but presents multiple ways for project to get monitisation and provides a fun experience for buyers. 

**Technical Description**

The tools main function is to keep track of the state of each NFT of a collection.

```
NftState {
	is_staked: boolean
	is_listed: boolean
	lifespan: number // e.g. 24 hours
	countdown_start_time: timestamp
	royalties_paid: boolean
}
```

The tool detects an NFT event (e.g. Unstaking/Staking, Listing, Sale, etc) and updates the NFT’s state accordingly. If an event triggers the lifespan countdown to start, another action is scheduled at the end of the time of lifespan to change the metadata of the NFT (or another action). 

Now there is urgency! If you don’t trigger an event that resets or freezes the countdown, there will be negative consequences for your NFT!

**Technicals**

Initially we set this tool up with google cloud-functions and a google Firestore database. We know that’s not optimal and we want to move away from this asap. We are already developing an on-chain solution with the innovative solution of Clockwork. When they launch on main-net we’ll be able to rely entirely on on-chain account updates to trigger and schedule actions after an NFT’s lifespan has run out.
