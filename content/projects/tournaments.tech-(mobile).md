---
title: Tournaments.Tech (mobile)
description: The best debate rankings on the go 🏃‍♂️
important: false
cover: null
tags:
    - Mobile App
    - React Native
    - JavaScript
---

## What is it?
[tournaments.tech](http://tournaments.tech) is the largest and most accurate debate ranking system. We made this resource because there were no holistic rankings for the public forum national circuit, and existing record curations fail to collect sufficient quality data. Our speedy API delivers you the results from the latest national circuit tournaments just minutes after they occur, and you can stay up to date with instant push notifications. You can use our automated bid list (with ghost bid support) to check your progress on qualifying for the Tournament of Champions. Or, just run a quick search to get intel on your next opponent!

Get the tournaments.tech app on the [Play Store](https://play.google.com/store/apps/details?id=dev.smrth.tech.tournaments) or the [App Store](https://apps.apple.com/us/app/tournaments-tech/id1598829136), or access it anywhere at [tournaments.tech](http://tournaments.tech)!

## What I learned?
I made this app with React Native. I already wrote the API to get the data from [tabroom](https://tabroom.com) (available at [http-samc/tabroom-API](https://github.com/http-samc/tabroom-API)) and have endpoints set up for the web version of the app (read more at [@smrth/tournaments.tech](/projects/tournaments.tech)). This app centered around tying everything together into a mobile package. I maintained most of the styling from the website, and a lot of my work focused on lower level things like fetching raw json. Unlike my other mobile app projects that have more specific use cases, I built this system to scale extremely large, so I didn't want to use [Firebase 🔥](https://firebase.google.com) because the fees stack up quickly. So, I had to make a lot of calls to my own API that pulls from my [mongodb](https://mongodb.cloud) database.

You can check out the source code on GitHub at [http-samc/tournaments.tech-mobile](https://github.com/http-samc/tournaments.tech-mobile).

## Functionality
- Pulls from the Web API (so they're always in sync)
- Provides browser modal to access issue/feedback reporting
- All functional views are native screens
- Scaleable design (phones and tablets)
- Push notifications to alert users of added tournaments (provided by [native notify](https://nativenotify.com/dashboard))
- Search view by team code or name(s)
- Built in Bid List (rendered from markdown)
- About page that details when the dataset was last updated
- Custom leaderboard table component with pagination
    - uses display height to calculate the optimal amount of rows
    - adds in dummy rows to prevent table from getting smaller on the last page (if ENTRIES % ROWS doesn't equal 0)
- Swipe down to refresh Bid List and Leaderboard

## UI

<details>
<summary>View Screenshots</summary>

![Tournaments.Tech Leaderboard](https://is5-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/6e/81/6e/6e816e88-8d41-a278-b4c8-9ec9fa9fed49/e8347d76-1176-4fbf-9464-254597e2b5a4_Simulator_Screen_Shot_-_iphone_6.5_13pm_-_2021-12-05_at_19.08.01.png/1284x2778bb.png)

![Tournaments.Tech Team View](https://is3-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/7a/9c/57/7a9c5729-a853-4664-c66f-c90ac036328b/0c900d97-6280-4bc2-8927-1e089f160f98_Simulator_Screen_Shot_-_iphone_6.5_13pm_-_2021-12-05_at_19.08.23.png/1284x2778bb.png)

![Tournaments.Tech Bid List](https://is5-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/cc/67/da/cc67da99-7fb4-7e2c-c50c-8aab2c665889/304def8e-a979-4f42-b06f-212499ec33a5_Simulator_Screen_Shot_-_iPhone_13_Pro_Max_-_2021-12-05_at_19.21.27.png/1284x2778bb.png)

![Tournaments.Tech Team Lookup](https://is3-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/37/6a/13/376a138b-f770-c1b1-e4b1-671c6d7be216/556e895d-dfe3-4865-b852-50126a8c62fe_Simulator_Screen_Shot_-_iphone_6.5_13pm_-_2021-12-05_at_19.11.16.png/1284x2778bb.png)

</details>

<br>