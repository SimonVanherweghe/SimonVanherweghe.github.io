---
title: "Retrieving single cell values from a Google Spreadsheet XML/JSON feed"
date: "2013-04-18T20:43:56"
permalink: "2013/04/18/retrieving-single-cell-values-from-a-google-spreadsheet-xmljson-feed/"
tags: ["post"]
---
Je kan een Google Docs/Drive spreadsheet publiceren als rss feed via ‘bestand’ -> ‘publiceren op internet’ en dan voor RSS kiezen.

Lijkt handig, maar in de praktijk maakt Google hier een feed van met per rij 2 items: een titel en een description.  
Dit staat ook zo in de [docs](https://developers.google.com/google-apps/spreadsheets/#working_with_list-based_feeds "https://developers.google.com/google-apps/spreadsheets/#working_with_list-based_feeds"):

> Each entry represents a row in the worksheet. The `title` element contains the contents of the first cell in the row, and the `content` element contains a textual representation of the data from all the other cells in the row.

Redelijk ambetant dus

Wat ze er niet meteen bijzeggen is dat je de waardes ook apart kan verkrijgen. Het is een kwestie van de parameters in de url wat aan te passen:

Standaard ziet het er zo uit:  
`https://spreadsheets.google.com/feeds/list/[spreadsheet-id]/od6/public/basic?alt=rss`  
Het enige wat je hoeft te doen is die ‘basic’ door ‘values’ te vervangen:  
`https://spreadsheets.google.com/feeds/list/[spreadsheet-id]/od6/public/values?alt=rss`  
En voor als je een json string wil:  
`https://spreadsheets.google.com/feeds/list/[spreadsheet-id]/od6/public/values?alt=json`

Alle cellen in een rij zijn nu apart aanspreekbaar. Ze zijn voorzien van een prefix ‘gsx’, dit komt door de namespace die ze gebruiken om de xml valid te houden.

Je moet er ook wel voor zorgen dat de eerste rij in jouw spreadsheet de kolomkoppen bevat.

English version:

Just use ‘values’ instead of ‘basic’ in the url
