const iconMap = {
  clear: "01d",
  sunny: "01d",

  cloudy: "03d",
  overcast: "04d",
  haze: "50d",
  mist: "50d",
  fog: "50d",
  smoke: "50d",
  dust: "50d",
  sand: "50d",

  rain: "09d",
  drizzle: "09d",
  showers: "09d",
  "light rain": "10d",
  "heavy rain": "10d",

  thunderstorm: "11d",

  snow: "13d",
  flurries: "13d",
  sleet: "13d",
  hail: "13d",
  ice: "13d",
  "freezing rain": "13d",

  windy: "50d",
  breezy: "50d"
};

const div = document.querySelector("#weather");
const img = document.querySelector("#giphy-img");
const errorMsg = document.querySelector("#error-msg"); // Add this in HTML
export function renderWeather(dataObj, unit) {
   let condition = dataObj.conditions.toLowerCase(); // normalize
  let iconCode = "01d"; // default sunny

  // find matching keyword
  for (const key in iconMap) {
    if (condition.includes(key)) {
      iconCode = iconMap[key];
      break;
    }
  }

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  // formatted date-time
  const now = new Date();
  const formattedDate = now.toLocaleString("en-GB", {
    weekday: "long",   // Monday
    day: "2-digit",    // 15
    month: "short",    // Sep
    year: "numeric",   // 2025
    hour: "2-digit",   // 11
    minute: "2-digit", // 45
    hour12: true    ,   // AM/PM
      timeZone: "Asia/Kolkata" 
  });
  div.innerHTML = `
    <h2>${dataObj.address}</h2>
    <p class="datetime">${formattedDate} (IST)</p>
    <div class="weather-main">
      <img class="weather-icon" src="${iconUrl}" alt="${dataObj.conditions}" />
      <div class="weather-details">
        <p class="temperature">${dataObj.temperature} ${
    unit === "us" ? "°F" : "°C"
  }</p>
        <p class="conditions">${dataObj.conditions}</p>
      </div>
    </div>
  `;
}
export function renderGiphy(giphyobj) {
  img.src = giphyobj.src;
}
export function showLoading() {
  div.innerHTML = `<h2>Loading weather...</h2>`;
  img.src = ""; // clear GIF while loading
  errorMsg.textContent = "";
}

export function hideLoading() {
  div.innerHTML = ""; // clear content, ready for new render
}

export function showError(message) {
  div.innerHTML = `<p style="color: red;">${message}</p>`;
}
