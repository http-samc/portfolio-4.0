---
title: QuickCite
description: A simple Python package for autogenerating MLA citations 💨
important: false
cover: /assets/img/quickcite-demo.png
tags:
    - CLI
    - Python
---

## It Started With Too Many Ads
Have you ever had to create a bibliography for a school research paper? If you have, then you've almost certainly used a site like [EasyBib](https://www.easybib.com/). These sites are needlessly slow and rich... with ads. When I saw [Formatically](https://formatically.com/)'s citation engine, I knew I was onto something.

## Installation
QuickCite is available on PyPI as [QuickCite](https://pypi.org/project/QuickCite/), where it has over 3,000 downloads. It can be installed with pip:

` pip install QuickCite`

The project is also open sourced on GitHub at [@smrthQuickCite](https://github.com/http-samc/QuickCite).

## What I Learned
Though this project may appear to be a simple PyPI package, I really ended up learning about reverse-engineering from it. When I was using Formatically, I noticed that there was a post request being made to `https://formatically.com/api/website`. By mimicking the form data, I realised that I could simulate a user with [requests](https://pypi.org/project/requests/). From there, it was basic object oriented programming to flush out the module itself.

I also learned how to set up a UnitTest, which I did [here](https://github.com/http-samc/QuickCite/blob/main/TestQuickCite.py). Though I don't set these up for every project (since I believe there's a right place and a right time to do so), this was a case where I found having tests to be quite useful.

## Extras
QuickCite is used by [@smrth/Cut-It](/projects/Cut-It), where it provides `AutoCite` functionality.