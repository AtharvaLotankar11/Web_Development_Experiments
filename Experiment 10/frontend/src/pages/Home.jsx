import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WeatherCard from '../components/WeatherCard';
import weatherImg from '../assets/weather.jpg';
import weather2Img from '../assets/weather-2.jpg';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1>Weather-O-Fy</h1>
          <p className="subtitle">Get accurate weather forecasts for any city worldwide with our easy-to-use platform.</p>
        </div>
        <div className="hero-image" style={{ backgroundImage: `url(${weatherImg})` }}></div>
      </div>

      <div className="about-section">
        <div className="about-content">
          <h2>About This</h2>
          <p>
            Weather plays a crucial role in our daily lives, affecting everything from our clothing choices to travel plans. 
            Accurate weather information helps us make informed decisions and stay prepared for changing conditions.
          </p>
          <p>
            Inspired by meteorological department websites, Weather-O-Fy provides reliable weather data in a user-friendly format. 
            Our platform combines modern technology with accurate forecasting to deliver the information you need.
          </p>
        </div>
        <div className="about-image">
          <img src={weather2Img} alt="Weather illustration" />
        </div>
      </div>

      <div className="cards-section">
        <WeatherCard 
          title="Weather in IT Systems" 
          subtitle="Weather data is critical for IT systems that manage logistics, transportation, and emergency services, ensuring smooth operations under various conditions."
        />
        <WeatherCard 
          title="Data Center Management" 
          subtitle="IT professionals use weather forecasts to optimize cooling systems in data centers, reducing energy costs and preventing hardware failures."
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;