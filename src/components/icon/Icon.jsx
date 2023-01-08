import React from "react";
import snowy from "../../assets/images/Snowy.png";
import rainy from "../../assets/images/Rainy.png";
import partlyCloudy from "../../assets/images/Partly_Cloudy.png";
import sunny from "../../assets/images/Sunny.png";

export default function Icon({ type }) {
  const images = {
    Snow: snowy,
    Rain: rainy,
    Clouds: partlyCloudy,
    Clear: sunny,
  };

  const icon = images[type] ? images[type] : images.Clouds;

  return (
    <div>
      <img src={icon} alt={type} />
    </div>
  );
}
