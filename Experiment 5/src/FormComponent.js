// src/FormComponent.js
import React, { useState } from 'react';
import './App.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registeredNumber: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    } else {
      // Check for common email domain misspellings
      const emailDomain = formData.email.split('@')[1];
      const commonMisspellings = {
        'gamil.com': 'gmail.com',
        'gmial.com': 'gmail.com',
        'gmal.com': 'gmail.com',
        'yahoo.cm': 'yahoo.com',
        'yaho.com': 'yahoo.com',
        'hotmal.com': 'hotmail.com',
        'hotmai.com': 'hotmail.com',
        'outlok.com': 'outlook.com',
        'outllok.com': 'outlook.com',
      };

      if (commonMisspellings[emailDomain]) {
        newErrors.email = `Did you mean ${commonMisspellings[emailDomain]}?`;
      }
    }

    // Registered Number validation
    if (!formData.registeredNumber.trim()) {
      newErrors.registeredNumber = 'Registered Number is required';
    } else if (!/^\d+$/.test(formData.registeredNumber)) {
      newErrors.registeredNumber = 'Registered Number must be numeric';
    } else if (formData.registeredNumber.length !== 10) {
      newErrors.registeredNumber = 'Registered Number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isDuplicateData = (data) => {
    // Retrieve existing data from localStorage
    const storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    return storedData.some(
      (entry) =>
        entry.email === data.email || entry.registeredNumber === data.registeredNumber
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isDuplicateData(formData)) {
        alert('Duplicate data found! This email or registered number already exists.');
      } else {
        // Store data in localStorage
        const storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        storedData.push(formData);
        localStorage.setItem('formSubmissions', JSON.stringify(storedData));

        // Show success alert
        alert('Form submitted successfully!');

        // Clear form
        setFormData({ name: '', email: '', registeredNumber: '' });
      }
    }
  };

  return (
    <div className="form-container">
      {/* Stylish Header */}
      <div className="form-header">
        <h1>User Registration Form</h1>
        <p>Please fill in the details below to register</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="registeredNumber">Registered Number:</label>
          <input
            type="text"
            id="registeredNumber"
            name="registeredNumber"
            value={formData.registeredNumber}
            onChange={handleChange}
          />
          {errors.registeredNumber && (
            <span className="error">{errors.registeredNumber}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;