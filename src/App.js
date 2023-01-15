import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
import convertWindSpeed from "./utils/convertWindSpeed";
import convertTemp from "./utils/convertTemp";

function App() {
  const [favoritesList, setFavoritesList] = useState(favorites);
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
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
      const convertedTemp = convertTemp(weatherData.main.temp, units);
      const convertedFeelsLike = convertTemp(
        weatherData.main.feels_like,
        units
      );
      const convertedWindSpeed = Math.round(
        convertWindSpeed(weatherData.wind.speed, units)
      );

      setWeatherData({
        ...weatherData,
        main: {
          ...weatherData.main,
          temp: convertedTemp,
          feels_like: convertedFeelsLike,
        },
        wind: {
          ...weatherData.wind,
          speed: convertedWindSpeed,
        },
      });
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

  const onDragEnd = (result) => {
    // if no destination
    if (!result.destination) {
      return;
    }
    // if the item is dropped in the same position
    if (result.destination.index === result.source.index) {
      return;
    }
    // create a new array with the updated order
    const newFavoritesList = [...favoritesList];
    const [removed] = newFavoritesList.splice(result.source.index, 1);
    newFavoritesList.splice(result.destination.index, 0, removed);
    // set the state with the new array
    setFavoritesList(newFavoritesList);
  };

  useEffect(() => {
    // if clickedCard is available, get weather data
    if (clickedCard) {
      getForecastByCity(clickedCard.name, clickedCard.sys.country, units).then(
        (data) => {
          setUserLocation(null);
          setWeatherData(data);
        }
      );
    }
  }, [clickedCard]);

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
      <div className="app-body d-md-flex flex-md-row-reverse justify-content-md-between align-items-md-center">
        <WeatherCard
          props={weatherData}
          units={units}
          userLocation={userLocation}
        />
        <div
          className="app-favorites d-flex flex-column p-1 pt-md-1 mt-md-2 ms-md-2"
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "white",
            boxShadow: !backgroundColor
              ? "0 0 10px 0 rgba(0, 0, 0, 0.2)"
              : "none",
          }}
        >
          <Search find={setSearchedLocation} />
          <h3 className="ms-3 m-2 ms-md-0 m-md-0 text-center">
            Favorite Locations
          </h3>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="fave-list" type="favorites">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="app-favorites-list p-1 overflow-auto container shadow"
                >
                  {favoritesList.map((favorite, index) => (
                    <MiniWeatherCard
                      location={favorite}
                      unit={units}
                      key={favorite.id}
                      index={index}
                      select={setClickedCard}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
