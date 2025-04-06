const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

// Save weather submission
router.post('/', async (req, res) => {
    try {
        const { name, email, city, weatherData } = req.body;
        const newWeather = new Weather({ name, email, city, weatherData });
        await newWeather.save();
        res.status(201).json(newWeather);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all submissions
router.get('/', async (req, res) => {
    try {
        const submissions = await Weather.find().sort({ date: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;