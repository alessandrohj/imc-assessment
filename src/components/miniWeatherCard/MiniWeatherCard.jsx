import React, { useState, useEffect } from "react";
import Icon from "../icon/Icon";
import { getForecastByCity } from "../../utils/forecast";
import "./styles.css";

export default function MiniWeatherCard({ location, unit }) {
  const [weatherData, setWeatherData] = useState(null);
  const { city, country } = location;

  const getData = () => {
    getForecastByCity(city, country, unit)
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
        <h2 data-cy="weathercard-city_name" className="text-right me-2">
          {weatherData.name}
        </h2>
      </div>
    )
  );
}
