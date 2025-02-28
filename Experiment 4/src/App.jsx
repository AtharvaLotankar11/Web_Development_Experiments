import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State Initialization
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Data Using useEffect
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Sample API endpoint
      .then((response) => response.json())
      .then((data) => {
        setItems(data); // Store the fetched data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError('Error fetching data'); // Set error message if fetch fails
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render the Data in the Component
  return (
    <div className="App">
      <h1>Fetched Items</h1>
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : error ? (
        <p>{error}</p> // Display error message if there's an issue fetching data
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;