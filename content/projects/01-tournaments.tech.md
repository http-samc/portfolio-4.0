---
title: Tournaments.Tech
description: The most popular debate ranking site 🏆
important: true
cover: /assets/img/t-tech-web-demo.png
tags:
    - Website
    - Bootstrap 5
    - Mongo DB
    - JavaScript
---

## It Started With A Problem
High School debate didn't have any accurate ranking sites. [TheDebateWatch](https://thedebatewatch.com) provided spotty, inaccurate data and didn't include crucial statistics, such as team aliases and speaker points - not to mention the lack of a ranking system alltogether. Every other major high school sport has one. So, debate, which has an ultra-competitive bid-based [Tournament of Champions](https://ci.uky.edu/UKDebate/gold-pf-bid-tournaments) shouldn't be any different. That's why I created [Tournaments.Tech](http://tournaments.tech), the best debate ranking + database site that leverages the [@smrth/Tabroom-API](/projects/tabroom-API) that now has over **100,000** hits.

## What I Learned & How It Works
Every weekend, the Tabroom-API's new results are added to a [mongo.db](https://www.mongodb.com/) cloud database. From there, the site's Node.js backend maps a query endpoint to the databse (passing in authentication on the server-side). This is what enables the site to access the millions of lines of documents that make it so useful.

To make the site, I decided to stick to JQuery, vanilla JavaScript, and Bootstrap 5. I could've certainly used a framework like [React.js](https://reactjs.org/), but that didn't make a lot of sense to me. Bootstrap took care of all the styling I needed, and the rendering could easily be done in a single client side .js file. Any framework would end up compiling a to a rough-equivilant of my low-level code anyway, and the project was formulaic enough that I didn't see a real use for a one.

To generate the leaderboard, I used [DataTables.js](https://datatables.net/) to supercharge my html table with pagification, sorting, and filtering.

When desigining the team-view, I focused on readability, opting for `<details>` elements to produce dropdowns and using intuitive emojis to bring life to statistics.

The project itself is hosted on AWS, using a CodeDeploy CodePipeline connected to a Compute.EC3 instance. This allows the site to update anytime I push a change to the GitHub repository and scale when we need it to.