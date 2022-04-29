---
title: CasEel
description: A Chrome Extension for autosaving UIUC Netmath notebooks 📝
important: false
cover: https://lh3.googleusercontent.com/C6wmAZep50YIhiAfaM-BcgYLFDfP-d8UT07AZtVsOoLG9aUHBTx5e5HqHxmZ2p2_W9fTMv2j3Bb6HimV5rMJcx3-tf8=w640-h400-e365-rj-sc0x00ffffff
tags:
    - Chrome Extension
    - JavaScript
---

## It All Started With Lost Homework...

After a long night of work for my Calc III class offered at my high school via the [University of Illinois' NetMath system](https://netmath.illinois.edu/), I fell asleep in my chair. Unfortunately, by the time I woke up, my computer had shut itself off and the [Mathematica](https://www.wolfram.com/mathematica/) notebook that contained hours of work was lost with it. That's why I created CasEel, which, besides being a play on the NetMath system name (CAS-ILE), introduces autosaving functionality to the platform.

## How Do I Get It?

Because NetMath/CAS-ILE is a web-based platform, CasEel is offered via a Chrome Extension and can be installed [here](https://chrome.google.com/webstore/detail/caseel/flbmfehmclddmndggkkljocomalibaim) on the Chrome Webstore. Once installed (on any device that can run Google Chrome), it runs automatically on `courseware.illinois.edu`, saving every 30 seconds. The project is also open sourced on GitHub at [http-samc/CasEel](https://github.com/http-samc/caseel)

Here's what the extension looks like - I had to scratch out some sensitive information and actual course content (since it is protected by UIUC copyright law), but the extension is still completely visible in the top right.

![CasEel Demo](https://lh3.googleusercontent.com/C6wmAZep50YIhiAfaM-BcgYLFDfP-d8UT07AZtVsOoLG9aUHBTx5e5HqHxmZ2p2_W9fTMv2j3Bb6HimV5rMJcx3-tf8=w640-h400-e365-rj-sc0x00ffffff)

## What I Learned

The frontend of this app was nothing new, I made the actual UI (though minimal) using Bootstrap 5 (which I already knew). However, this was the first Chrome Extension I've ever created and deployed, so I learned a lot of the basics of interacting with Google's APIs and requesting permissions in the app's `manifest.json`.

All in all, I think Google did a great job with creating a simple API - creating a Chrome Extension should feel right at home for anyone familiar with Node.

## Extras

If you're a NetMath student, I reccommend installing [Gabe Classon](https://github.com/gabeclasson/)'s [AutoCCM](https://chrome.google.com/webstore/detail/auto-ccm/dlgmdmfhbfloafhofedpblnahenmnikh) - it automatically finds and typesets (Control + M) your explanations, saving you time and frustration.