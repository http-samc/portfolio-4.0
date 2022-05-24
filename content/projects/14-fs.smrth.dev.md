---
title: fs.smrth.dev
description: A custom filesystem built on top of AWS S3 🗂
important: true
cover: /assets/img/fs.smrth.dev.png
tags:
    - Website
    - TypeScript
    - AWS S3
    - Next.js
    - React.js
    - Geist UI
    - Mongo DB
---

## What Is It?
fs.smrth.dev is a fileserver I use to host various materials for both personal and project use. I created it because I wanted a dedicated place where I could store assets with easy API access.

## How does it work?
The project is written in TypeScript and uses Next.js API routes to handle the authorization and fileserving functionality with the UI designed with . User authentication information is stored in a collection within a Mongo DB instance. Middleware is used via [next/connect](https://www.npmjs.com/package/next-connect) to faciliate authorization via tokens provided in the request's headers/cookies, which last 1 day (or until deauthorization is requested). The files themselves are stored as objects in an [AWS S3 Bucket](https://aws.amazon.com/s3/).

Each user gets a top-level directory at `./<username>` with 3 (and only 3) subsequent paths representing their content's respective visibility levels. `./<username>/global` allows file access to anyone, even without authentication. `./<username>/public` allows file access only to other authorized users. `./<username>/private` allows file access only to `<username>` when they are authorized.

This setup gives me the ability to add other users easily while still giving them their own dedicated storage. Moreover, since the API handles all interaction with the bucket (and forwards data to the user), they don't need to worry about signing up for/maintaining separate Amazon credentials.

The project is open-sourced at [@http-samc/fs.smrth.dev](https://github.com/http-samc/fs.smrth.dev).

## Functionality
[![ Authentication](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/auth.png)](https://fs.smrth.dev)

Users can authenticate via a username & password which (if valid) the API exchanges for a secure token used for all future requests. Though the project is open-sourced, this instance of it is private to my team, so independent sign-up is disabled.

![ Home Dashboard](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/home.png)

The dashboard provides the user with the ability to navigate the filesystem intuitively by using dropdown folders. There is a top menu bar that allows for easy execution of common actions.

![ File Upload](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/upload.png)

Users can easily upload single/multiple files or entire directories. They choose a visibility and path, which can be modified later.

![ Modify File](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/modify.png)

Filenames, paths, and visibility levels are all able to be changed after upload.

![ Delete File](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/delete.png)

Files can be permanently deleted.

![ Batch Action](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/batch.png)

Batch deletion and modification are supported.

[![ API File View](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/view-file.png)](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/view-file.png)

Given appropriate authorization, files are returned to the user, defaulting to `Content-Disposition: inline` so that files are attempted to be rendered in-browser (in lieu of a downlaod link).

## Setup

```python::.env
FS_AWS_ACCESS_KEY_ID=...
FS_AWS_SECRET_ACCESS_KEY=...
FS_AWS_BUCKET_NAME=...
FS_AWS_REGION=...
FS_MONGO_USER=...
FS_MONGO_PASS=...
```

To start your own instance of `fs.smrth.dev`, clone the repository and add an environment variable file at the project root, filling out all of the keys above with their appropriate values. A Mongo DB atlas instance, S3 Bucket, and AWS access key pair are all required for functionality. You might want to change the meta tags and footer text in `./pages/_app.tsx` to redirect to your own website. If you want to enable anyone to sign-up (without approval), you can uncomment the API method in `./pages/api/create-user.ts`.

You can run the development server with:

` npm run dev`