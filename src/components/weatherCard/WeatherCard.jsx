import React from "react";
import Icon from "../icon/Icon";
import "./weathercard.css";
import wind from "../../assets/icons/wind.svg";
import temperature from "../../assets/icons/temperature.svg";
import Details from "../details/Details";
import Forecast from "../forecast/Forecast";

export default function WeatherCard({ props, units, userLocation }) {
  return (
    <div className="d-flex justify-content-center mt-2 weathercard">
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
        <div className="weathercard d-md-flex flex-md-column flex-md-column align-items-md-center justify-items-lg-center ">
          {userLocation && <h2 className="text-center mt-1">Your Location</h2>}
          <Icon type={props.weather[0].main} />
          <div className="text-center d-flex flex-column gap-0">
            <h2 data-cy="weathercard-city_name">{props.name}</h2>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3 className="text-muted" data-cy="weathercard-condition">
                {props.weather[0].main}
              </h3>
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
                  <p>
                    {props.wind.speed} {units === "metric" ? "km/h" : "mph"}
                  </p>
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
          <div className="additional-info-container d-flex justify-content-center align-items-center">
            <Details props={props} units={units} />
            <Forecast props={props} units={units} />
          </div>
        </div>
      )}
    </div>
  );
}
