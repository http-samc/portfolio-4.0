---
title: Holler
description: Speak what's on your mind 🗣
important: false
cover: null
tags:
    - Mobile App
    - React Native
    - JavaScript
---

## What is it?
Do you want a relaxed, judgment-free zone to say what's on your mind? Then Holler is the right fit for you. Simply log in with a free account and get to chatting. Messages are automatically deleted 5 seconds after viewing, and you get an awesome personalized avatar to chat as!

Get the Holler on the [Play Store](https://play.google.com/store/apps/details?id=dev.smrth.holler), the [App Store](https://apps.apple.com/us/app/holler/id44718213), or access it anywhere at [holler.smrth.dev](https://holler.smrth.dev)!

## What I learned?
I made this app with React Native. This was my first time dealing with an app that required real-time updates. Fortunately, using the Firebase Web SDK, I was able to leverage React hooks to create a seamless experience. For my web deployment, I specified some separate components using regular React libraries (when universal options were not possible) using the `*.js` and `*.native.js` schemas.

You can check out the source code on GitHub at [http-samc/holler](https://github.com/http-samc/holler).


## Functionality
- Email/Password authentication with Firebase Auth
- Realtime Firestore backend to update messages
- Automatically generated TTL for messages (5 sec.)
- Random + Unique user profile picture based off email hash

## UI

${fragments/hollerImgs.html}$
