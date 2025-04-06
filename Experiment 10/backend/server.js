const express = require('express');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weather');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors()); // Place this before your routes

// Database Connection (like Song.js)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weather-o-fy')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/weather', weatherRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});