---
title: Stake
description: A decentralized stock market 📈
important: true
cover: https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/932/732/datas/original.png
tags:
    - JavaScript
    - React.js
    - Geist UI
    - Gun.js
    - Website
    - Next.js
    - Hackathon
---

**Note: This project was a part of a hackathon submission, so it was built in a weekend and is not a complete project by any means. I did win $500 in prize money though (best in category)!**

*Be sure to check out the [DevPost](https://devpost.com/software/stake-wguzpx) submission*

## What is it?
Stake is a decentralized platform connecting Investors and Businesses. It allows Investors to authenticate via Google and browse a marketplace of companies on the platform. They can purchase shares using Bitcoin via a custom payment gate.

Once paid for, shares appear as assets in the user's dashboard and are bound to their wallet's key. They can transfer at will to other BTC wallets by inputting their public key.

As for companies, they are verified using their domains: they need to add a randomly generated `.txt` file to a specific path on their site to prove ownership. Otherwise, they can't join the marketplace!

Stake provides a revolutionary platform for the economy. Ventures and Investors can interact, for the first time, completely anonymously while leveraging the security of the blockchain.

## Try It Out!
Check out [stake.smrth.dev](https://stake.smrth.dev) for the live demo. The source code is available on GitHub at [@http-samc/stake](https://github.com/http-samc/stake).

Check out the video demo on [YouTube](https://youtu.be/DGr8_7Ac5ow).

## How does it work?
Stake is written in Javascript. The site is built with React and hosted via Next.js. Database + Auth is provided via Firebase, and the Bitcoin payment gateway is fully custom.