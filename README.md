# API-MovieDatabase

Voor het vak API is het de bedoeling dat we met api een app gaan maken naar keuze.
Ik heb gekozen om met MovieDB een soort database voor films en series te maken.

### Server

Ik begin met het importeren van de nodige modules voor mijn applicatie. Ik gebruik @tinyhttp/app om mijn server te maken, serve-static om statische bestanden te serveren, dotenv om omgevingsvariabelen te beheren, path en url om met bestandspaden te werken, en ejs om mijn views te renderen.

Vervolgens maak ik een nieuwe instantie van de App klasse van @tinyhttp/app. Dit wordt mijn server. Ik stel de view engine van mijn server in op ejs, en ik geef aan waar mijn views zich bevinden.

Ik laad mijn omgevingsvariabelen met dotenv.config(). Dit zorgt ervoor dat ik toegang heb tot mijn API-sleutel, die ik opsla in de constante apiKey.

Ik gebruik serveStatic om statische bestanden te serveren vanuit de styles en scripts mappen. Dit zorgt ervoor dat mijn CSS en JavaScript bestanden correct worden geladen wanneer een gebruiker mijn website bezoekt.

Ik definieer een route handler voor de root route (/). Wanneer een gebruiker naar deze route navigeert, haal ik data op met de fetchDataForType functie en render ik de index view met deze data. Ik vang eventuele fouten op en log deze naar de console.

Ik begin ook met het definiëren van een route handler voor de /movies route. De code voor deze route is nog niet volledig, maar ik ben van plan om hier ook data op te halen en een view te renderen.

Over het algemeen beheer ik mijn server door route handlers te definiëren voor verschillende routes, data op te halen, en views te renderen met deze data. Ik gebruik ook middleware zoals serveStatic om statische bestanden te serveren.

### Ejs

Ik begon met het importeren van de EJS-module in mijn serverbestand. Ik had EJS nodig om mijn views te renderen, dus dit was een belangrijke stap.

Vervolgens stelde ik de view engine van mijn server in op EJS. Dit deed ik door de set methode van mijn server aan te roepen met de argumenten "view engine" en "ejs". Dit vertelde mijn server dat ik EJS wilde gebruiken om mijn views te renderen.

Ik gaf ook aan waar mijn views zich bevonden. Ik gebruikte de join functie van de path module om het pad naar mijn views map te genereren, en ik gaf dit pad door aan de set methode van mijn server met het argument "views". Dit vertelde mijn server waar het mijn views kon vinden.

Toen ik een route handler definieerde voor de root route (/), gebruikte ik EJS om mijn index view te renderen. Ik haalde eerst data op met de fetchDataForType functie. Deze data was een array met films en series. Vervolgens riep ik de render methode van het response object aan met de argumenten "index" en een object dat de opgehaalde data bevatte. Dit vertelde mijn server dat het de index view moest renderen met de opgehaalde data.

Ik ving eventuele fouten op die optraden tijdens het renderen van de view en logde deze naar de console. Dit hielp me om eventuele problemen met mijn views of de data die ik aan hen doorgaf te identificeren.

Over het algemeen gebruikte ik EJS om mijn views te renderen met data die ik ophaalde in mijn route handlers. Ik stelde mijn server in om EJS te gebruiken, gaf aan waar mijn views zich bevonden, en riep de render methode aan om een view te renderen met een bepaalde set data.

### MovieDB api

Ik wilde graag films en series laten zien vanuit de MovieDB api. 
met behulp van de copilot heb ik dit geschreven. Het is mogelijk om meerdere paginas in te laden want ik vond 20 films/series wat te weinig.
Deze function kan aan de hand van het opgegeven type de juiste media in de movies array doen.

```javascript
async function fetchDataForType(type) {
  //functie voor het ophalen van array van films/series/alles
  try {
    const movies = [];
    for (let page = 1; page <= 3; page++) {
      //voor het inladen van meer dan een pagina
      let url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&page=${page}`;
      if (type === "series") {
        url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&page=${page}`;
      } else if (type === "movies") {
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`;
      } else if (type === "all") {
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&page=${page}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      movies.push(...data.results);
    }
    return movies;
  } catch (error) {
    console.log("An error occurred while trying to fetch data:", error);
  }
}
```

### Share api

Natuurlijk, hier is een uitleg in het Nederlands vanuit jouw perspectief in de verleden tijd over hoe je de Web Share API gebruikte in deze code:

Ik begon met het selecteren van het element met de id "share" op mijn webpagina. Ik wist dat dit het element was dat ik wilde gebruiken om de deelfunctie te activeren, dus ik gebruikte document.getElementById om het te selecteren.

Vervolgens voegde ik een event listener toe aan dit element. Ik wilde dat er iets gebeurde wanneer een gebruiker op dit element klikte, dus ik gebruikte de addEventListener methode met het argument "click".

Binnen de event handler controleerde ik of de Web Share API beschikbaar was in de browser van de gebruiker. Ik wist dat niet alle browsers deze API ondersteunen, dus ik gebruikte een if-statement om te controleren of navigator.share bestond.

Als de Web Share API beschikbaar was, probeerde ik de share methode aan te roepen met een object dat de titel, tekst en URL bevatte die ik wilde delen. Ik haalde deze waarden op uit de inhoud van de h1 en p elementen op mijn pagina en de huidige URL. Ik gebruikte een try-catch blok om eventuele fouten op te vangen die optraden tijdens het delen.

Als er een fout optrad tijdens het delen, logde ik deze naar de console met console.error. Dit hielp me om eventuele problemen te identificeren.

Als de Web Share API niet beschikbaar was in de browser van de gebruiker, logde ik een bericht naar de console om dit aan te geven. Ik wist dat mijn deelfunctie niet zou werken in deze browsers, dus ik wilde de gebruiker hiervan op de hoogte brengen.

Over het algemeen gebruikte ik de Web Share API om gebruikers in staat te stellen de inhoud van mijn pagina te delen. Ik controleerde of de API beschikbaar was, haalde de inhoud op die ik wilde delen, en riep de share methode aan om het delen te starten.

