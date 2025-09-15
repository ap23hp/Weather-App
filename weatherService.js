// weatherService.js
export async function getWeather(city, unit = "us") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=YFLQXNWC3BV2YT9WQWHVYU3A6&contentType=json`
    );
    const data = await response.json();
console.log(data)
    return {
      address: data.address,
      temperature: data.currentConditions.temp,
      conditions: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
      sunrise:data.currentConditions.sunrise,
        sunset:data.currentConditions.sunset,
        visibility:data.currentConditions.visibility,
        humidity:data.currentConditions.humidity,
        windspeed:data.currentConditions.windspeed,
        winddirection:data.currentConditions.winddir
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error; // let app.js decide what to do
  }
}
