import React, { useState, useEffect } from "react";
import Icon from "../icon/Icon";
import { getForecastByCity } from "../../utils/forecast";
import countries from "../../assets/data/countries";
import "./styles.css";

export default function MiniWeatherCard({ location, unit }) {
  const [weatherData, setWeatherData] = useState(null);
  const { city, state, country } = location;

  const getData = () => {
    getForecastByCity(city, state, country, unit)
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    weatherData && (
      <div className="d-flex justify-content-between align-items-center mini-card">
        <Icon type={weatherData.weather[0].main} />
        <div className="d-flex w-100 justify-content-between">
          <p data-cy="weathercard-temp text-muted" className="text-left">
            {Math.round(weatherData.main.temp_min)} /{" "}
            {Math.round(weatherData.main.temp_max)}
            {unit === "metric" ? "°C" : "°F"}
          </p>
          <p
            data-cy="weathercard-city_name"
            className="text-end text-wrap text-break me-2 fw-bold"
          >
            {weatherData.name}, {countries[weatherData.sys.country]}
          </p>
        </div>
      </div>
    )
  );
}
