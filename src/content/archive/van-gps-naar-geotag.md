---
title: "Van GPS naar GeoTag"
date: 2007-08-17T00:12:21
permalink: "2007/08/17/van-gps-naar-geotag/"
tags: ["archive"]

---
Wat zie ik daarnet op [Flickr](http://www.flickr.com/photos/simonvanherweghe/ "http://www.flickr.com/photos/simonvanherweghe/"), dat er nu onderaan de pagina een [KML bestand](http://api.flickr.com/services/feeds/geo/?id=40396650@N00&lang=en-us&format=kml_nl "http://api.flickr.com/services/feeds/geo/?id=40396650@N00&lang=en-us&format=kml_nl") beschikbaar is met daarin de laatste 20 foto’s die je hebt gegeotagged (er is daar zeker een andere, correcte, schrijfwijze voor) Lovely!

Nu m’n loggertje wel bewezen heeft dat ie tripjes kan onthouden en ik ze deftig kan weergeven in Google Earth, was het wel eens tijd om te onderzoeken hoe het nu zit met het geo-taggen (zou het zo geschreven zijn?) Voor de leken onder ons (jullie), geotaggen (of zo?) is een foto voorzien van zijn locatie. Een tag meegeven met daarin zijn coördinaten. Dit zetten ze ergens in de [Exif](http://nl.wikipedia.org/wiki/Exchangeable_image_file_format "http://nl.wikipedia.org/wiki/Exchangeable_image_file_format") data van de foto, tussen alle andere informatie zoals datum, tijdstip, merk camera, sluitertijd enz… Als je dan die foto op Flickr zet, kan ie dat automatisch uitlezen en ze op de juiste plaats op de kaart zetten.

De gps logger schrijft naast de positie ook telkens het exacte tijdstip van dat moment weg. En aangezien elke foto ook zijn tijdstip van ‘genomen te worden’ in zijn exif data staan heeft, vallen die 2 met elkaar te combineren.

Ik dacht dat ik hiervoor mijn programmeer kunsten zou mogen boven halen, maar niks is minder waar!  
Er zijn wel een paar programmaatjes te vinden die dat kunnen. Het enige wat ze nodig hebben is een [Gpx](http://www.topografix.com/gpx.asp "http://www.topografix.com/gpx.asp") bestand. Een andere (xml) manier dan [Nmea](http://nl.wikipedia.org/wiki/NMEA-0183 "http://nl.wikipedia.org/wiki/NMEA-0183") of [KML](http://code.google.com/apis/kml/documentation/ "http://code.google.com/apis/kml/documentation/") om die coördinaten weer te geven.  
Ik krijg Nmea terug, maar gelukkig is er zo iets als [GpsBabel](http://www.gpsbabel.org/ "http://www.gpsbabel.org/") wat redelijk goed de boel kan omzetten.

Om dan de coördinaten effectief met de foto’s te koppelen gebruik ik [GpsPhotoLinker](http://oregonstate.edu/~earlyj/gpsphotolinker/index.php "http://oregonstate.edu/~earlyj/gpsphotolinker/index.php") Goeie merchandise hoor!  
Je kan telkens kiezen of hij de dichtste log (qua tijd) neemt, of het gemiddelde tussen de laatste log voor het tijdstip van de foto en de eerste na het tijdstip van de foto. Werkt prima en is ook kratis.

Dan is er ook nog -het betalende- [HoudahGeo](http://www.houdah.com/houdahGeo/ "http://www.houdah.com/houdahGeo/") Die doet min of meer het zelfde als de vorige, maar heeft als extra functie dat je al die fotos meteen kan exporteren naar Google Earth om ze daar -op de juiste plaats- te bekijken, dolletjes!  
Ik vrees dat ik voor dit laatste toch de programmeer toer zal op moeten, want ik kan nergens hiervoor een goeie freeware oplossing vinden. Eens met Applescript of AIR proberen dan maar.

Enfin, de dag dat ik in de finder op een knopje ‘foto’s sorteren op plaats’ kan klikken komt stillekesaan dichterbij ![:-)](http://www.donebysimon.be/blog/wp-includes/images/smilies/icon_smile.gif)
