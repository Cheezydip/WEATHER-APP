const express = require('express');
const fetch = require('node-fetch');
const cors=require('cors');
require('dotenv').config();

const app=express();
const PORT=5000;
app.get('/api/weather',(req,res)=>{
    const city=req.query.city;
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3`
        );
        if(!response.ok) {
            throw new Error('Weather API response not ok');
            return res.status(500).json({ error: 'Failed to fetch weather data' });
        }
        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.error("Weather API error:", e);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }});