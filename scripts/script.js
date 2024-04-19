const apiKey = "aab2b842dc2a4089dca8ad233f6683dd"; // replace with your actual API key
const apiUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`;
const movieContainer = document.getElementById("list");

const seriesButton = document.getElementById("series");
const moviesButton = document.getElementById("movies");
const allButton = document.getElementById("all");

async function fetchMovies(type) {
  try {
    const movies = [];
    for (let page = 1; page <= 5; page++) {
      let url = apiUrl;
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
    console.log(movies);
    return movies;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

function displayMovies(movies) {
  movieContainer.innerHTML = ""; // clear the container
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
    movieContainer.appendChild(movieElement);
  });
}

seriesButton.addEventListener("click", () => {
  fetchMovies("series").then(displayMovies);
});

moviesButton.addEventListener("click", () => {
  fetchMovies("movies").then(displayMovies);
});

allButton.addEventListener("click", () => {
  fetchMovies("all").then(displayMovies);
});

fetchMovies("all").then(displayMovies);
