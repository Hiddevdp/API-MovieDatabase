// document.getElementById("movies").addEventListener("click", function () {
//   fetchData("movies");
// });

// document.getElementById("series").addEventListener("click", function () {
//   fetchData("series");
// });

// document.getElementById("all").addEventListener("click", function () {
//   fetchData("all");
// });

// function fetchData(type) {
//   return new Promise((resolve, reject) => {
//     fetch(`/${type}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const list = document.getElementById("list");
//         list.innerHTML = "";
//         data.forEach((item) => {
//           const card = document.createElement("div");
//           card.classList.add("card");
//           card.dataset.id = item.id;
//           card.dataset.media_type = item.media_type;
//           card.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`;
//           list.appendChild(card);
//         });
//         addEventListeners();
//         resolve();
//       })
//       .catch(reject);
//   });
// }

// // Add event listeners to the .card elements
// function addEventListeners() {
//   document.querySelectorAll(".card");
//   const cardElements = document.querySelectorAll(".card");
//   console.log(cardElements.length);
//   cardElements.forEach((itemElement) => {
//     itemElement.addEventListener("click", () => {
//       // Get the ID and media type of the clicked item
//       const itemId = itemElement.dataset.id;
//       const mediaType = itemElement.dataset.media_type;
//       // Navigate to the details page of the clicked item
//       window.location.href = `/${mediaType}/${itemId}`;
//       console.log(mediaType, itemId);
//     });
//   });
// }

// // Fetch all data when the page loads
// fetchData("all");
