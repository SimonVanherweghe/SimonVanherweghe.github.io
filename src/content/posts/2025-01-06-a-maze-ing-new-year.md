---
title: A-maze-ing new year
description: "A new year, a new card. This year I've made everyone a unique maze to solve, with a hidden message included."
date: 2025-01-06T19:49:57.417Z
preview: /src/images/posts/2025/01/previewmaze.jpg
alt: ""
tags: 
  - code
  - plotter
permalink: 2025/01/06/a-maze-ing-new-years-cards/
---

Like [last year](/2024/01/12/new-years-cards/), I wanted to create a unique New Year’s card for my friends and family. This time, I designed a maze where the path spelled out “2025”, adding a fun twist to the traditional maze puzzle.

## Maze Algorithms

I found several insightful articles about [maze generation](https://cloudfour.com/thinks/generating-random-mazes-with-javascript/) and [maze algorithms in general](https://bost.ocks.org/mike/algorithms/#maze-generation), including [Professor L’s detailed explanations](https://professor-l.github.io/mazes/) and [Jamis Buck’s resources](https://www.jamisbuck.org/mazes/).

For this project, I chose Wilson’s algorithm. Based on [loop-erased random walks](https://en.wikipedia.org/wiki/Loop-erased_random_walk), it seemed ideal for implementing a fixed path that spelled out “2025". The algorithm creates a random walk, erases any loops when the path intersects itself, and continues until the maze is complete. [Professor L’s explanation](https://professor-l.github.io/mazes) provides an excellent deep dive into the mechanics of Wilson’s algorithm.

As a test, I created a version with a pre-defined path already embedded in the maze. The starting point was the maze’s entrance, and the random walker was given a target: the beginning of the pre-defined path. The walker kept moving randomly until it reached the target, at which point the path was drawn. The same process was repeated for the exit and the end of the path. Additional paths were then created from random starting points, following the original algorithm—random walking, erasing loops, and connecting to the existing paths. This ensured the maze was filled with intricate routes while preserving the visibility of the original path.

![The main principle behind the generated maze](@images/posts/2025/01/principle.gif)

## Type Creation

What initially seemed simple —drawing “2025” in a maze— turned out to be more challenging than expected. The path had to be a single continuous stroke with no intersections or interruptions. After sketching some ideas on paper, I realized that creating outlines for the digits would provide more flexibility for a continuous path and make the design stand out.

I developed a custom tool for this. It featured a grid where I could toggle cells on or off, and ultimately export the data for use in the maze algorithm. At first, I experimented with drawing basic shapes for the digits and connecting them into a single line.

![First version](@images/posts/2025/01/v1.png)

I settled on a version where the start and end points were on opposite sides of the path, which made more sense visually and functionally.

![Second version](@images/posts/2025/01/v2.png)

I created three different sizes for the characters to balance their scale: large enough to fill the maze and allow space for dead ends, but small enough to fit on the card.

![Me being a type designer](@images/posts/2025/01/size.png)

## Generating SVGs with D3 and Node.js

Once the “2025” path was finalized, I needed to convert it into an SVG for plotting. This is where [D3.js](https://d3js.org/), a powerful visualization library, came into play. Maybe not the perfect tool for the job, but I wanted to learn it anyhow. Although D3 is typically used in the browser, I needed to run in a Node.js environment to automate the process.

D3 requires a [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) to manipulate SVGs, but Node.js doesn’t have a built-in DOM parser. Initially, I used [JSDOM](https://github.com/jsdom/jsdom), but it was painfully slow, taking minutes to generate a single SVG. After some research, I switched to a faster solution: combining [linkedom](https://github.com/WebReflection/linkedom) with [d3-no-dom](https://github.com/neg4n/d3-no-dom), which reduced the generation time to just a few seconds.

## Finishing Touches

To complete the card, I adjusted the walls, changing them from thick blocks to single lines. I used [Vpype](https://vpype.readthedocs.io/en/stable/index.html) to eliminate overlapping lines, connect nearby endpoints, translate the design into G-code for the plotter, and optimize the plotting sequence.

The back of the card featured our New Year’s wishes and our names. I reused last year’s script to plot all the addresses on the envelopes.

Happy New Year!

![The card being plotted](@images/posts/2025/01/plotting.gif)
