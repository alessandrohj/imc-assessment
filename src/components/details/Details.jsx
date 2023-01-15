import React from "react";
import convertWindSpeed from "../../utils/convertWindSpeed";

export default function Details({ props, units }) {
  function getTime(time) {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  }

  return (
    <div className="weather-details">
      <div className="weather-details-container d-flex justify-content-center align-items-center gap-5 w-100 mt-4">
        <div className="weather-details-current d-flex flex-column w-100 justify-content-start me-5">
          <div className="weather-details__item">
            <p className="weather-details__item-sunrise">
              <strong> Sunrise:</strong>
              <span className="weather-details__item-time ms-1">
                {getTime(props.sys.sunrise)}
              </span>
            </p>
            <p className="weather-details__item-sunset">
              <strong> Sunset:</strong>
              <span className="weather-details__item-time ms-1">
                {getTime(props.sys.sunset)}
              </span>
            </p>
          </div>
          <div className="weather-details__item">
            <p className="weather-details__item-humidity">
              <strong>Humidity:</strong> {props.main.humidity}%
            </p>
          </div>
          <div className="weather-details__item">
            <p className="weather-details__item-pressure">
              <strong>Pressure:</strong> {props.main.pressure} hPa
            </p>
          </div>
          <div className="weather-details__item d-md-flex gap-3">
            <p className="weather-details__item-visibility">
              <strong>Visibility:</strong> {convertWindSpeed(props.visibility)}{" "}
              <span className="weather-details__item-meters">
                {units === "metric" ? "km" : "miles"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
