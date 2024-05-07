import { App } from "@tinyhttp/app";
import serveStatic from "serve-static";
import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ejs from "ejs";

const app = new App();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine(".ejs", ejs.__express);
app.set("views", join(__dirname, "../views"));
app.set("view engine", "ejs");

dotenv.config();

app.use("/styles", serveStatic(join(__dirname, "../styles")));
app.use("/scripts", serveStatic(join(__dirname, "../scripts")));

const apiKey = process.env.API_KEY;

app.get("/", async (req, res) => {
  console.log("Route handler for '/' is being called");
  console.log("Rendering index");
  try {
    const all = await fetchDataForType("all");
    res.render("index", { movies: all });
  } catch (error) {
    console.log("An error occurred while trying to render index.ejs:", error);
  }
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await fetchDataForType("movies");
    res.render("movies", { movies: movies });
  } catch (error) {
    console.error("An error occurred while fetching movies:", error);
    res.status(500).send("An error occurred while fetching movies.");
  }
});

app.get("/series", async (req, res) => {
  try {
    const series = await fetchDataForType("series");
    res.render("series", { series: series });
  } catch (error) {
    console.error("An error occurred while fetching series:", error);
    res.status(500).send("An error occurred while fetching series.");
  }
});

app.get("/all", async (req, res) => {
  try {
    const all = await fetchDataForType("all");
    res.render("all", { movies: all });
  } catch (error) {
    console.error("An error occurred while fetching all:", error);
    res.status(500).send("An error occurred while fetching all.");
  }
});

app.get("/info/:type/:id", async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  const details = await fetchDetailsForId(type, id);
  console.log(details);
  res.render("details", { details: details });
});

async function fetchDataForType(type) {
  try {
    const movies = [];
    for (let page = 1; page <= 3; page++) {
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

async function fetchDetailsForId(type, id) {
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const details = await response.json();
  return details;
}

// async function fetchMovieData(itemId, mediaType) {
//   const url = `https://api.themoviedb.org/3/${mediaType}/${itemId}?api_key=${apiKey}`;
//   console.log(`Fetching data for ${mediaType} with ID ${itemId}`);
//   console.log(`Fetching data from URL: ${url}`);
//   const response = await fetch(url);
//   console.log(response);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   const itemData = await response.json();
//   return itemData;
// }

// function getMovieData(movieId, mediaType, movies) {
//   const movie = movies.find(
//     (movie) =>
//       String(movie.id) === movieId && String(movie.media_type) === mediaType
//   );
//   return movie;
// }

app.listen(3000, () => console.log("Started on http://localhost:3000"));
