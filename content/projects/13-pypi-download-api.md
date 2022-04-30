---
title: PyPI Download API
description: The simplest badge api for cumulative PyPI downloads 🧮
important: false
cover: /assets/img/pypi-downloads-demo.png
tags:
    - API
    - Python
---

This API allows you to get the total amount of downloads any [PyPI](https://pypi.org) project has gotten throughout its existence. It employs the use of [PyPI Stats](https://pypistats.org/) (which provides monthly download breakdowns) and [Badge Maker](https://www.npmjs.com/package/badge-maker) (which powers the badge endpoint). I primarily made this API for myself, as I like to know how many people are using packages I publish so I know what I need to work on. The endpoints (which use `https://smrth.dev` as their base) are listed below:

## JSON API
- `/api/pypi-downloads/:packageName`:  Get the number of downloads and number of active days of a PyPI package.
- [Sample 'GET' URL](/api/pypi-downloads/gendoc)
- Return Schema:
```json
{
    "downloads": <(int) number of downloads>,
    "days": <(int) number of active days>
}
```
- Sample Return:
```json
{
    "downloads": 19454,
    "days": 230
}
```

## README Badge API
- `/api/pypi-downloads/badge/:packageName`: Get a README-file ready badge that contains your project's total PyPI downloads.
- [Sample 'GET' URL](/api/pypi-downloads/badge/gendoc)
- Return Schema: `image/svg`
- Sample Return:

![Gendoc Badge](/api/pypi-downloads/badge/gendoc)

*Disclaimer: This site is ran on limited resources. I make its API's publicly available, but I am not responsible for any breakage nor do I provide any guarantee of uptime.*