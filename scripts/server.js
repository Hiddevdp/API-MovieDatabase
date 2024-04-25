import { App } from "@tinyhttp/app";
import { send } from "@tinyhttp/send";
import serveStatic from "serve-static";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = new App();

// Serve static files from the "public" directory
app.use(serveStatic("public"));

const apiKey = process.env.API_KEY;

app.get("/", (req, res) => {
  send(req, res, "public/index.html");
});

app.get("/data", async (req, res) => {
  try {
    const movies = [];
    const type = req.query.type;
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
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log("Started on http://localhost:3000/data"));
