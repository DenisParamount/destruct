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

### Potential Impact

Bringing the life-span idea to NFT space brings on a lot of new frontiers. Each collection can become deflationary this way, which can help increase the floor price for a project (law of supply and demand). Moreover, it can bring a sort of gamified process to the whole space, cause now people won't just trade NFT's, they will will have to take that life-span into account (first come fisrt serve at it's finest). Futhermore, people will finally be able to check out the project to see if they like it (and pay no money for it), which can help people be more satisfied with the space in general. The whole idea of life-span is also hand in hand with decentralisation, since people decide whether to burn the NFT or not. Things like NFT 'cemetery' (all NFT's that turned black) can come into existence, which will be a very interesting thing to see. There are tons of ways and creative opportunities that can be designed using a life-span mechanism. 

### Functionality 

As of now, project is functioning off-chain using Helius and Google cloud (all code and description of the process can be found bellow). We are currently working on a on-chain solution using CLockwork. 

### Novelty

Yes, there were ways to make diflationary collections in the past (like DeGods PHBT), but they didn't really work out and weren't used for monitisation, whilst our idea is new and unique and offers not only an interesting solution, but presents multiple ways for project to get monitisation and provides a fun experience for buyers. 

## Technical Description

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

### Technicals

Initially we set this tool up with google cloud-functions and a google Firestore database. We know that’s not optimal and we want to move away from this asap. We are already developing an on-chain solution with the innovative solution of Clockwork. When they launch on main-net we’ll be able to rely entirely on on-chain account updates to trigger and schedule actions after an NFT’s lifespan has run out.

## Additional Solution

### Dynamic Royalties 

The other solution that we had in mind, which didn't make it's way onto this repository was: Dynamic Royalties. Essentially similar to the idea of Dynamic Pricing which some projects use during mint, Dynamic Royalties are supposed to make it more likable for a buyer to pay royalties at all. But unlike the Dynamic Pricing, Dynamic Royalties can be calculated just by recalculating the average for every next buyer. You just add the value of royalties paid by previous customer to the summ of all the royalties and devide it by total sales that happened. The reason we didn't write any code for it is becasue to our knowledge it requires an acess to Magic Eden to implement. 

### Benefits 

In this case, buyers will have a new option to pay royalties (other than zero, half, full). Moreover, this can be looked upon as a 'fair' price for the royalties, since people decide what they are willing to pay for the project. Decentralisation at it's best. If the project is great, thus more people are likely to pay higher royalties and 'fair' price will be closer to 'true' price (royalty percetage set by project as default royalty rate). If the project is a rug, thus people will be more prone to pay no royalties and a 'fair' price will also be remenicent of projects 'true' value. 

Therefore, people will now be able to pay a royalties which are 'fair' and keep the benefits (given paying no royalties will bear punishment), which is supposed to decrease the number of people who don't pay royalties at all. Yes, there also might be decrease in people paying full royalties, but if the 'fair' price is close to 'true' price, this isn't very likely and projects can implement reward systems for people who pay full royalties. 

Moreover, this can encourage and stimuly projects to perform a better job at what they to, because now their income will be fully dependent on the customer satisfaction with their work. This way we can get rid of bad and untrustworthy projects and make the whole space better in general. 

## Strategy suggestion

The way we see it, Magic Eden did really suffer a market share loss after making royalties optional and given that OpenSea made a statement that they will remain having royalties enforced, there is now a demand to have a new progressive strategy in terms of royalty enforcement. Of course I propose the usage of our DESTRUCT mechanism, which will offer the middle ground for buyers no other marketplace has, but moreover, in our humble opinion, dynamic royalties can really be another great solution to the problem. Also, if we take into the account the work of Yuga Labs (which are essentially the leaders in the NFT space), they have all their royalties set <5%. Thus, perhaps following another route of Dynamic Pricing, specifically by using competitor-based pricing, MagicEden can in the future set the cieling for all new projects that want to be listed at 5%, therefore making it more attractive to buyers. The magic number of 5% proved itself on variety of projects as 'maintanable' (not too low and not too high), thus in our minds we see it as perfect number for all the projects going forward.  
