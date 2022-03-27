---
title: GenDoc
description: A popular & versatile Python documentation generator 📖
important: true
cover: null
tags:
    - Python
    - CLI
---

## Why GenDoc
GenDoc is a simple yet powerfull Python library, designed to be lightweight and produce intuitive documentation with a single command. Simply annotate your Python project with Docstrings and GenDoc will parse through and, using Abstract Syntax Trees, convert your documentation to Markdown - ready to be used in any project documentation.

## Installation
GenDoc is available on PyPI as [@smrth/GenDoc](https://pypi.org/project/GenDoc/), where it has over 20,000 downloads. It can be installed with pip:

` pip3 install gendoc`

The project is also open sourced on GitHub at [http-samc/GenDoc](https://github.com/http-samc/gendoc).

## Use
In your terminal, simply run:

` gendoc <flags>`

Flags are optional, and a full list can be found [here](https://github.com/http-samc/gendoc#you-can-also-use-any-of-the-following-flags-in-your-terminal-to-customize-your-output-optional). It's reccommended that you set up a [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) or something similar to run GenDoc and update your documentation for you automatically.

## What I Learned
This was the first CLI package I made with Python, so it was also my first time using argparse. Though I could've gone a different direction with this project, I'm glad I limited my library usage to the out-of-the-box libraries that come with Python. There are already other documentation generators like [Sphinx](https://www.sphinx-doc.org/en/master/), but I think the fact that Gendoc is so straightforward is what makes it stand out.

## Extras
For some real-world examples, check out [@smrth/Cut It](/projects/Cut-It)'s [documentation](https://github.com/http-samc/cut-it/blob/main/DOCS.md), [@smrth/Tabroom-API](/projects/Tabroom-API)'s [project reference](https://github.com/http-samc/tabroom-API/blob/main/DOCS.md), and [@smrth/2048.py](/projects/2048.py)'s [module documentation](https://github.com/http-samc/2048.py/blob/main/DOCS.md), which are all built using GenDoc.