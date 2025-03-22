import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State Initialization
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Weather Data Using useEffect
  useEffect(() => {
    const apiKey = 'your-api-key'; // Your API key
    const city = 'city-name'; // City name
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`; // Weather API endpoint

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data); // Store the fetched weather data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError('Error fetching data'); // Set error message if fetch fails
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Define weather attributes as an array
  const weatherAttributes = weather
    ? [
        { label: 'Temperature', value: `${weather.current.temp_c}°C` },
        { label: 'Condition', value: weather.current.condition.text },
        { label: 'Wind Speed', value: `${weather.current.wind_kph} km/h` },
        { label: 'Humidity', value: `${weather.current.humidity}%` },
      ]
    : [];

  // Render the Weather Data in the Component
  return (
    <div className="App">
      <h1>Weather in Mumbai</h1>
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : error ? (
        <p>{error}</p> // Display error message if there's an issue fetching data
      ) : (
        <div>
          <h3>{weather.location.name}</h3>
          <ul>
            {weatherAttributes.map((attr, index) => (
              <li key={index}>
                <strong>{attr.label}:</strong> {attr.value}
              </li>
            ))}
          </ul>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
        </div>
      )}
    </div>
  );
};

export default App;
