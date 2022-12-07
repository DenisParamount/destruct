# DESTRUCT
DESTRUCT is a project based on the idea of a 'life-span' for NFTs. Check out the video below to understand the concept (Yes, the picture is clickable and leads to the YouTube video). Or you can check it out via the link: https://youtu.be/krO8dXZs_PE 

[![Watch the video](https://img.youtube.com/vi/krO8dXZs_PE/maxresdefault.jpg)](https://youtu.be/krO8dXZs_PE)

## Abstract

DESTRUCT is based on the idea of 'life-span'. Each NFT gets a 24 hour countdown which starts whenever a person buys an NFT without rolyaties. The countdown is terminated if royalties/fee is payed on projects' website or when it's sold to another person with royalties. Monetisation for the project is based on the tweaks that can be done with the countdown and metadata: prolongation/termination of countdown, changes in metadata (rarity, attributes, benefits) based on the countdown, 'revival' of NFT through payment. Off-chain solution is developed using Helius API and Google Cloud, on-chain solution is being developed using Clockwork. 

## Description

DESTRUCT is a social experiment. DESTRUCT is something new, something fresh. DESTRUCT is art. DESTRUCT is you. 

We created DESTRUCT to bring on a new fresh look into the NFT space, along with an interesting solution to the royalty 'problem'.

The core concept of our solution is a ‘life-span’ mechanism for NFTs. Let me explain. For example, you want to buy an NFT from a marketplace like Magic Eden. Simple as that, you buy it, pay royalties and get all the benefits. But what happens if you don’t pay them? You can’t access their Discord server, maybe your NFT has even disappeared, bad things. 

Well, here is where we come in. Since you decided to use DESTRUCT, each NFT that was sold without royalties now has a, say, 24-hour countdown, ‘life-span’ as we call it. It’s a ticking clock that every NFT with unpaid royalties gets. 

You might be wondering: so what, my NFT just dies? 

Not exactly. If you stake your NFT - then the countdown is paused. You can also pay royalties or a fee on the site of the project and then the countdown is either terminated or prolongated. You can also sell your NFT, in which case the countdown is canceled if royalties have been paid by a new buyer or renewed if otherwise. If in any case, the clock runs out - DESTRUCTION. Metadata of your NFT changes: benefits are revoked, rarity changes or it turns into a useless black square. Project decides. 

What are the benefits? 

In our opinion, it’s the golden middle for everyone. You wanna trade? Fine, trade it, but be cautious about the ‘life span’. You wanna see if the project is worth it? Even better, you have 24 hours to check it out and if everything is cool, pay and stay. You wanna hold? Perfect, pay the royalties and hold. 

### Potential Impact

Bringing the life-span idea to NFT space brings on a lot of new frontiers. Each collection can become deflationary this way, which can help increase the floor price for a project (law of supply and demand). Moreover, it can bring a sort of gamified process to the whole space, cause now people won't just trade NFTs, they will have to take that life-span into account (first come first serve at it's finest). Furthermore, people will finally be able to check out the project to see if they like it (and pay no money for it), which can help people be more satisfied with the space in general. The whole idea of life-span is also hand in hand with decentralization since people decide whether to burn the NFT or not. Things like NFT 'cemetery' (all NFTs that turned black) can come into existence, which will be a very interesting thing to see. There are tons of ways and create opportunities that can be designed using a life-span mechanism.  

### Novelty

An actual deflationary collection. New way of monetisation for projects based on the 'life-span' mechanism. Fun and thrilling experience for buyers. 

## Technical Description

### Current version

The tool's main function is to keep track of the state of each NFT of a collection.

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

### Moving from centralized services to an on-chain solution

At the moment our system is reliant on centralized infrastructure. We use **Helius** to track NFT events and use **google firebase** to store each NFTs state. Additionally, we use **google tasks** to schedule the event that should happen once the lifespan runs out.

The main problems here are the scheduling of the transaction that alters the NFTs metadata once the lifespan runs out and the tracking of NFT events which in Solana Terms would be listening to on-chain account changes.

But there's a solution on the way: Clockwork.

Clockwork is an open-source automation engine that enables developers to schedule transactions and automate smart contracts without relying on centralized infrastructure.

Now with Clockwork we directly listen to account changes like an NFT being sold, staked, etc., and use those as triggers to schedule a transaction in the future. In 24 hours let’s say that’s the lifespan that the applicable NFT has.

In conclusion, Clockwork will be the inevitable future of the Destruct solution. Currently, their automation engine is live on Solana’s devnet and they plan to release it on the mainnet very soon. When that happens we’ll be ready to implement it into DESTRUCT.


## Additional Solution

### Dynamic Royalties 

The other solution that we had in mind, which didn't make its way onto this repository was: Dynamic Royalties. Essentially similar to the idea of Dynamic Pricing which some projects use during mint, Dynamic Royalties are supposed to make it more likable for a buyer to pay royalties at all. But unlike Dynamic Pricing, Dynamic Royalties can be calculated just by recalculating the average for every next buyer. You just add the value of royalties paid by the previous customer to the sum of all the royalties and divide it by the total sales that happened. The reason we didn't write any code for it is that to our knowledge it requires access to Magic Eden to implement. 

### Benefits 

In this case, buyers will have a new option to pay royalties (other than zero, half, or full). Moreover, this can be looked upon as a 'fair' price for the royalties, since people decide what they are willing to pay for the project. Decentralization at its best. If the project is great, thus more people are likely to pay higher royalties and the 'fair' price will be closer to the 'true' price (royalty percentage set by the project as the default royalty rate). If the project is a rug, thus people will be more prone to pay no royalties and a 'fair' price will also be reminiscent of the project's 'true' value. 

Therefore, people will now be able to pay royalties that are 'fair' and keep the benefits (given paying no royalties will bear punishment), which is supposed to decrease the number of people who don't pay royalties at all. Yes, there also might be a decrease in people paying full royalties, but if the 'fair' price is close to the 'true' price, this isn't very likely and projects can implement reward systems for people who pay full royalties. 

Moreover, this can encourage and stimulate projects to perform a better job at what they do because now their income will be fully dependent on customer satisfaction with their work. This way we can get rid of bad and untrustworthy projects and make the whole space better in general. 

## Strategy suggestion

The way we see it, Magic Eden did suffer a market share loss after other marketplaces were not enforcing royalties and people went to those. Making royalties optional and given that OpenSea made a statement that they will remain to have royalties enforced, there is now a demand to have a new progressive strategy in terms of royalty enforcement. Of course, I propose the usage of our DESTRUCT mechanism, which will offer the middle ground for buyers no other marketplace has, but moreover, in our humble opinion, dynamic royalties can be another great solution to the problem. Also, if we take into account the work of Yuga Labs (which are essentially the leaders in the NFT space), they have all their royalties set at <5%. Thus, perhaps following another route of Dynamic Pricing, specifically by using competitor-based pricing, MagicEden can in the future set the ceiling for all new projects that want to be listed at 5%, therefore making it more attractive to buyers. The magic number of 5% proved itself on a variety of projects as 'maintainable' (not too low and not too high), thus in our minds, we see it as a perfect number for all the projects going forward.
