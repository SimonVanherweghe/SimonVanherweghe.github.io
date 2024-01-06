---
title: Sleep trainer
date: 2022-09-01T06:12:25.140Z
permalink: 2022/09/01/sleeptrainer/
tags:
  - code
  - play
preview: /src/images/posts/2022/09/installed.jpg
alt: a view inside a lego tower with an electronics board and an RGB LED
description: A custom-made sleep trainer made out of Lego
---

Kids and sleep, it takes some time to get these two in harmony, to say the least. There are things called a 'sleep trainer' that let your child know when it's okay to get out of bed. Some of these are clocks which will open their eyes when it's time to get up. Others have lights in them. They come in all kinds of shapes and sizes. We've tried a couple of them, but we (and they...) were never really happy with them. The light is too bright, another light starts to shine a half hour before it's time to get up, or they simply figured out how to open the eyes by themselves...

At one point we were playing with old Lego bricks (they were left behind when we bought our house) making a tower. Since we had some transparent bricks, the tower evolved into a lighthouse. So the idea came up to add a light to it and turn it into a sleep trainer.

## Materials used

I've used an ESP32 for this. It's a small board, something like an Arduino, but it comes with Wi-Fi out of the box. Normally, it's a bit more of a low-level approach since I'm running [Home Assistant](https://www.home-assistant.io/) here, I decided to use [ESPHome.](https://esphome.io/) This framework allows you to configure the ESP32 in a yaml file, and it will generate the code for you.

![An ESP32 on a breadboard with an RGB LED](@images/posts/2022/09/breadboard.jpg)

All I've needed was an RGB LED and some resistors, so this was a good starting project.

It was [Wouter](aboutme.be) who mentioned a ['perma-proto'](https://www.adafruit.com/product/571) board to me. It's a step in between a breadboard and a prototype board. These things are great to use. They don't require that much soldering.

## Automation

The integration with Home Assistant is pretty straight forward. I have an 'sleep trainer' entity which I can use within an automation. I have one running for the weekdays and one for the weekends (where they can sleep in a bit longer...)

Via the Home Assistant app, I can turn the light on or off and even change the color.

## Result

Do they stay in bed longer? Sometimes they do, sometimes they don't, but they can explain the concept very well ;-)
