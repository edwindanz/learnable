import React, { useState } from 'react';
import './Weather.css';

function Weather() {
  const [cityName, setCityName] = useState(''); // State for city name
  const [stateName, setStateName] = useState(''); // State for selected state
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [error, setError] = useState(null); // State for handling errors

  const API_KEY = '3127864d3d6a861216d51ad4e69bbccc'; // Replace with your own API key

  // List of US states (Abbreviated)
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleCityChange = (e) => {
    setCityName(e.target.value); // Update city name state as user types
  };

  const handleStateChange = (e) => {
    setStateName(e.target.value); // Update state name state
  };

  const fetchWeather = () => {
    if (!cityName || !stateName) return;

    const location = `${cityName},${stateName}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

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
        <select onChange={handleStateChange} value={stateName}>
          <option value="">Select a state</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
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