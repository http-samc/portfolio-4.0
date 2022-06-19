---
title: Madlibz
description: A Madlibs app, coded natively for Android 🗯
important: false
cover: https://images-na.ssl-images-amazon.com/images/I/81wP7Qwx8VL.jpg
tags:
    - Mobile App
    - Android Native
    - Java
---

## Madlibz is _____ (adjective)!
Madlibz was created as a proof-of-concept for my understanding of native Android code. It does all the major things you'd expect an app to do:
- Use [SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences) to save app information on close.
- Make API calls with [Request Volley](https://developer.android.com/training/volley).
    - Fun fact, the API is actually hosted on this site, check the [/api/madlibz](/api/madlibz) endpoint!
- Use `strings.xml` to store static string values.
- Use `anim/` to animate Views.
- Use `drawables` and `JSON` to dynamically render Views.
- Contain and navigate through multiple activities.
- Provide `Toast` notifications when things go wrong.
- Make Views scrollable when needed.
- Have 'polishing features', eg. images and app icon.

The code itself is open sourced on GitHub at [@http-samc/madlibz](https://github.com/http-samc/madlibz). If you want to run it, make sure you have a recent version of [Android Studio](https://developer.android.com/studio) installed along with an emulator running on Android API >= 30. The UI is designed to scale appropriately for both tablets and phones, so don't worry about choosing the wrong device.