import React from 'react';

const WeatherCard = ({ title, subtitle }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
};

export default WeatherCard;