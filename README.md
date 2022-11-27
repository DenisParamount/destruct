# DESTRUCT
DESTRUCT is an NFT project based on the idea of 'life-span' for NFT's. Check out the video below to understand the concept. 

[![Watch the video](https://img.youtube.com/vi/krO8dXZs_PE/maxresdefault.jpg)](https://youtu.be/krO8dXZs_PE)

**Potential Impact**

Bringing the life-span idea to NFT space brings on a lot of new frontiers. Each collection can become deflationary this way, which can help increase the floor price for a project (law of supply and demand). Moreover, it can bring a sort of gamified process to the whole space, cause now people won't just trade NFT's, they will will have to take that life-span into account (first come fisrt serve at it's finest). Futhermore, people will finally be able to check out the project to see if they like it (and pay no money for it), which can help people be more satisfied with the space in general. The whole idea of life-span is also hand in hand with decentralisation, since people decide whether to burn the NFT or not. Things like NFT 'cemetery' (all NFT's that turned black) can come into existence, which will be a very interesting thing to see.


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
