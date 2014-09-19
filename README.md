# Inleiding

**Belangrijk** Als je geen ervaring hebt met git of github, github is een zogenaamd version-control-system. Je kunt hiermee constant op je oude code bouwen, als je bijvoorbeeld een nieuwe feature wil programmeren, en het gaat helemaal mis, dan kan je gewoon terugdraaien naar een oudere versie van je code. Git heeft nog een heel groot aantal andere voordelen.

Quick-start om de code te krijgen.

1. Installeer git op je computer (ik adviseer de command-line versie, vaak heb je te weinig controle over wat je wilt doen met grafische versies)
2. Run het volgende commando in de map waar je de source code wilt hebben. `git clone https://github.com/liamtjoa/photo-events.git`

Of er verder gewerkt wordt met Git, is natuurlijk aan de opvolger.

Photo events is geschreven in puur JavaScript met het [meteor](http://meteor.com) framework. Meteor ondersteunt templating in HTML (vergelijkbaar met en gebaseerd op handlebars templates). De opmaak is in een dialect van css, less, wat niet veel meer is dan css met nestable selectors en nog wat extras.

```
// in css
.table {
    background-color: blue;
}

.table .userAddress {
    font-size: 14px;
}

// hetzelfde, maar dan in less
.table {
    background-color: blue;
    .userAddress {
        font-size: 14px;
    }
}
```

Ik ga er even vanuit dat Meteor niet bekend is bij opvolgende developers. Meteor is een framework dat de server (backend) en client (frontend) en zelfs de database combineert in *een* codebase. Meteor werkt met de [mongodb database](http://mongodb.org), een database die data opslaat vergelijkbaar met [json (javascript object notation)](http://json.org/), als json niet bekend is, het is een erg simpele key-value pair notatie om data op te slaan.

### Meteor installeren

Meteor werkt (helaas) alleen op Linux systemen (dus ook macs), het kan wel op Windows, maar dan moet er een heleboel moeilijk gedaan worden, ik adviseer om te werken met een variant van Linux. mOm Meteor te installeren draai je het volgende commando in de terminal `curl https://install.meteor.com/ | sh`.

### Meteor gebruiken

Om de locale Meteor test omgeving te draaien run je het commando `meteor` vanaf je terminal in een meteor project. Als je het project hebt gecloned zal je het kunnen draaien met dit commando. Als het draait ga je naar `localhost:3000`. Hier bevind de locale test-server zich. Deze server is ook bereikbaar via mobiele apparaten met je Locaal netwerk ip-adres als je mobiel en laptop/computer in hetzelfde netwerk zitten.

### Korte overview van Meteor

Een korte uitleg over hoe Meteor werkt. Meteor heeft een aantal concepten die het gemakkelijk maken om real-time applicaties te schrijven. Meteor zelf is ook makkelijk te leren en begrijpen. Aangezien deze informatie nooit genoeg kan zijn, adviseer ik om op de meteor site de twee meteor screencasts te kijken. Voor in-depth informatie is er [eventedmind](http://eventedmind.com), de officiele [meteor documentatie](http://docs.meteor.com), [discovermeteor](http://discovermeteor.com) en Arunoda's (een bekende meteor programmeur, auteur van de meteor-up package, tracking package kadira, fast-render (wat ook gebruikt wordt in dit project) en een heel groot aantal andere dingen) blog, [Meteor hacks](https://meteorhacks.com/)

1. Reactivity: Bepaalde variabelen (bijvoorbeeld documents uit de database, de Session variabele, en template variabelen) zijn `reactive`. Dit houdt in dat wanneer ze veranderen, dat alle functies die afhankelijk zijn van dat variabele automatisch opnieuw gerund worden. Denk bijvoorbeeld aan een HTML template wat een gebruikersprofiel moet voorstellen. Het aantal vrienden van een gebruiker wordt uit de database gehaald, wanneer de gebruiker dan een vriend toevoegt of verwijdert zal de weergave in de template automatisch aangepast worden door Meteor.
2. Database op de client & server: Meteor werkt met *een* api voor beide de server en de client. Dit betekent dat er een kleine versie van de database draait op de client. Zo kan de client direct dingen aanpassen in de database. Met iets wat het Meteor team `latency-compensation` noemt wordt de verwachtte lag (data aanpassen in locale database, request sturen naar server of deze aanpassing valide is, server stuurt het door naar de database, database schrijft verandering, database laat de client weten dat een variabele is veranderd, client rerendert een deel van een template. Dit alles duurt normaalgesproken van 200ms tot een aantal seconden) bij het aanpassen van wat data in een database genullified, omdat ze dus een locale database draaien. Waneer de client wat data aanpast wordt dit in de localie (client) database meteen aangepast, en deze aanpassing zal ook meteen zichtbaar zijn in de html templates, in de tussentijd wordt er een request gestuurd naar de server, die vraagt of de aanpassing eigenlijk wel mag, zo ja, dan wordt de echte database geupdate en zal er niets veranderen in de client. Zo nee, dan wordt er een seintje gestuurd naar de client, en wordt de database teruggedraaid naar hoe hij ervoor was.
3. Packages: Meteor heeft een groot aantal krachtige packages. Voor dit project is ook een package geschreven [Meteor-friends](https://github.com/Azeirah/meteor-friends), hij is niet in het huidige project inbegrepen, maar hoort er wel gebruikt te worden.
Een aantal packages dat gebruikt wordt in het project:
* LESS, de css preprocessor
* Iron-router, een package die het switchen van pagina naar pagina regelt
* Font-awesome, placeholder icoontjes
* Accounts-password en Accounts-base, deze twee packages regelen het account-beheer.
* Kadira, een tracking package. **Deze zal opnieuw geconfigureerd moeten worden aangezien deze staat ingesteld op Martijn's account**
Verder installeer je nieuwe meteor packages met `meteor add [packagenaam]`. Meer informatie hierover vind je op [atmosphere package manager](http://atmospherejs.com) en op de meteor website.
4. Meteor werkt met een publication subscription model. Ik zou het graag zelf uitleggen, maar [deze uitleg](https://www.discovermeteor.com/blog/understanding-meteor-publications-and-subscriptions/) doet het simpelweg beter.
5. Meteor's security model werkt met `allow` en `disallow` functies die draaien op de serverkant. Als de client een aanpassing maakt in de database wordt deze aanpassing zoals hiervoor beschreven bij punt 2 eerst locaal gemaakt. Daarna wordt een request gestuurd naar de server, om te controleren of deze aanpassing mag of niet. Deze controles moeten geschreven worden door de Developer.
6. Mongodb is vergelijkbaar met mySQL. Tables ~= Collections, rows ~= documents.

## Overview sourcecode

De sourcecode is onderverdeeld in een aantal mappen.

```
client - allerlei mappen en bestanden die beschikbaar zijn in de client
    - controllers - Javascript bestanden die templates beheren. Bijbehorende html templates hebben dezelfde naam als de javascript bestanden.
    - lib         - Hier staan bestanden in die geladen moeten worden *voor* de andere bestanden in deze map. Bijvoorbeeld frameworks en subscriptions
    - styles      - Hier staan de .less opmaak bestanden in
    - views       - De HTML templates staan in deze map
    routes.js     - Dit is het bestand waar alle Iron-router routes in staan
lib
    - Hier staan bestanden in die geladen moeten worden voor andere bestanden
public
    - Hier kunnen bestanden in worden gezet die publiekelijk beschikbaar zijn, zoals robots.txt, of wat statische bestanden
server - Hier staat alles in wat te maken heeft met de server, deze code wordt dan ook alleen gedraaid op de server.

Voor de rest staan er in de root wat .sublime-* bestanden. Marijn maakte gebruik van Sublime Text, als er hierna ook gebruik wordt gemaakt van sublime, is het handig om deze bestanden te gebruiken. Zo niet, mogen ze worden verwijderd.

Het bestand `post` is leeg en nutteloos. Smart.json en smart.lock hebben te maken met geinstalleerde packages. Out.tgz is een gecompressed versie van een oudere versie van het project, compleet nutteloos dus.
```

Op de client zit er nog een outdated vriendensysteem in de code. Deze moet vervangen worden met het [Meteor-friends](https://github.com/Azeirah/meteor-friends) package.

Helaas heeft niet alle source code commentaar, sommige bestanden wat meer dan anderen. Hopelijk zijn de bestanden enigszins straightforward.

## Code in productie brengen

Mocht dit project ooit op een server worden gedraaid of getest, neem [hier dan een kijkje](https://github.com/arunoda/meteor-up). Dit is succesvol geprobeerd op een [digitalocean](http://digitalocean.com) server die ubuntu draait, de goedkoopste versie is volop genoeg voor een testserver.