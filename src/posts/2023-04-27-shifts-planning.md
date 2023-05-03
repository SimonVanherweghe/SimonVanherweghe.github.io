---
title: Shifts planning
description: An update to the shift filling process
date: 2023-04-27T18:48:14.393Z
preview: /images/blog/2023/04/textival_medewerkers.png
alt: A screenshot of the shifts planning application
draft: false
tags:
- code
- post
permalink: 2023/04/27/shifts-planning/
---

As a volunteer for a [local festival](https://textival.be), I was looked in my direction for an overhaul of the shifts planning process. In the preceding years, people saw a public spreadsheet and mailed their preferred shifts to the organizers. The organizers then had to manually add the shifts to the spreadsheet. This was a lot of work, and vulnerable to errors.

The goal was to make it easier for the volunteers to sign up for shifts, and to make it easier for the organizers to manage the shifts.

The first thing that came to mind was the use of so called no-code tools. These are tools that allow you to create applications without writing code. After gaining some more information with my colleagues, I decided to use [Airtable](https://airtable.com). I've signed up for Airtable since it was more or less a layer on top of Google Sheets, but now it has grown into a full-fledged database application.

## The process

What I feared came true, I soon hit the limits of Airtable. The main thing I wanted, was the user to be able to filter the shifts based on the type or moment. This was simply impossible, Airtable provided simply straight forward forms inputs.

The way Airtable lets you connect multiple spreadsheets was still a big plus, and I decided to use it as a backend. I created a front-end with React and MUI for the interface.

## Update

After some tests, it came clear I overlooked an important advantage of the public spreadsheet: people saw with which other volunteers they could do a shift. This is a critical thing to convince people, so I made an update to the application.

I listed all the names of the people who already signed up for the shift, and I made it clear where we still needed some folks.

The whole project involved some other screens to gain some more information about the volunteers, but in the end the process went smooth.
