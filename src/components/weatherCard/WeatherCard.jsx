import React from "react";
import Icon from "../icon/Icon";

export default function WeatherCard({ props, units }) {
  return (
    <div className="d-flex justify-content-center mt-5">
      {!props ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div style={{ width: "10rem" }}>
          <Icon type={props.weather[0].main} className="card-img-top" />
          <div className="text-center">
            <h2>{props.name}</h2>
            <h3 className="mb-2 text-muted">{props.weather[0].main}</h3>
            <div className="d-flex gap-2 justify-content-center">
              <p className="fw-bold">
                {Math.round(props.main.temp)}
                {units === "metrics" ? "°C" : "°F"}
              </p>
              <p>
                (Feels like: {Math.round(props.main.feels_like)}
                {units === "metrics" ? "°C" : "°F"})
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
