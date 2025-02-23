import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your own OpenWeatherMap API key
  const API_KEY = '3127864d3d6a861216d51ad4e69bbccc';
  const city = 'Oak Creek'; // You can change this to any city you want to get the weather for

  useEffect(() => {
    // Fetch the weather data when the component mounts
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setWeather(response.data);
        setError(null);
      })
      .catch((err) => {
        setError('Error fetching weather data');
        console.error(err);
      });
  }, [city]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Weather">
      <h2>Weather in {weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;