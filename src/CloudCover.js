import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const cityList = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'];
function Weather() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState({
    city: '',
    temperature: {
      current: 0,
    },
    forecast: '',
    cloudCover: 0,
    sunriseSunset: {
      sunrise: '',
      sunset: ''
    },
    moonPhase: '',
    visibility: '',
    temperatureRange: {
      high: 0,
      low: 0
    },
    wind: {
      speed: 0,
      direction: 0
    },
    precipitation: '',
    atmosphericPressure: 0
  });

  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };

  const handleCitySelect = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (cityName) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=6add74d6b76b0b938510da6c2c14f624`)
        .then(response => {
          const data = response.data;
          setWeatherData({
            city: data.name,
            temperature: {
              current: Math.round(data.main.temp)
            },
            forecast: data.weather[0].description,
            cloudCover: data.clouds.all,
            sunriseSunset: {
              sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
              sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
            },
            moonPhase: data.moon_phase,
            visibility: data.visibility,
            temperatureRange: {
              high: Math.round(data.main.temp_max),
              low: Math.round(data.main.temp_min)
            },
            wind: {
              speed: Math.round(data.wind.speed),
              direction: data.wind.deg
            },
            precipitation: data.weather[0].main,
            atmosphericPressure: data.main.pressure
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [cityName]);

  return (
    <div className="weather-container">
      <h1>{weatherData.city}</h1>
      <p>Current Temperature: {weatherData.temperature.current}°F</p>
      <p>Temperature Range: {weatherData.temperatureRange.low}°F - {weatherData.temperatureRange.high}°F</p>
      <p>Forecast: {weatherData.forecast}</p>
      <p>Cloud Cover: {weatherData.cloudCover}%</p>
      <p>Sunrise: {weatherData.sunriseSunset.sunrise}</p>
      <p>Sunset: {weatherData.sunriseSunset.sunset}</p>
      <p>Moon Phase: {weatherData.moonPhase}</p>
      <p>Visibility: {weatherData.visibility} meters</p>
      <p>Wind Speed: {weatherData.wind.speed} mph</p>
      <p>Wind Direction: {weatherData.wind.direction}°</p>
      <p>Precipitation: {weatherData.precipitation}</p>
      <p>Atmospheric Pressure: {weatherData.atmosphericPressure} hPa</p>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={cityName} onChange={handleCityChange} />
          <button type="submit">Search</button>
        </label>
      </form>
      <label>
        Suggested Cities:
        <select value={cityName} onChange={handleCitySelect}>
          <option value="">--Select a city--</option>
          {/* {cityList.map(city => (
            <option key={city} value={city}>{city}</option>
          ))} */}
        </select>
      </label>
    </div>
  );
}
export default Weather;