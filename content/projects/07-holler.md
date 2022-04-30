---
title: Holler
description: Speak what's on your mind 🗣
important: false
cover: https://play-lh.googleusercontent.com/4itUDAFK0SC_B-b9arkdw03O96QbMhvcKx6gl61ZqSrGgLflHN610eZieE1bNmXX--B0=s180-rw
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

You can check out the source code on GitHub at [@smrth/holler](https://github.com/http-samc/holler).


## Functionality
- Email/Password authentication with Firebase Auth
- Realtime Firestore backend to update messages
- Automatically generated TTL for messages (5 sec.)
- Random + Unique user profile picture based off email hash

## UI

<details>
<summary>View Screenshots</summary>

![Holler Splash](https://is3-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/96/77/b6/9677b6c8-c94d-11fb-40b0-bd6148dba10e/9525b03d-d555-480b-b925-e28d6d07a389_Simulator_Screen_Shot_-_iPhone_13_Pro_Max_-_2021-11-21_at_16.30.12.png/1284x2778bb.png)

![Holler Authentication](https://is4-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/88/c8/3c/88c83cd6-ad70-8430-8efa-c3ae599da0ac/153ce562-feb6-4201-b539-d950f0506f73_Simulator_Screen_Shot_-_iPhone_13_Pro_Max_-_2021-11-21_at_16.30.17.png/1284x2778bb.png)

![Holler Messaging](https://is4-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/50/41/b6/5041b6eb-0907-5a04-8bb1-5850bfe48a29/1043b223-2f71-4098-97e1-dc68650b5f81_Simulator_Screen_Shot_-_iPhone_13_Pro_Max_-_2021-11-21_at_16.32.11.png/1284x2778bb.png)

</details>

<br>