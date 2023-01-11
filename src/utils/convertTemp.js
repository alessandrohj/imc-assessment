const convertTemp = (temp, unit) => {
  if (unit === "metric") {
    return (temp - 32) * 0.5556;
  } else {
    return temp * 1.8 + 32;
  }
};

export default convertTemp;
