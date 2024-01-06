---
title: Portrait plotter
description: "A plotter that draws a picture of you"
date: 2022-05-02T21:01:00.198Z
preview: "/src/images/posts/2022/05/plotter.jpg"
draft: false
tags: ["code", "play", "plotter"]
permalink: 2022/05/02/portrait-plotter/
---

It all started with a note in our mailbox during corona: "Present yourself, your hobbies, via the front window of your house".

I wanted to present something interactive, and I had a pen plotter available, so I decided to make a little site where neighbors could upload a picture and get a plotter drawing of it.

It had some attention, people tried it and were happily surprised with the result.

![A plotter viewed through a rainy window](/src/images/posts/2022/05/firstportraitplotter.jpg)

## Next iteration

When we saw the call for makers for the [Maker Faire](https://www.makerfairegent.be/) at the office, I talked about this project and suggested we could use our [AxiDraw](https://axidraw.com/) to create something similar.

We decided to ditch the app and let people queue to let their picture get taken. You can [take a look at the code](https://github.com/devinekask/postcard-portrait-plotter) yourself, but this is how it works:

- There is an Arduino micro hooked up to two buttons. The Arduino can act like a keyboard, so when you press a button, it will send a keystroke to the computer.
- The whole thing runs in Node.js using [zx](https://github.com/google/zx), it is like bash scripting, but then in node. I like it.
- When the command to take a picture is received, the native photo booth app is opened and a picture is taken. By running AppleScript from the Node.js script... An approach [Wouter](aboutme.be) came up with, nice one!
- When the command to plot a new picture from the queue, the picture goes through a couple of steps:
  - The picture is cropped to a postcard-ratio, taking the position of one or more faces into account. [Smartcrop](https://github.com/jwagner/smartcrop-sharp)
  - A Python script then transforms the cropped picture into a line drawing (SVG) [Linedraw](https://github.com/LingDong-/linedraw)
  - The SVG gets simplified and optimized for plotting with [vpype](https://vpype.readthedocs.io/en/latest/)
- Finally, the optimized SVG is then plotted with the [AxiDraw](https://axidraw.com/)

## Results

During the [Maker Faire](https://www.makerfairegent.be/), we had a lot of visitors who were intrigued by the plotter and wanted to let their picture get drawn. We ran into a queue of multiple hours, so we had to refuse people at some point. The algorithm that translates a picture into a line drawing can bring surprising results now and then, but overall, people were happy with the result.
