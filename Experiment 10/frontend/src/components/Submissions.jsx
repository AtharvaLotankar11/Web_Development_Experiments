import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch submissions from backend (like /display in Song.js)
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather');
        setSubmissions(response.data);
      } catch (err) {
        setError('Failed to fetch submissions');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="submissions-container">
      <h2>Saved Weather Submissions</h2>
      
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="submissions-grid">
          {submissions.map((sub) => (
            <div key={sub._id} className="submission-card">
              <h3>{sub.city}</h3>
              <p><strong>Submitted by:</strong> {sub.name} ({sub.email})</p>
              <p><strong>Date:</strong> {new Date(sub.date).toLocaleString()}</p>
              
              {sub.weatherData && (
                <div className="weather-info">
                  <p><strong>Temperature:</strong> {sub.weatherData.temp}°C</p>
                  <p><strong>Humidity:</strong> {sub.weatherData.humidity}%</p>
                  <p><strong>Conditions:</strong> {sub.weatherData.description}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${sub.weatherData.icon}.png`}
                    alt="Weather icon"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissions;