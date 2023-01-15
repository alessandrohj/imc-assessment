import React, { useState, useEffect } from "react";
import { getForecast } from "../../utils/forecast";
import "./forecast.css";

export default function Forecast({ props, units }) {
  const [forecast, setForecast] = useState([]);

  function onLoad() {
    getForecast(props.coord.lat, props.coord.lon, units).then((response) => {
      setForecast(response);
    });
  }

  useEffect(() => {
    onLoad();
  }, [props]);

  function getHour(timestamp) {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const amppm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const time = hours + " " + amppm;
    return time;
  }
  return (
    forecast.list && (
      <div className="forecast d-none d-md-block w-50 mt-2">
        <h5 className="text-center">Next Hours</h5>
        <div className="weather-forecast d-flex flex-wrap justify-content-center align-items-center">
          {forecast.list.map((item, index) => {
            return (
              <div
                className="weather-forecast__item d-flex flex-row w-100 gap-1 justify-content-center align-items-center"
                key={index}
              >
                <p className="weather-forecast__item-hours fw-bold mt-2">
                  {getHour(item.dt)}
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <p className="weather-forecast__item-temp mt-1 ms-2 text-end">
                    {Math.round(item.main.temp)}{" "}
                    {units === "metric" ? "°C" : "°F"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
