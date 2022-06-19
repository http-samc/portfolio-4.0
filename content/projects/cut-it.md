---
title: Cut-It
description: The speech and debate card-cutting tool of the future ✂️
important: true
cover: https://github.com/http-samc/cut-it/blob/main/ui_images/home.png?raw=true
tags:
    - Desktop App
    - Python
---

## There Has To Be A Better Way
High school debate is ultra-competitive. Debaters competing nationally can very well spend thousands of dollars flying across the country to participate in [prestigious tournaments](https://ci.uky.edu/UKDebate/gold-pf-bid-tournaments) and face fierce competition. Even though there's certainly a performance aspect, debate is a research activity at its core.

In all divisions, competitors must understandably 'cut' (or format) various sources of evidence to substantiate their 'cases' (arguments). Ideally, this means taking the time to format evidence something like this:

```python
<author name> '<year published>
<publisher/source>
<author qualification>

normal text normal text normal text EMPHASIZED TEXT
normal text normal text normal text normal text
normal text normal text EMPHASIZED TEXT normal text
normal text ...
```

Here, "EMPHASIZED TEXT" is the part of the evidence debaters read in speeches. It should be a larger font size than normal text, bolded, underlined and highlighted (depending on preference).

Unfortunately, debaters oftentimes have too much work and too little time, and the quality of evidence takes the hit. This isn't just a matter of styling preference - high quality evidence is key to ensuring the fairness of the game.

That's why I invented Cut-It, a desktop applicaiton that makes formatting cards a breeze.

## What Does It Do?
Cut-It speeds up your workflow in 3 key ways:
1. AutoCut: Cut-It will generate an MLA & debate-grade citation (using [@http-samc/QuickCite](/projects/QuickCite)) and get the full text of your article with **only** a URL.
2. Custom Emphasis Levels: Cut-It offers 3 emphasis levels that can be fully customized to your liking (bolding, underlining, font-size, highlight color, etc.) that are accessible via shortcuts and buttons. These macros make formatting your evidence a breeze.
3. Card History: The fastest way to cut a card is to not have to cut it in the first place. Debaters often reuse evidence, but recut the card simply because they couldn't find it. Cutting cards with Cut-It means that each card is locally saved to your device and searchable through Card History.

## How Do I Get It?
Downloads (Windows, MacOS) for Cut-It are hosted (alongside a full features list) on [cutit.cards](http://cutit.cards), with documentation available at [docs.cutit.cards](https://docs.cutit.cards).

The project is also open sourced on GitHub at [@http-samc/Cut-It](https://github.com/http-samc/cut-it) and API documentation is available at [Cut-It/DOCS.md](https://github.com/http-samc/cut-it/blob/main/DOCS.md).

## What I Learned
Cut-It uses a proper GUI framework, [PyQt5](https://pypi.org/project/PyQt5/), in order to power its desktop applications. I didn't have any prior experience with Qt, but [Adithya](https://www.linkedin.com/in/adithyav-/) (the R&D lead for Cut-It) reccommended that I use it because of its cross-platform nature (which allows us to deploy to both Windows and MacOS with one codebase).

Because I knew that I was going to push updates, I designed an autoupdating framework that polled a backend to check for new versions of the app. This allows the user to accept or deny the update (only if it is non-critical) while getting a fully-detailed breakdown of the update, including version number, date, bug fixes, new features, etc.

I knew that I wanted Cut-It to work for anyone, so user customizeability was going to be a key factor. I wanted to store all data in a standard .json file, so I used [userpaths](https://pypi.org/project/userpaths/) to allow me to get a cross-platform reference to the current user's documents folder (where I could store the app data). From there, I set up a durable dictionary schema that allows me to store and apply all the user's settings/preferences. Here's what it looks like from their perspective:

![Setting Preferences](https://i.gyazo.com/0cb80d383fd61967bc195b5fd7bb4e28.gif)

![Recording Shortcuts](https://i.gyazo.com/7578500b474330b3ac9fec7449733115.gif)

Even though the platform itself is very powerful, Qt's default look is very dated. To combat this, I used [QtModern](https://pypi.org/project/qtmodern/) to give my app a simple yet beautiful theme that also greatly standardizes the appearance of the app on both Windows and MacOS. On top of that, it also lets me implement both light and dark modes easily.

![Toggling Themes](https://i.gyazo.com/109ee829cf8983af67d2d4ff5a98a4e7.gif)

As a fun bonus, I included a 'SuperBrowser' that uses [Selenium](https://selenium-python.readthedocs.io/) to load a soft paywall bypass extension (open source and legal), which helps debaters maximize the number of sources they can turn to for evidence.