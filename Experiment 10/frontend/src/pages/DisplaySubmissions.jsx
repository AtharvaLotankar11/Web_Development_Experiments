import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Submissions from '../components/Submissions';

const DisplaySubmissions = () => {
  return (
    <div className="display-submissions-page">
      <Navbar />
      <Submissions />
      <Footer />
    </div>
  );
};

export default DisplaySubmissions;