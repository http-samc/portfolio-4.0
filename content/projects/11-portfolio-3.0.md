---
title: Portfolio 3.0
description: "The old version of this site: legacy.smrth.dev 👴🏻"
important: false
cover: /assets/img/3-0-smrth-dev.png
tags:
    - Website
    - Bootstrap 5
---

## What's This Site For?
This is my personal portfolio site. I use it to document my progress as a developer, host novel APIs for quick projects, and provide information on who I am and how to contact me.

## What's So Special About It?
I wanted a site that made it simple to write content (like this). I wanted to write in Markdown, and I found out that I could use something like [Hugo](https://gohugo.io), but I felt that it was too overcomplicated. Instead, I made this site. This'll make more sense if you check out the source code on GitHub at [@smrth/smrth.dev](https://github.com/http-samc/smrth.dev). Here's how it works:
1. Markdown files are written inside `content` (subdirectories are ok).
2. `node build` is called, which does the following:
    - Run the custom project hook. This looks reads the files in the `content/projects` directory and extracts a projectName and projectDescription from them. Then, it creates a html fragment at `fragments/projects.html` that is prestyled and contains a list of all my projects (this is what you see [here](/projects) or [here](/#projects-👨💻))).

    - Next, the standard `render()` function is called. This clears `public/` and replicates the structure in `content/`, but changes `{name}.md` to `{name}.html` when replicating. The actual conversion is done by [marked.js](https://github.com/markedjs/marked).

        - Before the html is fully converted, the function scans for the special placeholder operator `$ {...} $`. The `...` represents a path to an html fragment, which gets opened and replaces the special operator. The reason this exists is to keep the Markdown simple to read and enjoyable to type. Any complex html can be left in `fragments/` and will make it to the static page at runtime.

        - The resulting html is still a fragment - it needs a title, resource files, etc. It is added to `templates/base.html` by replacing the special placeholder operator (in `base.html`) `$ {markdown} $`. This template has navigation, a favicon, a title, etc. Our page is now complete and available in its corresponding location within `public/`.

3. Use `node app` to start the Express.js server, which handles all routing dynamically. Pages can be accessed based on their relative path **once already inside public**. Your homepage can be accessed with `_root.html` inside `public`. This works for branches too: `public/foo/.../bar` can have a bunch of files that can be acceesed at `/foo/.../bar/{name}`, but accessing `/foo/.../bar` directly will result in a 404 (sent as `templates/404.html`) unless `public/foo/bar/_root.html` exists, in which case, it will be returned as the default for that path.

## Future Development
I have made this same website 3 times (it's gotten better every time). This one seems to be the most promising stability-wise (though none of them were 'bad'). I'm thinking about making this framework more general and widely available to the public, possibly via an `npx` command. Compile time is very fast, taking me only `.9` seconds for this site.