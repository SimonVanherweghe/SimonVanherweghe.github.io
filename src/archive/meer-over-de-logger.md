---
title: "Meer over de logger"
date: "2007-06-17T22:09:35"
permalink: "2007/06/17/meer-over-de-logger/"
tags: ["archive"]
layout: "archive-post"
---
Ik had het [voorheen](http://www.donebysimon.be/2007/06/09/track-it/ "http://www.donebysimon.be/2007/06/09/track-it/") al wat gedropt, bij deze wat meer uitleg over mijn GPS-loggerke. Het betreft een klein apparaatje dat werkt op 4 reuze AA batterijen (in vergelijking dan). Het doet in feite niks anders dan met een bepaald interval (bijvoorbeeld om de 10 seconden) mijn positie wegschrijven op een sd kaartje (zo van die zukke dat je in uwen kodak steekt).

Eenmaal na mijn ‘trip’ lees ik dat dat kaartje uit, en dan heb ik een bestandje met allemaal regeltjes in het genre van:

`$GPGGA,151805.000,5046.4852,N,00314.5866,E,1,05,1.3,48.1,M,47.2,M,,0000*68  
$GPRMC,151822.000,A,5046.5142,N,00314.5410,E,0.76,200.62,170607,,*0D  
$GPGGA,151823.000,5046.5018,N,00314.5643,E,1,04,4.2,26.2,M,47.2,M,,0000*6C  
$GPRMC,151926.000,A,5046.4904,N,00314.6093,E,0.68,45.47,170607,,*34  
$GPGGA,151927.000,5046.4900,N,00314.6085,E,1,04,2.9,30.7,M,47.2,M,,0000*68  
$GPRMC,152004.000,A,5046.4672,N,00314.5871,E,0.26,18.14,170607,,*33`

Dit lijkt misschien op het eerste zicht chinees, maar het komt er gewoon op neer dat ie de boel wegschrijft in 2 nmea formaten (GPGGA en GPRMC in dit geval). Ik kies deze 2 omdat ik er dan zowel de volledige positie, datum-tijd, snelheid en hoogte kan van opmaken. Wie meer info wil kan [hier terecht](http://www.werple.net.au/~gnb/gps/nmea.html "http://www.werple.net.au/~gnb/gps/nmea.html")

Daarna is het een kwestie van de boel in kaart te brengen. Dit kan met het fantastische [Google Earth](http://earth.google.com/ "http://earth.google.com/") of de online [Google Maps](http://maps.google.com/ "http://maps.google.com/"). Beide zaken gebruiken een ander formaat, [kml](http://code.google.com/apis/kml/documentation/ "http://code.google.com/apis/kml/documentation/") genaamd, om al die punten weer te geven. En als je lijntjes trekt tussen al die coördinaten, dan verkrijg je natuurlijk je route. Het enige wat ik doe is in feite alle coördinaten in één lange lijn achter elkaar zetten. Dan kan je ook nog wat extra dingen doen, zoals een titelke, beschrijving, lijnkleur, dikte en transparantie. Hier heb ik gewoon een php scriptje voor aangemaakt dat de boel in één klik voor mij omzet, huppe!

Nu ja, het is nog niet allemaal rozengeur en maneschijn, zo verbruikt het ding redelijk veel elentriek tijdens het effectieve loggen (gaat max 24 uur mee…) en slaat ie nogal gemakkelijk door als ik een eindje stil sta. Binnen mag je het al helemaal vergeten. Maar das met bijna elke gps zo blijkbaar.

Zo kan je [mijn trip van deze middag](http://maps.google.com/maps?f=q&hl=nl&q=http%3A%2F%2Fwww.donebysimon.be%2Fgps%2Fkml%2Ffietstocht.kml&ie=UTF8&om=1&ll=50.82073,3.277245&spn=0.10194,0.324097&z=12 "http://maps.google.com/maps?f=q&hl=nl&q=http%3A%2F%2Fwww.donebysimon.be%2Fgps%2Fkml%2Ffietstocht.kml&ie=UTF8&om=1&ll=50.82073,3.277245&spn=0.10194,0.324097&z=12") checken. Eerst zijn we wat supervlet-motor-vaarlessen gaan geven aan Leen. Dat kan je duidelijk zien aan het stuk op de leie, heel wat draai- en aanlegmaneouvres. Daarna ben ik met Wies op de fiets gesprongen naar hoog Kortrijk toe. Het was veels te mooi weer om dit te laten liggen. Scheel van den dorst kwamen we plots op de lampestraat uit, op goed geluk reden we die door, en ja hoor, op het einde van de straat was café de Lampe open. En je ziet aan de rare uitspattingen dat we daar een eindje halt gehouden hebben ![:-)](http://www.donebysimon.be/blog/wp-includes/images/smilies/icon_smile.gif)

Voor welknen reden dat ik me dat in godsnaam heb aangeschaft? Om achteraf te kunnen zien waar we zo allemaal in [Afrika](http://www.zeescoutsjanbart.be/rafiki/ "http://www.zeescoutsjanbart.be/rafiki/") geweest zijn, om een zeiltrip te checken, om een 2daagse op te slaan, om in de toekomst m’n foto’s te [geotaggen](http://www.bright.nl/de-toekomst-van-geotagging "http://www.bright.nl/de-toekomst-van-geotagging"), om tijdens een geheime spionage missie het bakje onderaan de auto van m’n target te monteren. Enfin, voor de fun gewoon ![:-)](http://www.donebysimon.be/blog/wp-includes/images/smilies/icon_smile.gif)

Nu nog effe testen of ik door de interval van 10 seconden naar 1 minuut te brengen de batterijduur aanzienlijk kan verlengen. En een 12-volt aansluiting voor in de auto zou ook handig zijn me dunkt…

O ja, wie de trip in Google earth wil checken kan kiezen voor ‘toevoegen’ -> ‘netwerk koppeling’ en dan volgende url ingeven: [http://www.donebysimon.be/gps/kml/fietstocht.kml](http://www.donebysimon.be/gps/kml/fietstocht.kml "http://www.donebysimon.be/gps/kml/fietstocht.kml") (of gewoon reks klikken, opslaan, en openen in Google Earth e ja…)
