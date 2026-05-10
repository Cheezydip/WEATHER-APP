const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City query parameter is required' });
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3`
        );

        if (!response.ok) {
            throw new Error('Weather API response not ok');
        }

        const data = await response.json();
        return res.json(data);
    } catch (e) {
        console.error('Weather API error:', e.message);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});