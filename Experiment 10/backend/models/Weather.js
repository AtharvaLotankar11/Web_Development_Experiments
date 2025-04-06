const mongoose = require('mongoose');

// Define Weather Schema (modify fields as needed)
const weatherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    weatherData: {   // Store API response from OpenWeather
        temp: Number,
        humidity: Number,
        description: String,
        icon: String
    }
});

// Create Model
const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;