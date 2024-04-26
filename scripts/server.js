import { App } from "@tinyhttp/app";
import serveStatic from "serve-static";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new App();
app.use("/styles", serveStatic(join(__dirname, "../styles")));
app.use("/scripts", serveStatic(join(__dirname, "../scripts")));

const apiKey = process.env.API_KEY;

app.get("/", (req, res) => {
  console.log("Route handler for '/' is being called");
  console.log("searching for index");
  try {
    res.sendFile(join(__dirname, "../index.html"));
    console.log("index.html has been sent");
  } catch (error) {
    console.log("An error occurred while trying to send index.html:", error);
  }
});

app.get("/movies", async (req, res) => {
  fetchDataForType("movies", res);
});

app.get("/series", async (req, res) => {
  fetchDataForType("series", res);
});

app.get("/all", async (req, res) => {
  fetchDataForType("all", res);
});

async function fetchDataForType(type, res) {
  try {
    const movies = [];
    for (let page = 1; page <= 5; page++) {
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
    res.json(movies);
  } catch (error) {
    console.log("An error occurred while trying to fetch data:", error);
    res.status(500).send("An error occurred while trying to fetch data.");
  }
}

app.listen(3000, () => console.log("Started on http://localhost:3000/home"));
