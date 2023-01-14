const convertWindSpeed = (speed, unit) => {
  if (unit === "metric") {
    return speed * 1.609;
  } else {
    return speed;
  }
};

export default convertWindSpeed;
