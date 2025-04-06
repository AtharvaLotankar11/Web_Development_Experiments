import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindWeather from './pages/FindWeather';
import DisplaySubmissions from './pages/DisplaySubmissions';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-weather" element={<FindWeather />} />
          <Route path="/display-submissions" element={<DisplaySubmissions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;