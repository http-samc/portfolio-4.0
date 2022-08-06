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

*Note: Due to the AWS billing rates being higher than hosting these files on otheer platforms (which had free offerings), this file system was moved to [Firebase](https://firebase.google.com) and all references to it have been updated accordingly. This page is still useful, however, because this file server ran for nearly 6 months and worked just fine on this site. Since the infrastructure is fully reusable, it is kept as a helpful reference.*

## What Is It?
[fs.smrth.dev](https://fs.smrth.dev) is a file server I use to host various materials for both personal and project use. I created it because I wanted a dedicated place where I could store assets with easy API access.

## How does it work?
The project is written in TypeScript and uses Next.js API routes to handle the authorization and file serving functionality with the UI designed with . User authentication information is stored in a collection within a Mongo DB instance. Middleware is used via [next/connect](https://www.npmjs.com/package/next-connect) to faciliate authorization via tokens provided in the request's headers/cookies, which last 1 day (or until deauthorization is requested). The files themselves are stored as objects in an [AWS S3 Bucket](https://aws.amazon.com/s3/).

Each user gets a top-level directory at `./<username>` with 3 (and only 3) subsequent paths representing their content's respective visibility levels. `./<username>/global` allows file access to anyone, even without authentication. `./<username>/public` allows file access only to other authorized users. `./<username>/private` allows file access only to `<username>` when they are authorized.

This setup gives me the ability to add other users easily while still giving them their own dedicated storage. Moreover, since the API handles all interaction with the bucket (and forwards data to the user), they don't need to worry about signing up for/maintaining separate Amazon credentials.

The project is open-sourced at [@http-samc/fs.smrth.dev](https://github.com/http-samc/fs.smrth.dev).

## Functionality
[![ Authentication](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/auth.png)](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fauth.png?alt=media&token=383b8c13-c124-4e38-a239-066a3bef68d2)

Users can authenticate via a username & password which (if valid) the API exchanges for a secure token used for all future requests. Though the project is open-sourced, this instance of it is private to my team, so independent sign-up is disabled.

![ Home Dashboard](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fhome.png?alt=media&token=e76d545d-0aa2-4939-8b01-089bc2bdbe7f)

The dashboard provides the user with the ability to navigate the filesystem intuitively by using dropdown folders. There is a top menu bar that allows for easy execution of common actions.

![ File Upload](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fupload.png?alt=media&token=b3e8db25-d99c-4791-ba3b-0b4f23228220)

Users can easily upload single/multiple files or entire directories. They choose a visibility and path, which can be modified later.

![ Modify File](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fmodify.png?alt=media&token=b614532f-984e-4073-94b1-8ca9d2f7218a)

Filenames, paths, and visibility levels are all able to be changed after upload.

![ Delete File](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fdelete.png?alt=media&token=86ec27d5-f8b2-44db-b2d1-29d3ae83d4b8)

Files can be permanently deleted.

![ Batch Action](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fbatch.png?alt=media&token=a121cdfc-4743-4603-b3d0-85517902feb4)

Batch deletion and modification are supported.

[![ API File View](https://fs.smrth.dev/smrth/global/dev/smrth.dev/fs.smrth.dev/view-file.png)](https://firebasestorage.googleapis.com/v0/b/fs-smrth-de.appspot.com/o/smrth.dev%2Fview-file.png?alt=media&token=2412acbc-c0bb-46c5-bef5-b727d12aa49a)

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