// ui.js
const div = document.querySelector("#weather");
   const img = document.querySelector("#giphy-img");
   const errorMsg = document.querySelector("#error-msg"); // Add this in HTML
export function renderWeather(dataObj, unit) {
  div.innerHTML = `
    <h2>${dataObj.address}</h2>
    <p>Temperature: ${dataObj.temperature} ${unit === "us" ? "°F" : "°C"}</p>
    <p>Conditions: ${dataObj.conditions}</p>
    <p>Icon: ${dataObj.icon}</p>
  `;
}
export function renderGiphy(giphyobj){
   img.src= giphyobj.src
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