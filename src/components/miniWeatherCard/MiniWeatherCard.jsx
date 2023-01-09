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
        <p data-cy="weathercard-city_name" className="text-end me-2">
          {weatherData.name}, {countries[weatherData.sys.country]}
        </p>
      </div>
    )
  );
}
