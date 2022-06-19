---
title: Github Activity API
description: An embed API for showing off Github events!
important: false
cover: /assets/img/github-activity-example.png
tags:
    - API
    - TypeScript
---

## What is it?
This API leverages Github's [Events API](https://docs.github.com/en/rest/reference/activity#events) and creates cool shell-themed embeds for you to use in whatever you want. It finds the most recent supported Github event and returns html (like the one below):

Sample HTML:
` <iframe src="https://smrth.dev/api/github-activity/http-samc" style="width: 100%; height: 70px, padding: 0px, border: 0px" />`

Result (embeded via iframe):
<iframe src="/api/github-activity/http-samc" style="width: 100%; height: 70px, padding: 0px, border: 0px" />

## foo

As of now, it supports the following Github events:
1. PushEvent
2. CreateEvent
3. DeleteEvent
4. ForkEvent
5. IssuesEvent
6. PullRequestEvent
7. WatchEvent


## Documentation
- `/api/github-activity/:user`: Get html that describes what the most recent supported activity was.
- [Sample 'GET' URL](/api/github-activity/http-samc)
- Rate limiting from Github's API on the server running this API is possible. I do use authenticated requests with my [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), so I should have a higher threshold, but it isn't infinite.



*Disclaimer: This site is ran on limited resources. I make its API's publicly available, but I am not responsible for any breakage nor do I provide any guarantee of uptime.*