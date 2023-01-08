import React from "react";
import Icon from "../icon/Icon";

export default function WeatherCard({ props, units }) {
  return (
    <div>
      {!props ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="weather-card">
          <h1>{props.name}</h1>
          <Icon type={props.weather[0].main} />
          <h2>{props.weather[0].main}</h2>
          <h3>
            {Math.round(props.main.temp)} {units === "metrics" ? "°C" : "°F"}
          </h3>
        </div>
      )}
    </div>
  );
}
