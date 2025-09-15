// weatherService.js
import { iconMap } from "./ui.js";
export async function getWeather(city, unit = "us") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=YFLQXNWC3BV2YT9WQWHVYU3A6&contentType=json`
    );
    const data = await response.json();
    console.log(data);
    return {
      address: data.address,
      temperature: data.currentConditions.temp,
      conditions: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
      sunrise: data.currentConditions.sunrise,
      sunset: data.currentConditions.sunset,
      visibility: data.currentConditions.visibility,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      winddirection: data.currentConditions.winddir,
      weeklyForcast:
        data.days
 .slice(1, 8) // skip today, take next 7 days
  .map((day) => {
    const dayName = new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "short",
    });
          const date = new Date(day.datetime); // use day.datetime, not now
  const formattedDates = date.toLocaleString("en-GB", {
    weekday: "long",   // Monday
    day: "2-digit",    // 15
    month: "short",    // Sep
    year: "numeric",   // 2025
    
  });
      
        const maxTemp = Math.round(day.tempmax);
        const minTemp = Math.round(day.tempmin);
        const desc = day.conditions; // or day.description
        let condition = desc.toLowerCase(); // normalize
        let iconCode = "01d"; // default sunny

        // find matching keyword
        for (const key in iconMap) {
          if (condition.includes(key)) {
            iconCode = iconMap[key];
            break;
          }
        }

        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        return {
          formattedDates,
          dayName,
          maxTemp,
          minTemp,
          desc,
          iconUrl,
        };
      }),
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error; // let app.js decide what to do
  }
}
