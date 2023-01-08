import React from "react";
import Icon from "../icon/Icon";
import "./weathercard.css";

export default function WeatherCard({ props, units }) {
  return (
    <div className="d-flex justify-content-center mt-2">
      {!props ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden" data-cy="weathercard-loading">
              Loading...
            </span>
          </div>
          <p className="text-center mt-2">Loading...</p>
        </div>
      ) : (
        <div style={{ width: "15rem " }}>
          <Icon type={props.weather[0].main} />
          <div className="text-center">
            <h2 data-cy="weathercard-city_name">{props.name}</h2>
            <h3 className="mb-2 text-muted" data-cy="weathercard-condition">
              {props.weather[0].main}
            </h3>
            <div className="d-flex gap-2 justify-content-center">
              <p className="fw-bold" data-cy="weathercard-temp">
                {Math.round(props.main.temp)}
                {units === "metric" ? "°C" : "°F"}
              </p>
              <p data-cy="weathercard-feels_like">
                (Feels like: {Math.round(props.main.feels_like)}
                {units === "metric" ? "°C" : "°F"})
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
