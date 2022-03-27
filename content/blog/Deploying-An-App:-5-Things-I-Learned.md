---
title: 'Deploying An App: 5 Things I Learned'
description: null
author: Samarth Chitgopekar
date: 7/25/21
important: true
source: https://dev.to/httpsamc/test-post-1921
cover: https://www.practicalecommerce.com/wp-content/uploads/2017/08/Computer-code.jpg
tags:
    - DevOps
    - Python
    - DevJournal
---

<details>
<summary>Read this if you want details about the actual app - this will not impact your understanding of my tips!</summary>
<br>

6 months ago, I set out to develop the perfect evidence procurement tool for High School Debate. That 'perfect tool' happened to be Cuttr:
[![Cuttr](https://i.gyazo.com/585c01b237054e6aa99e89c9093727e7.png)](https://gyazo.com/585c01b237054e6aa99e89c9093727e7)
Pretty quickly, some friends gave me their two cents and the program evolved into Cut-It. This was the first application I wanted to deploy to thousands of regular people. Here's what our latest beta version looked like:
![Cut-It Beta](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3rjej1yf0abx223li0yt.png)
Finally, this summer, after months of work, I launched Cut-It 1.0, our first release version. If you thought the jump from Cuttr to Cut-It beta was cool, check this out:
![Cut-It 1.0](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/68s3faqyz4imlfguhb3e.png)

I'm aware many of you have no idea what makes this project useful because High School Debate tech isn't exactly commonplace in dev circles. Luckily that's not the point of this post. When deploying Cut-It, I had to go through several hurdles and frankly, if I were rebuilding this project from scratch, I would do it completely differently. My advice should apply to anyone, so that's the point of this writeup.
</details>
<br>

**Obligatory Promotion: Cut-It is [open-sourced](https://github.com/http-samc/cut-it) and we're looking for contributors! You can get it at [cutit.cards](http://cutit.cards).**

Before we start, let me briefly explain the tech stack for Cut-It:
- The project is written in Python
- Qt (PyQt5) is used as a GUI framework (Cuttr used tkinter, though I quickly realized this was far too underpowered)
- Binaries are built with PyInstaller

Now, here's my advice:

## 1. Don't use Python.
Although I like it's easy syntax, I found PyInstaller to be shaky at best. After working with Go (a compiled language), I got jealous of how easy it was to build and ship packages since it builds to a single binary. For reference, when I tried using the `--onefile` option with PyInstaller, it took me almost 20 seconds to run the program.

This comparsion might not be the fairest (Go is compiled, Python is interpreted), but the difference still stands. Even with other interpreted languages like Javascript, build processes still felt a lot cleaner. That could just be me, but regardless, I'd still go with Go over Python - especially now that it seems to have well-developed (albeit unofficial) [Qt bindings](https://github.com/therecipe/qt).

## 2. Have multiple devices ready.
If you want to create a cross-platform desktop app, you're going to want to deploy on Windows and MacOS at a minimum, and probably Linux too. Windows and Linux are easy to do, but MacOS is a pain if you don't have a Mac. I tried using [Scaleway](http://scaleway.com/), a Mac rental service, to rent a Mac to run PyInstaller on. It was a nightmare. The lag was unbearable and I had to end up building it on a friend's Macbook Air.

If you want to shell out $25/day (1 day minimum due to Apple's license) you can rent an instance from [AWS](https://aws.amazon.com/ec2/instance-types/mac/). I'd imagine the lag would be minimal, since the servers would be in the US whereas Scaleway's are all in Paris. This project is open sourced and has no sponsorships, so I really didn't want to spend hundreds of dollars a year just to build it for MacOS, which is why I just decided to buy a Mac. This way, I can run Windows 10 with [Bootcamp](https://support.apple.com/boot-camp), Linux, and OSX on the same device.

## 3. Keep some cash on you.
Even if you're keeping your project free, you're still going to have to pay $99/yr. for Apple's [Developer Program](https://developer.apple.com/enroll/) to get a Mac certificate (albeit Apple's price also gets you access to deploy to the iOS and Mac App Stores, among other things) and about $100 to get a 1 yr. Windows certificate from a [provider](https://docs.microsoft.com/en-us/windows-hardware/drivers/dashboard/get-a-code-signing-certificate). I consider these to be investments in yourself as a developer rather than a particular project, so I register them under my name. This way, I don't have to buy new certificates anytime I want to distribute something (though if you're building a major application you might want to consider doing so).

Keep in mind, this is a nice-to-have feature if you're building for developers - most of us will know the pains of getting certificates and it won't significantly harm your downloads to users conversion factor. However, if you're considering deploying to the 'general population', it becomes a requirement if you want people to actually use your program - those warning messages can be concerning. MacOS doesn't even immediately present you with the option to open an unsigned file, which is why I'd reccommend getting an OSX certificate through the Apple Developer Program over a Windows one if you have to pick.

## 4. Think ahead.
If you're going to be pushing any form of an update to your code, you need either an autoupdater or a built-in update notifier. Now the first option is still more difficult than it has to be - I haven't found a good cross platform autoupdater. I chose to implement a built-in update notifier instead. Here's a generic rundown of what I did:

```python
On start:
1. Poll the GitHub releases page (using the GitHub API) for the latest release
 - If the latest release version == the current software version, ignore the rest of these steps and load directly to the program
2. In the release description, check for a throwaway tag marked '<req>' signaling that the update is required
 - If the update is required, don't offer a 'Continue without Updating' option
3. Find out what platform the code is running on
4. In the 'assets' section of the release on GitHub, find the target installer (Windows: dist-win.msi, MacOS: dist-mac.pkg).
5. Set the 'Update Now' button to open the 'browser_download_url' of the appropriate installer
```
Just like that, you can use GitHub's Releases API to maintain control over your codebase. The format for accessing your releases through the api is: `https://api.github.com/repos/{USERNAME}/{REPO_NAME}/releases`.

Here's what [https://api.github.com/repos/http-samc/cut-it/releases](https://api.github.com/repos/http-samc/cut-it/releases) looks like (various nonpretinent information omitted for brevity):
```json
[
  {
    "url": "https://api.github.com/repos/http-samc/cut-it/releases/44302713",
    "node_id": "MDc6UmVsZWFzZTQ0MzAyNzEz",
    "tag_name": "v.1.0@Release",
    "target_commitish": "main",
    "name": "Cut-It Release Version 1.0",
    "created_at": "2021-06-08T19:23:24Z",
    "published_at": "2021-06-08T19:35:56Z",
    "assets": [
      {
        "url": "https://api.github.com/repos/http-samc/cut-it/releases/assets/40352177",
        "id": 40352177,
        "name": "dist-mac.pkg",
        "content_type": "application/octet-stream",
        "download_count": 35,
        "created_at": "2021-07-15T11:32:26Z",
        "updated_at": "2021-07-15T11:34:02Z",
        "browser_download_url": "https://github.com/http-samc/cut-it/releases/download/v.1.0%40Release/dist-mac.pkg"
      },
      {
        "url": "https://api.github.com/repos/http-samc/cut-it/releases/assets/40350931",
        "id": 40350931,
        "name": "dist-win.msi",
        "download_count": 40,
        "created_at": "2021-07-15T11:17:55Z",
        "updated_at": "2021-07-15T11:19:59Z",
        "browser_download_url": "https://github.com/http-samc/cut-it/releases/download/v.1.0%40Release/dist-win.msi"
      }
    ],
    "tarball_url": "https://api.github.com/repos/http-samc/cut-it/tarball/v.1.0@Release",
    "zipball_url": "https://api.github.com/repos/http-samc/cut-it/zipball/v.1.0@Release",
    "body": "<req> ... {omitted for brevity}",
  },
...
]
```

## 5. Know how to build installers.
This one's simple. No one wants to go through the pain of downloading, unzipping, deleting and replacing your program files/assets every time they update or install. Once again, there's obviously no crossplatform solution to this, but unfortunately, it's something you need to do reagardless. I'll keep it quick with what I used (both are free):
- Windows: [Advanced Installer](https://www.advancedinstaller.com/?utm_source=adwords&utm_medium=paid&utm_campaign=advancedinstaller&gclid=Cj0KCQjwl_SHBhCQARIsAFIFRVVsdjATYT_z4_JyATlznPCVGK8FiAmcnhu0XfWvjvLnchEXFsedpZgaAtTTEALw_wcB)
- MacOS: [pkgbuild](https://www.manpagez.com/man/1/pkgbuild/) (this is built in and shockingly easy to use)

## Bonus Tip!!!
**Don't build a desktop application.** At least don't make it your go-to. After finishing up all of Cut-It's targeted functionality, I quickly realized the entire project could've been implemented quicker in vanilla JavaScript. Looking back, I remember reading the Qt docs thinking "What's the Qt method for `window.getSelection()`?".

I think the best way to build any GUI app is just with the HTML/CSS/JS stack. If you need a "real" desktop app (accesses filesystem, etc.), you can use a JS framework, with the most popular being [Electron](https://www.electronjs.org/). I'm reimplementing Cut-It as a vanilla JS site that's a progressive web app. These are being championed by lots of big companies, and you can read about how Google is doing so in Chrome (v.70+) [here](https://www.simicart.com/blog/desktop-pwa/).

This also solves the compilation and installer development issue. Because it's a web app, you never need an autoupdater. If you're using something like AWS Elsastic Beanstalk with their [Code Pipeline](https://aws.amazon.com/getting-started/hands-on/continuous-deployment-pipeline/) to host your site, you can just push to main and instantly update your user's apps. Moreover, you don't need to worry about paying for certificates.