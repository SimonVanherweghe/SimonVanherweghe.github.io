---
title: "Nifty caching"
date: "2010-02-18T22:27:31"
permalink: "2010/02/18/nifty-caching/"
tags: ["archive"]
layout: "archive-post"
---
De beginpagina bestaat uit content die van op verschillende plaatsten komt. Die telkens te gaan ophalen en verwerken zou te veel tijd in beslag nemen en de server onnodig bezig houden. Ik moest dus wel wat aandacht aan de performantie wijden, gewoon voor jullie, dat jullie niet telkens te lang moeten wachten. Ik heb dit op verschillende niveau’s aangepakt:

**Alles in één  
Er staat een script op de server dat alle content ophaalt en dit dan wegschrijft in een bestandje. Bij een bezoek is het gewoon een kwestie van die weggeschreven content uit te lezen. Die content moet natuurlijk zo nu en dan een update krijgen, maar straks meer daar over.**

**Minder http requests  
Een webpagina bestaat uit vele bestanden (javascripts, stylesheets…) Voor ieder bestand is er een http request nodig om dit te gaan ophalen. Dit brengt op zich al een vertraging met zich mee. Een oplossing kan zijn om alles in één groot bestand te stoppen, maar dat is verre van praktisch. Ik ben op [een handig script](http://rakaz.nl/2006/12/make-your-pages-load-faster-by-combining-and-compressing-javascript-and-css-files.html "http://rakaz.nl/2006/12/make-your-pages-load-faster-by-combining-and-compressing-javascript-and-css-files.html") uitgekomen dat dit oplost. Alle losse bestanden worden onderschept en in één groot bestand gestopt én als surplus gecached.**

**Cachen  
De beginpagina is php, kortweg haalt die de inhoud uit het contentbestand, zet alles op de juiste plaats en maakt de WordPress blog aan. Alles gaat naar de gebruiker in de vorm van een html pagina, zoals alle php pagina’s. Met het cachen sla ik die gegenereerde pagina op. Bij een volgend bezoek geef ik gewoon die gecachte pagina weer. Als er niks veranderd is, dan moet er ook niks opnieuw gegenereerd worden. Ik heb [die mosterd hier](http://www.developertutorials.com/tutorials/php/php-caching/page1.html "http://www.developertutorials.com/tutorials/php/php-caching/page1.html") gehaald.**

Nu moet je ooit wel eens opnieuw je pagina laten genereren. Je kan dat bijvoorbeeld na een bepaalde tijd doen of door eerst te kijken of er wel iets aangepast is. Ik heb voor dit laatste gekozen: als het contentbestand recenter is dan de gecachte pagina, dan moet de pagina opnieuw gegenereerd worden.

**Content updaten  
Het contentbestand moet zo nu en dan ge-update worden. Dit zou kunnen met een zogenaamde cronjob, waarbij de server een script om-de-zoveel-tijd gaat uitvoeren. Maar dit is niet ideaal: wacht ik te lang met updaten, dan is de content hier niet up-to-date. Laat ik het te vaak runnen, dan zorgt dit voor onnodige belasting van de server.  
Het interval van updaten zal bepaald worden door de content die het snelst aangepast is, dit is -hier zeker- Twitter.  
Bij het posten van een blog item kan je pingen, laten weten aan een of andere service dat er een nieuwe post is. Bij Twitter kan dit niet, (of toch niet dat ik weet) dus moet ik het anders doen.  
Eenmaal de pagina volledig is ingeladen stuur ik een [Ajax](http://nl.wikipedia.org/wiki/Asynchronous_JavaScript_and_XML "http://nl.wikipedia.org/wiki/Asynchronous_JavaScript_and_XML") request naar de server met daarin de id van de laatste tweet die op die pagina staat. Hier heeft de gebruiker geen last van, de pagina is al compleet ingeladen. De server gaat kijken of er een tweets zijn met id’s die groter zijn dan deze die op de pagina staan. Als dit het geval is worden deze terug gezonden naar de gebruiker en in de lijst met tweets geplaatst. Op dit punt ziet de gebruiker een up-to-date lijst met tweets. Als er nieuwe tweets gevonden zijn (en alleen dan) vertrekt er opnieuw een Ajax request naar de server, maar dan om het content bestand opnieuw te genereren. Bij de volgende pagina weergave zal blijken dat het content bestand recenter is dan de cache, en krijgt men meteen de up-to-date lijst met tweets (én al de rest)**

**Resultaten  
**Ophalen, verwerken en wegschrijven van content naar contenbestand: 4.28s  
Inladen beginpagina in Firefox, browsercache uitgeschakeld:****

Firebug

Html

CSS

Javascript

Meerdere requests  
Geen caching

1.82 s

392 ms

859 ms

Gebundelde requests  
Geen caching

1.63 s

254 ms

571 ms

Gebundelde requests  
Caching

157 ms

170 ms

568 ms

Vooral bij het cachen is het resultaat erg zichtbaar. De rest valt nog mee.  
Zonder dit alles zou elke weergave van de beginpagina meer dan 5 seconden duren…

**Maar…  
Er zijn wel wat kanttekeningen bij: bij elke homepagina weergave vertrekt er achteraf nog een request naar de server. Deze moet dan telkens Twitter gaan aanspreken, dat is overkill. Qua bezoekers zal het hier wel nog meevallen, maar echt fijn is het niet. Er zou op z’n minst een soort tijdslimiet mogen inzitten, dat hij maar 1 keer per minuut gaat controleren of zo…  
Alles is wat experimenteel, 2-3 manieren samen gesmeten, hmm. Maar alles lijkt goed te werken, we zien wel.**

**Update**  
Met @ikbenmartijn wat over-en-weer zitten tweeten, en tot de volgende inzicht gekomen:

* Ik heb de datum nodig van de laatste zijn-er-nog tweets request
* M’n eerste idee was om die datum ook bij te houden in het content bestand. Telkens als een request binnen komt voor nieuwe tweets, dan de datum daar gaan aanpassen.
* Met het aanmaken van de index pagina, gewoon die datum in de javascript zetten, en die kan dan gaan kijken of er genoeg tijd tussen de requests zou zitten.
* Enigste probleem hierbij: die index pagina is gecached natuurlijk, en dat wil zeggen dat die geen recente datum info kan hebben staan 🙂
