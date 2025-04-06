import React, { useState } from 'react';
import axios from 'axios';

const WeatherForm = () => {
  // State for form inputs and weather data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
  });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Fetch weather data from OpenWeather API
      const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${formData.city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      // Extract relevant weather data
      const extractedWeatherData = {
        temp: weatherResponse.data.main.temp,
        humidity: weatherResponse.data.main.humidity,
        description: weatherResponse.data.weather[0].description,
        icon: weatherResponse.data.weather[0].icon,
      };

      // Step 2: Send data to your backend (like Song.js example)
      const submissionData = {
        ...formData,
        weatherData: extractedWeatherData,
      };

      await axios.post('http://localhost:5000/api/weather', submissionData);

      // Update state to show success
      setWeatherData(extractedWeatherData);
      setFormData({ name: '', email: '', city: '' }); // Reset form
    } catch (err) {
      console.error('Full error:', err.response?.data || err.message);
      setError(`API Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-form-container">
      <h2>Find Weather</h2>
      
      {/* Success message after submission */}
      {weatherData && (
        <div className="weather-result">
          <h3>Weather in {formData.city} (Saved to Database)</h3>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Conditions: {weatherData.description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather & Save'}
        </button>
      </form>
    </div>
  );
};

export default WeatherForm;