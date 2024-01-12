---
title: New year's cards
description: Personalized New Year's crosswords cards made with the plotter.
date: 2024-01-12T21:00:30.566Z
preview: /src/images/posts/2024/01/plotter-result.jpg
alt: A screenshot of the Textivalkrant header consistiong of a menu and a rockstar construction worker on a wrecking ball.
draft: false
tags:
  - code
  - plotter
permalink: 2024/01/12/new-years-cards/
---

For our new year's cards, I wanted to make use of my pen plotter. I've had that goal since a couple of years, but I never really found a good concept. This year I came up with the idea of a crossword about all those little enjoyable things in life. We would like to wish you a lot of those moments.

With the concept clear, Lotte and I began to collect a list of those moments. We quickly found around 15 of them, so I went on and started to focus on the crossword algorithm and the drawing of it.

To make use of the plotter, I need vector files. Preferably SVG because they are easily to transform to gcode, the language that a CNC, the plotter can understand.
I think I technically could have made use of p5 to generate those SVG's, but I wanted to gain some more experience with [Vpype](https://vpype.readthedocs.io/en/latest/index.html), 'the Swiss Army knife for creating, modifying and/or optimizing plotter-ready vector graphics.' It can create some basic geometry (enough for crosswords) but also has the nice feature it can create Hershey text. You have to be aware a plotter can only draw lines, contours, but no fills (unless you start hatching) but characters of a regular font are shapes, so they require fills. Hershey fonts are made out of simple line strokes, perfect for plotting. I quickly was able to create a grid, adding little numbers inside them and created filled (hatched) squares if necessary. Good proof of concept, time to focus on the algorithm.

## A crossword algorithm

I couldn't imagine I was the first one who would like to make a crossword in JavaScript, the language I'm most familiar with. I had some extra requirements that I should be able to implement afterwards. The one that popped out was written in JS, but clearly of [a Spanish speaking developer](https://github.com/fabnun/conwords-generator). With the help of some AI, it was quite easily translated tot English, so I could start adopting it to my needs.

The first requirement was that it must contain certain words, I wanted to include the names of the addressed. In a rather cheesy way, we would like to wish they found the happiness inside them...

So I fiddled around, tried to grasp the inner algorithm of that library and made some words mandatory. I had some results, but then, when I decreased the grid from 50x50 to something like 20x10 (to fit on a 1/3 A4 page) things got bad: there were very large black areas, filled only half of the area or the words were all mangled up. It came clear to me that I would need a massive amount of words to make this work. I only had around 25 of them at that time (we later made it to 45)

![A grid of words with some missing spots](@images/posts/2024/01/force.png)
*The grid was all messed up by trying to obligate some words*

So I abandoned the idea of a so called 'American style' crossword, the one with black squares now and then. I decided to go for a 'criss-cross' variant. This isn't just a matter of ignoring those black squares. All the words have to be connected somehow with eachother, no islands. This wasn't possible with the Spanish algorithm I was using, so I went on and looked for another one.

It looked like an [13 years old script](https://github.com/satchamo/Crossword-Generator) could do the job. Some quick test confirmed that there were no islands occuring. It generated quite quickly, so I decided to just keep on generating new versions until all of my requirements were met instead of coding all my requirements in the algorithm...
The first one was the occurrence of the addressed
Another one is that the whole area should be filled (read: left/right/top/bottom col/row shouldn't be empty)
But then I still had some crosswords with quite empty areas. So I asked GitHub Copilot how I could calculate the surface of empty areas. This is an example of how one could learn with the help of AI. The so called [depth-first search algorithm](https://en.wikipedia.org/wiki/Depth-first_search) did the job. Hello recursion.

Finally, I had them. I could create crosswords that were unique to every addressed and met all my requirements. I saved them as JSON files, representing every character in the grid and their according clues.

## Drawing

Back to the generation of the drawing. I like to make use of zx. It is like writing bash scripts, but then in Node.js, JavaScript. I can create statements to execute python scripts ([Vpype](https://vpype.readthedocs.io/en/latest/index.html) is Python) which create the SVG's. Although it can be tricky to escape strings and passing long statements, it's really convenient to orchestrate almost anything from a node script.

Hail to Vpype, what a great flexible tool to generate and optimize vector images. The way I created the crossword grid -by drawing squares where a character needs to be written-, results in overlapping lines. After splitting all the squares into individual lines, one can merge lines who have overlapping start/end points. Together with some shortest path optimizing this resulted into weird zigzag patterns instead of straight lines (which I expected). I still don't know if this would be possible with Vpype. The drawing time was acceptable, so I didn't look further into it. There was an issue first with some squares who didn't align perfectly. After tightening the belt on my plotter, this was luckily solved.

For the queues on the backside of the card, I had to run some tests to find out the optimal font size. We adjusted some paraphrasing off the clues, so everything was readable, but fitted neatly on one line. Vpype has an option to wrap text on a new line, but there is no way to find out if it has done it. So this could be a problem for the start position of the next clue.

![A lot of testing was involved](@images/posts/2024/01/plotter-progress.jpg)

## Solution

I wanted to share the solution in some way, so a website was the most logical step for me. I provided a solution SVG, created a unique code based on the addressed (which I also use for the file naming)
The URL had to be something short, easy and linked to the project. Terms like 'word' and 'luck' were some keywords I searched for, but I eventually settled with `oploss.in/g` (Dutch for `solut.io/n`, which was already taken)
The generation of the site was a breeze with Astro, but the domain name kept on failing to resolve. As it turned out, it was listed as 'serverHold'. As for today, this isn't resolved... This really is a bummer, I postponed the sending of the cards for a couple of weeks because of this. Eventually I decided to just to hand them out, or it would be too late.

![The domain in a 'Server hold' status](@images/posts/2024/01/serverhold.png)

## Conveyor

I made a conveyor belt script that plots the grid, the clues in sequence. Between every step it waits for a key press, so I can switch papers.

Since I was already plotting, I decided to also write the addresses on the envelopes with the plotter and include them in the conveyor. Those came out really well.

![The plotter, plotting](@images/posts/2024/01/plotting.gif)
