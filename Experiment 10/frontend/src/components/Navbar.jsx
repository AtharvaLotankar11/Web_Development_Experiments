import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Weather-O-Fy Logo" className="logo-img" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/find-weather" className="nav-links">Find Weather</Link>
          </li>
          <li className="nav-item">
            <Link to="/display-submissions" className="nav-links">Display Submissions</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;