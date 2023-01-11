import React from "react";
import Icon from "../icon/Icon";
import "./weathercard.css";
import wind from "../../assets/icons/wind.svg";
import temperature from "../../assets/icons/temperature.svg";

export default function WeatherCard({ props, units }) {
  return (
    <div className="d-flex justify-content-center mt-2">
      {!props ? (
        <div className="d-flex flex-column align-items-center justify-content-center loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden" data-cy="weathercard-loading">
              Loading...
            </span>
          </div>
          <p className="text-center mt-2">Loading...</p>
        </div>
      ) : (
        <div className="weathercard">
          <Icon type={props.weather[0].main} />
          <div className="text-center d-flex flex-column gap-0">
            <h2 data-cy="weathercard-city_name">{props.name}</h2>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3 className="text-muted" data-cy="weathercard-condition">
                {props.weather[0].main}
              </h3>
              {/* {props.weather[0].main.toLowerCase() !==
              props.weather[0].description.toLowerCase() ? (
                <span className="mb-4" />
              ) : (
                <p className="text-muted">
                  {props.weather[0].description
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              )} */}
              <div className="d-flex gap-5">
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img src={temperature} alt="temperature" />
                  <div className="d-flex gap-1 align-items-center justify-content-center weathercard-details mb-2">
                    <p data-cy="weathercard-temp">
                      {Math.round(props.main.temp_min)}
                    </p>
                    <p>/</p>
                    <p data-cy="weathercard-temp">
                      {Math.round(props.main.temp_max)}
                      {units === "metric" ? "°C" : "°F"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-1 weathercard-details mb-2">
                  <img src={wind} alt="wind" />
                  <p>{props.wind.speed}</p>
                </div>
              </div>
            </div>
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
