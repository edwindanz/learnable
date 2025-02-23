import React, { useState } from 'react';
import './Weather.css';

function Weather() {
  const [cityName, setCityName] = useState(''); // State for city name
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [error, setError] = useState(null); // State for handling errors

  const API_KEY = '3127864d3d6a861216d51ad4e69bbccc'; // Replace with your own API key

  const handleCityChange = (e) => {
    setCityName(e.target.value); // Update city name state as user types
  };

  const fetchWeather = () => {
    if (!cityName) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data); // Update weather data state
          setError(null); // Reset any errors
        } else {
          setError(data.message); // Set error message if city is not found
          setWeatherData(null);
        }
      })
      .catch((err) => {
        setError('Error fetching data. Please try again.');
        setWeatherData(null);
      });
  };

  return (
    <div className="weather-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={handleCityChange}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;