import React, { useEffect, useState } from "react";
import {
  getForeCastByCoord,
  getUserLocation,
  getForecastByCity,
} from "./utils/forecast";
import "./App.css";
import WeatherCard from "./components/weatherCard/WeatherCard";
import MiniWeatherCard from "./components/miniWeatherCard/MiniWeatherCard";
import favorites from "./assets/data/favorites";
import Search from "./components/search/Search";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [units, setUnits] = useState("imperial"); // metric or imperial
  const defaultLocation = { latitude: 45.4215, longitude: -75.6972 }; // Ottawa, Canada
  const [backgroundColor, setBackgroundColor] = useState("#FFFFF"); // default color is sunny
  const weatherColors = {
    snow: "rgba(245, 245, 245, 0.15)",
    clouds: "rgba(169, 169, 169, 0.15)",
    rain: "rgba(30, 144, 255, 0.15)",
    clear: "rgba(135, 206, 235, 0.15)",
    mist: "rgba(176, 224, 230, 0.15)",
    thunderstorm: "rgba(0, 0, 139, 0.15)",
    drizzle: "rgba(126, 192, 238, 0.15)",
    default: "#FFFFF",
  };

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
    // if user selection changes, get weather data
    if (searchedLocation) {
      // Ideally this should run via Geolocaiton. However, openWeatherAPI has a bug that sometimes returns different city names of the ones searched. They might be part of the region metropolitan but it's weird if the user is searching for a specific city and it loads a different name.
      // So, I'm using the city name and country code to get the weather data. This is not ideal but it works for now and it's a better UX since if the user searches for Tokyo for example, by using the geolocation it will return the weather data for "Marunouchi" (which is a district in Tokyo).

      getForecastByCity(
        searchedLocation.city,
        searchedLocation.country,
        units
      ).then((data) => {
        setUserLocation(null);
        setWeatherData(data);
      });
    }
  }, [searchedLocation]);

  useEffect(() => {
    // if weatherData is available and only units change convert temperature
    if (weatherData) {
      const convertedTemp =
        units === "metric"
          ? (weatherData.main.temp - 32) * 0.5556
          : weatherData.main.temp * 1.8 + 32;
      const convertedFeelsLike =
        units === "metric"
          ? (weatherData.main.feels_like - 32) * 0.5556
          : weatherData.main.feels_like * 1.8 + 32;

      setWeatherData({
        ...weatherData,
        main: {
          ...weatherData.main,
          temp: convertedTemp,
          feels_like: convertedFeelsLike,
        },
      });
      console.log(weatherData);
    }
  }, [units]);

  useEffect(() => {
    // if weatherData is available, change background color
    if (weatherData) {
      const weather = weatherData.weather[0].main.toLowerCase();
      const weatherColor = weatherColors[weather] || weatherColors.default;
      setBackgroundColor(weatherColor);
    }
  }, [weatherData]);

  return (
    <div className="app">
      <header
        className="app-header"
        style={{ backgroundColor: backgroundColor }}
      >
        <h1>Weather</h1>
        <div className="app-toggle-temp">
          <input type="checkbox" id="toggle" />
          <label
            htmlFor="toggle"
            onClick={() => {
              setUnits(units === "metric" ? "imperial" : "metric");
            }}
          >
            <div className="app-toggle-temp-text">
              <span>°F</span>
              <span>°C</span>
            </div>
          </label>
        </div>
      </header>
      <div>
        {userLocation && <h2 className="text-center mt-1">Your Location</h2>}
        <WeatherCard props={weatherData} units={units} />
        <div
          className="app-favorites d-flex flex-column p-1"
          style={{ backgroundColor: backgroundColor }}
        >
          <Search find={setSearchedLocation} />
          <h3 className="ms-3 m-2">Favorite Locations</h3>
          <div className="app-favorites-list p-1 overflow-auto container shadow">
            {favorites.map((favorite, index) => (
              <MiniWeatherCard location={favorite} unit={units} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
