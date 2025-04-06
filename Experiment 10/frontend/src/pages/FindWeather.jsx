import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WeatherForm from '../components/WeatherForm';

const FindWeather = () => {
  return (
    <div className="find-weather-page">
      <Navbar />
      <WeatherForm />
      <Footer />
    </div>
  );
};

export default FindWeather;