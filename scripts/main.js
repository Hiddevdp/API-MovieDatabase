document.getElementById("movies").addEventListener("click", function () {
  fetchData("movies");
});

document.getElementById("series").addEventListener("click", function () {
  fetchData("series");
});

document.getElementById("all").addEventListener("click", function () {
  fetchData("all");
});

function fetchData(type) {
  fetch(`/${type}`)
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("list");
      // Clear the list before appending new items
      list.innerHTML = "";
      data.forEach((item) => {
        const card = document.createElement("div");
        card.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`;
        list.appendChild(card);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Fetch all data when the page loads
fetchData("all");
