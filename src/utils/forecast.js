import axios from "axios";

// TODO: Replace with env variable
// const API_KEY = "9e1d759ed9f58b7f04de1b66b70a5c37";
const API_KEY = "e83b3c4c08285bf87b99f9bbc0abe3f0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const instance = axios.create();

const getForeCastByCoord = ({ latitude, longitude }, units) => {
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

const getForecastByCity = (city, country, units) => {
  return new Promise((resolve, reject) => {
    instance
      .get(BASE_URL + `q=${city},${country}&appid=${API_KEY}&units=${units}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
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

const getGeolocation = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=5&appid=${API_KEY}`;
    instance
      .get(url)
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

const getForecast = (lat, lon, units) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=${units}`;
    instance
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
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

export {
  getForeCastByCoord,
  getUserLocation,
  getForecastByCity,
  getGeolocation,
  getForecast,
};
