import { useState } from "react";
import "./App.css";
import CurrentWeather from "./component/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./component/search/api";
import Search from "./component/search/search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({
          city: searchData.label,
          ...weatherResponse,
        });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  );
}

export default App;
