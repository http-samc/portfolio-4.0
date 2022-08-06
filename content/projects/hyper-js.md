---
title: Hyper.js
description: A full Javascript SDK for Hyper's API 🚦
important: true
cover: https://hyper.co/img/logos/hyper.svg
tags:
    - TypeScript
    - TypeDoc
    - SDK
---

## What is it?
Hyper.js is a complete SDK (software development kit) for [Hyper](https://hyper.co)'s API. The API has several features, each with their own set of endpoints, that are available to be accessed via namespaces. Methods on these namespaces correspond to calls to specific endpoints. A client needs to be imported, initialized, and then supplied to all calls to provide the pertinent authorization (API key) for the requests.

## How do I get it?
Hyper.js is available on the [Node Package Manager](https://www.npmjs.com/package/@http-samc/hyper), where it has over 300 downloads, and can be installed via npm:

` npm install @http-samc/hyper`

The source code is available on GitHub at [@http-samc/hyper.js](https://github.com/http-samc/hyper.js).

## How do I use it?
Hyper.js uses [TypeDoc](https://typedoc.org) to autogenerate technical documentation based off TypeScript declarations. The documentation website (including a quickstart guide) can be found at [hyperjs.smrth.dev](https://hyperjs.smrth.dev).

## Key Features
- Intuitive design, functions on an import-as-needed basis
- Detailed but not verbose documentation
- Paginated endpoints return responses with `next` and `previous` methods for easy navigation
- Type declarations supplied out of the box

## Disclaimer
This library is open-sourced under an MIT license and was written by [Samarth Chitgopekar](https://smrth.dev). *It is not officially recognized, endorsed, or maintained by Hyper*.