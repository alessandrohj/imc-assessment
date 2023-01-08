import React, { useEffect, useState } from "react";
import { getForeCastByCoord, getUserLocation } from "./utils/forecast";
import "./App.css";
import WeatherCard from "./components/weatherCard/WeatherCard";
import MiniWeatherCard from "./components/miniWeatherCard/MiniWeatherCard";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [units, setUnits] = useState("metric"); // metric or imperial
  const defaultLocation = { latitude: 45.4215, longitude: -75.6972 }; // Ottawa

  const favorites = [
    { city: "Ottawa", country: "CA" },
    { city: "Toronto", country: "CA" },
    { city: "Montreal", country: "CA" },
    { city: "Vancouver", country: "CA" },
    { city: "New York", country: "US" },
    { city: "Berlin", country: "DE" },
    { city: "Tokyo", country: "JP" },
    { city: "Sydney", country: "AU" },
    { city: "Seoul", country: "KR" },
  ];

  // get user location and weather data on first load. If user location is not available, use default location
  const firstLoad = () => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
        return getForeCastByCoord(location, units);
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
        getForeCastByCoord(defaultLocation).then((data) => {
          setWeatherData(data);
        });
      });
  };

  useEffect(() => {
    firstLoad();
  }, []);

  useEffect(() => {
    // if weatherData is available and only units change convert temperature
    if (weatherData) {
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const convertedTemp =
        units === "metric" ? (temp - 32) * 0.5556 : temp * 1.8 + 32;
      const convertedFeelsLike =
        units === "metric" ? (feelsLike - 32) * 0.5556 : feelsLike * 1.8 + 32;

      setWeatherData({
        ...weatherData,
        main: {
          ...weatherData.main,
          temp: convertedTemp,
          feels_like: convertedFeelsLike,
        },
      });
    }
  }, [units]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather App</h1>
        <div className="app-toggle-temp">
          <input type="checkbox" id="toggle" />
          <label
            htmlFor="toggle"
            onClick={() => {
              setUnits(units === "imperial" ? "metric" : "imperial");
            }}
          >
            <div className="app-toggle-temp-text">
              <span>°C</span>
              <span>°F</span>
            </div>
          </label>
        </div>
      </header>
      <WeatherCard props={weatherData} units={units} />
      <div className="app-favorites d-flex flex-column p-1">
        <h3 className="ms-3">Favorite Locations</h3>
        {favorites.map((favorite, index) => (
          <MiniWeatherCard location={favorite} unit={units} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
