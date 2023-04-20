---
title: Social Banking App
description: A fake banking app to reward participants for completing challenges.
date: 2022-04-02T14:58:06.272Z
preview: /images/blog/2022/04/logo.png
draft: false
tags:
  - post
  - code
categories: []
permalink: "/2022/04/02/social-banking-app"
alt: "A stock exchange icon"
slug: social-banking-app
---

For a bachelor party where the groom happens to be a banker, we've decided it would be nice to get things started a couple of weeks before the event. This way, all the participants got a chance to get to know each other in advance. So we came up with the idea of a banking app with some extra features. By fulfilling all kinds of challenges with the groom (without his knowledge) participants could earn virtual money.

## Features

- An overview of a user his bank account
- Transfer money to other users (hey, it was a banking app after all)
- An overview of all the investments to make (the challenges)
- News section
- Live chat
- FAQ section

![Screenshot of an investment](/images/blog/2022/04/kompromat.png)

## Tech stack used

- [Next.js](https://nextjs.org/)
- [FaunaDB](https://fauna.com/) for the database
- [Pubnub](https://www.pubnub.com/) for the chat
- [Mantine](https://mantine.dev/) for the UI
