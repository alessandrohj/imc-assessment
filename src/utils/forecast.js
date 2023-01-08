import axios from "axios";

// TODO: Replace with env variable
const API_KEY = "862dcfa41106cc06289b01a7905947f0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const instance = axios.create();

const getWeatherData = ({ latitude, longitude }, units) => {
  return new Promise((resolve, reject) => {
    instance
      .get(
        BASE_URL +
          `lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getCity = (city) => {
  return new Promise((resolve, reject) => {
    instance
      .get(BASE_URL + `q=${city}&lmit=5&appid=${API_KEY}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getWeatherData, getUserLocation, getCity };
