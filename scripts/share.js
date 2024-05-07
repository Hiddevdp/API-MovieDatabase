document.getElementById("share").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.querySelector("h1").innerText,
        text: document.querySelector("p").innerText,
        url: window.location.href,
      });
    } catch (err) {
      console.error("There was an error sharing:", err);
    }
  } else {
    console.log("Web Share API is not supported in your browser.");
  }
});
