# :books: MERN-stack -sovellus

#### Sisällys

1. [Johdanto](#johdanto)
2. [Arkkitehtuurikaavio](#arkkitehtuurikaavio)
3. [REST ja reititys](#rest)
4. [Virheiden käsittely](#virheiden_käsittely)
5. [Tietokanta](#tietokanta)
   5.1 [MongoDB ja Mongoose](#mongo-mongoose)
   5.2 [Schema](#schema)
   5.3 [Mongo Compass](#compass)
6. [React](#react)
7. [Yhteenveto](#yhteenveto)

#### 1. Johdanto <a name="johdanto"></a>

Seminaarityön tarkoituksena oli toteuttaa yksinkertainen sovellus MERN-stackia (MongoDB, Express, React, Node.js) hyödyntäen. Työssäni halusin keskittyä tietokantaan ja REST-toimintoihin, koska suuri osa käyttämistäni työkaluista oli uusia. Backend-koodi rakentui pääasiassa Traversy Median tarjoaman [Youtube-tutoriaalin](https://www.youtube.com/watch?v=-0exw-9YJBo) avulla. Edellä mainittujen työkalujen lisäksi hyödynsin työssäni:

- Postman
- VSCode
- Mongoose
- Colors
- Express-async-handler
- Nodemon
- MongoDB Compass (GUI)
- Bootstrap
- CSS

Tietokannan dataksi hyödynsin avointa [Cat Facts API:a](https://catfact.ninja/). Tuloksena syntyi REST API, josta voidaan jonkin REST clientin avulla (esim. Postman) hakea kaikki, lisätä, päivittää tai poistaa jokin faktoista. Lopullinen käyttäjä voi hakea satunnaisen faktan painiketta painamalla.

#### 2. Arkkitehtuurikaavio <a name="arkkitehtuurikaavio"></a>

![Arkkitehtuurimalli](/assets/arkkitehtuurimalli.png)

#### 3. REST ja reititys <a name="rest"></a>

Tarkoituksena oli rakentaa GET-, POST-, PUT- ja DELETE-metodit, jotta Postmania apuna käyttäen voisin hakea listan kaikista faktoista, luoda, muokata ja poistaa niitä. Ensiksi loin ainoastaan pyyntömetodit factController.js-tiedostoon ja asetin lokiin yksinkertaisen viestin, jotta voisin testata Postmanilla niiden toimintaa. Myöhemmin yhdistin pyynnön ja vastauksen vastaamaan [scheman](#schema) rakennetta.

Reititysten apuna käytin Expressin Router-luokkaa, ja sen sisään rakennettua funktiota. Määrittelin Server.js-tiedostossa käytettävän polun "/api/facts".

> ```javascript
> // server.js
>
> app.use("/api/facts", require("./routes/factRoutes"));
> ```

Näin ollen factRoutes.js-tiedoston sai supistettua muotoon:

> ```javascript
> // factRoutes.js
>
> router.route("/").get(getFacts).post(setFact);
> router.route("/:id").put(updateFact).delete(deleteFact);
> ```

#### 4. Virheiden käsittely <a name="virheiden_käsittely"></a>

Seurasin tutoriaalin ohjeita HTTP-pyyntöjen virheiden käsittelyyn. Express:n oletusasetusten sijasta loin errorHandler-funktion. Tarkoituksena oli, että funktio käsittelee controllerin status 400-virheen, mikäli se toteutuu, muussa tapauksessa serveri-virheen (500).

> ```javascript
> if (!fact) {
>   response.status(400);
>   throw new Error("There is no fact found to delete");
> }
> ```

> ```javascript
> const errorHandler = (error, request, response, next) => {
>   const statusCode = response.statusCode ? response.statusCode : 500;
>
>   response.status(statusCode);
>
>   response.json({
>     message: error.message,
>     stack: error.stack,
>   });
> };
> ```

Express:n oletusasetuksilla virheen vastausmuotona oli HTML, joten funktiossa se muutettiin JSON-muotoon. Virheviestin lisäksi stack antaa tarkemmat rivitiedot.

Tämän lisäksi asensin ohjeiden mukaan express-async-handler:n, jonka avulla controllerin metodit käärittiin asyncHandler:n sisälle, jotta virheiden käsittelemisessä ei tarvinnut hyödyntää erillisiä try-catch blokkeja. Tämän käyttö oli minulle täysin uutta, koodin sai tiivistettyä selkeämpään muotoon.

#### 5. Tietokanta <a name="tietokanta"></a>

##### 5.1 MongoDB ja Mongoose <a name="mongo-mongoose"></a>

MongoDB on niin kutsuttu NoSQL-tietokanta. Relaatiotietokannan sarakkeiden ja rivien sijasta siinä käytetään joustavia "dokumentteja". Dokumentti sisältää tiedot yhdestä oliosta, ja siihen liittyvästä metadatasta. Tieto esitetään tietokenttä-arvo pareina, ja voidaan säilyttää esim. JSON tai XML muodossa ([MongoDB](https://www.mongodb.com/document-databases).)

Hyödynsin MongoDB Atlas tietokantaa, koska sitä tarjotaan ohjelmistokehitykseen ilmaiseksi. Atlas sijaitsee pilvessä, ja sille on tarjolla useita eri alustoja, kuten AWS, Azure ja Google Cloud. Valitsin tietokantaani AWS-pilvipalvelun.

Lisäksi käytin Mongoose:a. [Mongoose](https://mongoosejs.com/) on olio pohjainen tiedonmallinnus kirjasto, joka tarjoaa mm. sisäänrakennetuja tyypityksiä ja kyselyjen rakentamista. Se toimii ikäänkuin välittäjänä Noden ja MongoDB:n välillä.

##### 5.2 Schema <a name="schema"></a>

Mongoose Schema määrittelee kokoelmaan kuuluvien dokumenttien tietotyypit ([lähde täällä](https://mongoosejs.com/docs/guide.html#definition)). Loin yksinkertaisen scheman, jossa yksittäinen fakta esitetään merkkijonona (pakollinen kenttä), ja sille voidaan asettaa pituus, joka ilmoitetaan numerona:

> ```javascript
> const factSchema = mongoose.Schema({
>   fact: { type: String, required: true },
>   length: { type: Number },
> });
> ```

##### 5.3 Mongo Compass <a name="compass"></a>

Seuraamassani tutoriaalissa nostettiin esiin MongoDB:n tarjoama graafinen käyttöliittymä MongoDB Compass. Päätin ottaa sen käyttöön, jotta testidatan asettaminen olisi vaivatonta. Tätä varten vilkaisin Compass:n omaa [dokumentaatiota](https://www.mongodb.com/docs/compass/current/documents/insert/). Käyttämäni data oli valmiiksi JSON-muodossa, joten sen syöttäminen osoittautui helpoksi:

![Mongo Compass tiedon syöttäminen](/assets/insert_document.png)

Kuvan faktat on poimittu avoimesta [rajapinnasta](https://catfact.ninja/). Tiedon syöttämisen jälkeen testasin datan siirtymisen Postmanilla.

### 6. React <a name="react"></a>

Loppukäyttäjän osuudesta halusin luoda mahdollisimman yksinkertaisen, jotta pystyisin perehtymään syvemmin tietokantaan ja REST metodeihin. Loin ainoastaan yhden komponentin Fact.js, jossa lähetetään GET-pyyntö kaikista faktoista fetch function avulla. Tämän jälkeen faktoista arvotaan satunnainen:

> ```javascript
> const getRandomFact = () => {
>   const randomFact = facts[Math.floor(Math.random() * facts.length)];
>   setFact(randomFact);
> };
> ```

Käyttäjä voi painaa painiketta, joka kutsuu kyseistä funktiota, ja näyttää satunnaisen faktan käyttäjälle:

> ```javascript
> <Button onClick={getRandomFact}>Get a random cat fact</Button>
> <div>
> <span>{fact.fact}</span>
> </div>
> ```

En saanut fetch-kutsua ensin toimimaan, sillä vastaan tuli CORS-virhe. Ratkaisin tämän lisäämällä package.json-tiedostoon proxyn serverin localhostille. Näin ollen fetch-kutsun osoitteeksi riitti ainoastaan "/api/facts". ([lähde](https://create-react-app.dev/docs/proxying-api-requests-in-development/)). Hieman epäselväksi jäi, olisiko CORS ollut järkevämpää käsitellä backendin server.js-tiedostossa.

### 6. Yhteenveto <a name="yhteenveto"></a>

Seminaarityön alussa MongoDB oli minulle täysin uusi tietokanta, enkä ollut pystyttänyt backend-serveriä Express:n ja Noden avulla itsenäisesti. REST-palveluiden toteuttamisesta minulla oli kokemusta ainoastaan Spring Boot:sta Javalla. Työn edetessä huomasin, että rakenteen hahmottamisessa tästä oli apua. Löytämäni videotutoriaali oli melko suoraviivainen. Toki jouduin hyödyntämään runsaasti eri ominaisuuksien omaa dokumentaatiota, jotta sain syvempää ymmärrystä tekemiseen.

Videotutoriaalien ongelmana on yleensä, että ne eivät ole välttämättä ajantasalla. Näin kävi esimerkiksi remove-funktion kanssa, jota kutsuttiin controllerissa poistamaan yksittäinen fakta id:n perusteella. Sain virheeksi "remove is not a function", ja pienen selvittelyn jälkeen paljastui, että kyseinen tapa oli vanhentunut. Löysin ajantasaiset operaatiot [dokumentaatiosta](https://mongoosejs.com/docs/queries.html), joten sitä olisi pitänyt hyödyntää tekemisen rinnalla alusta asti.

Valitsin tutoriaalissa käytetyn Mongoose:n tietokannan yhteyden luomiseen, sekä datan ja kyselyiden käsittelyyn, koska minulla ei ollut mitään vertailupohjaa. Jälkeenpäin jäin pohtimaan, olisiko sovelluksessa ollut hyödyllisempää käyttää pelkkää MongoDB-ajuria. Tässä voisi olla yksi syventämisen aihe tulevaisuudessa. Hämmennystä Mongoose:ssa aiheutti esimerkiksi se, onko tietokantayhteyden sulkeminen tarpeellista. Tähän en löytänyt täysin suoraviivaista vastausta.

Työ auttoi minua oppimaan projektin rakenteesta, ja ominaisuuksien jakamisesta osiin. Oli myös mukava saada vertailua Spring Boot:iin. Koin Express:n ja Noden käytön mielekkäänä, koska esimerkiksi eri riippuvuuksien asentaminen on kätevää. Tietokannan data jäi hyvin yksinkertaiseksi, mutta toisaalta kokonaisuutta oli helpompi ymmärtää. Projektia voisi kehittää monella tavalla eteenpäin. Haluaisin luoda backend-puolelle graafisen käyttöliittymän, jonka kautta eri CRUD-toimintoja voisi suorittaa. Tällä hetkellä kaikki kulkee vain esimerkiksi Postmanin kautta. Lisäksi kiinnostaisi käyttäjien ja tunnistautumisen luominen.
