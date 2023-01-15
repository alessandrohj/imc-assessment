import React, { useState, useEffect, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import Icon from "../icon/Icon";
import { getForecastByCity } from "../../utils/forecast";
import countries from "../../assets/data/countries";
import convertTemp from "../../utils/convertTemp";
import "./styles.css";

export default function MiniWeatherCard({ location, unit, index, select }) {
  const [weatherData, setWeatherData] = useState(null);
  const { city, country, id } = location;

  const getData = () => {
    getForecastByCity(city, country, unit)
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

  useEffect(() => {
    if (weatherData) {
      const tempMin = convertTemp(weatherData.main.temp_min, unit);
      const tempMax = convertTemp(weatherData.main.temp_max, unit);
      setWeatherData({
        ...weatherData,
        main: { temp_min: tempMin, temp_max: tempMax },
      });
    }
  }, [unit]);

  return (
    weatherData && (
      <Draggable key={id} draggableId={id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="d-flex justify-content-between align-items-center mini-card"
            onClick={() => select(weatherData)}
          >
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
        )}
      </Draggable>
    )
  );
}
