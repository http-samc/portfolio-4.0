---
title: CodeSwipe
description: A gallery for the art of code 💞
important: true
cover: https://play-lh.googleusercontent.com/kjugYKyxATvYeaoGJZ4qnUoehkFT6Le72_YQ6CUXqRt9pvzMjmDy_mM0fPMNrKO-ZI4=w720-h310-rw
tags:
    - Android Native
    - Java
    - Mobile App
---

Every day, developers around the world push billions of commits, deliberate on millions of issues, and work tirelessly to create amazing projects that transform the world around them. Unfortunately, there’s rarely an easy way for them to garner appreciation for their code. Though the apps, APIs, and libraries they create are beautiful in and of themselves, coding is an art form and deserves its own gallery.

That’s why made CodeSwipe, the premier platform to share code snippets with other developers. Our target audience is developers of all ages looking to experience code in a new way. Users can ‘swipe’ on posts, with ‘liked’ posts showing up in their history. To create their own posts, users can paste in a code snippet, define a language, and add an (optional) description with an (optional) GitHub repository name.

Get the CodeSwipe on the [Play Store](https://play.google.com/store/apps/details?id=dev.smrth.www.codeswipe)!


## What I Learned?
This was the first truly collaborative mobile app I've done. I learned a lot (especially about merge conflicts). Overall, I found the Native Android experience to be pretty straightforward, though excessive at times (especially when it came to the project's file tree). It was fun to use Firebase for my backend and end up with a fully working and scaleable social media app.

You can check out the source code on GitHub at [@smrthCodeSwipe](https://github.com/http-samc/CodeSwipe).

## Authors
1. [Samarth C.](https://github.com/http-samc)
2. [Kishan T.](https://github.com/KishanTeeka)
3. [Amogh R.](https://github.com/booghaa)
4. [Matthew P.L.](https://github.com/bilbaothanos6)

## Functionality
View the original presentation [here](https://docs.google.com/presentation/d/1hbRp2vDYWBegtlSsMT9lSRWWYzY8sU5DWmXpRK2TjsQ/edit?usp=sharing).
- Sign up/Log in with Firebase GitHub Authentication
- Store posts within Firestore
- API calls to GitHub to follow users automatically and star their gists
- Supports multiple snippets for programming languages Appropriate syntax highlighting for all major languages
- Swipe support (with animation) to go to another post (Swipe right means the post is ‘liked’ and saved to history, swipe left skips)
- Toolbar with share functionality, create a new post, and history
- Users can filter languages they want to see
- New Post within the app:
    - You paste in a code snippet (150 lines max), define the language (for syntax highlighting), optional caption
    - When viewing your history, you can click the post to revisit the snippet in the browser
    - A GitHub Gist repository is automatically created with your snippet when you post

## UI
- Dark theme
- Scales well for phones and tablets
- Intuitive design

<br>

<details>
<summary>View Screenshots</summary>

![CodeSwipe Auth](https://github.com/http-samc/CodeSwipe/blob/main/images/CodeSwipeAuthPhone.png?raw=true)

![CodeSwipe Create](https://github.com/http-samc/CodeSwipe/blob/main/images/CodeSwipeCreate.png?raw=true)

![CodeSwipe Filter](https://github.com/http-samc/CodeSwipe/blob/main/images/CodeSwipeFilter.png?raw=true)

![CodeSwipe Feed](https://github.com/http-samc/CodeSwipe/blob/main/images/CodeSwipeSwipe.png?raw=true)

</details>
<br>