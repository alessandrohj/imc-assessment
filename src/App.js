import React, {useEffect, useState} from 'react';
import {getWeatherData, getUserLocation} from './utils/forecast';
import './App.css';



function App() {
  const [weatherData, setWeatherData] = useState(null)
  const defaultLocation = { latitude: 45.4215, longitude: -75.6972 } // Ottawa

  // get user location and weather data on first load. If user location is not available, use default location
  const firstLoad = () => {
    getUserLocation()
      .then((location) => {
       return getWeatherData(location)
      })
      .then((data) => {
        setWeatherData(data)
      })
      .catch((error) => {
        console.log(error)
        getWeatherData(defaultLocation)
          .then((data) => {
            setWeatherData(data)
          })
      }
      )
  }

  useEffect(() => {
    firstLoad()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        </header>
    </div>
  );
}

export default App;
