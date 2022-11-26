# DESTRUCT
DESTRUCT is an NFT project based on the idea of 'life-span' for NFT's. Check out the video below to understand the concept. 

[![Watch the video](https://img.youtube.com/vi/krO8dXZs_PE/maxresdefault.jpg)](https://youtu.be/krO8dXZs_PE)


**Description**

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
