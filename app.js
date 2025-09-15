
// app.js
import { getWeather } from "./weatherService.js";
import { renderGiphy, renderWeather } from "./ui.js";
import { showLoading,showError,hideLoading } from "./ui.js";
import { getWeatherGiph } from "./giphyService.js";
let currentUnit = "us";
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const toggleBtn = document.querySelector("#unit-toggle");

async function loadWeather(city) {
  showLoading();
  try {
    const data = await getWeather(city, currentUnit);
    renderWeather(data, currentUnit);

    try {
      const giphyData = await getWeatherGiph(data.conditions);
      renderGiphy(giphyData);
    } catch {
      renderGiphy({ src: "https://media.giphy.com/media/3oEduQAsYf0d8g6H0Y/giphy.gif" });
    }

  } catch (error) {
    showError("Oops! City not found. Please try again.");
    renderGiphy({ src: "https://media.giphy.com/media/3oEduQAsYf0d8g6H0Y/giphy.gif" });
  }
}

// Default city
loadWeather("London");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadWeather(cityInput.value);
});

toggleBtn.addEventListener("click", () => {
  currentUnit = currentUnit === "us" ? "metric" : "us";
  toggleBtn.textContent =
    currentUnit === "us" ? "Switch to °C" : "Switch to °F";
  loadWeather(cityInput.value || "London");
});
