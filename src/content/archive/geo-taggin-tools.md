---
title: "Geo-taggin-tools"
date: 2008-05-29T23:59:30
permalink: "2008/05/29/geo-taggin-tools/"
tags: []

---
Ik begin een deftige workflow te creëren voor het geo-taggen van m’n fotos.

1. Nmea bestand omzetten naar een GPX bestand: [HoudahGPS](http://www.houdah.com/houdahGPS/index.html "http://www.houdah.com/houdahGPS/index.html")
2. De coördinaten aan de foto’s toevoegen:

* [GPSPhotoLinker](http://oregonstate.edu/~earlyj/gpsphotolinker/ "http://oregonstate.edu/~earlyj/gpsphotolinker/"): handig, gemakkelijk, optie om te kiezen tussen ‘dichtste punt’ of ‘gemiddelde’. Maar helaas héél onstabiel op Leopard
* [PhotoGPSEditor](http://www.mmisoftware.co.uk/pages/photogpseditor.php "http://www.mmisoftware.co.uk/pages/photogpseditor.php"): werkt ook naar behoren, handig optie waarmee je één foto op de kaart kan zetten en hij zo de offset (verschil in tijd tussen gps en foto’s) automatisch aanpast. Maar loopt ook vast bij het wegschrijven van de foto’s…
* [Geotag](http://geotag.sourceforge.net/ "http://geotag.sourceforge.net/"): Bam! Gisteren ontdekt en het doet wat het moet doen: geo-taggen! Geschreven in Java, ietwat ongebruikelijke interface dus. Gebruiksvriendelijkheid is ook niet al dat, maar het loopt ten minste niet vast. Heeft ook die offset-via-kaart mogelijkheid en je kan blijkbaar meteen je foto’s naar een [kmz](http://en.wikipedia.org/wiki/Keyhole_Markup_Language "http://en.wikipedia.org/wiki/Keyhole_Markup_Language") omzetten en de thumbnails van de foto’s includen

En dan kwam Briekske net aandraven met het volgende: [uTrack](http://utrack.crempa.net/ "http://utrack.crempa.net/"). Hier krijg je bij het uploaden van een GPX bestand een rapportje waarop je hoogte en snelheid in grafiekvorm kan bekijken, leuk!

[![](@images/posts/2008/05/afbeelding-1.png "Report")](@images/posts/2008/05/afbeelding-1.png)
