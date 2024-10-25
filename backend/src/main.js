const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Set env
require('dotenv').config(); 

// Set whitelist
const whitelist = [
    process.env.FRONT_URL,
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) { // Allow requests without origin (e.g., Postman)
            callback(null, true);
        } else {
            console.log(`CORS error: Origin ${origin} not allowed.`); 
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/:type', async (req, res) => {
    const apiType = req.params.type; 
    const id = req.query.id; 

    let apiUrl = ''; 
    let headers = {};

    try {
        console.log(`Fetching data for type: ${apiType}, ID: ${id}`); 

        if (apiType == 'satellites') {
            apiUrl = `${process.env.DB_URL}/api/satellites/?format=json&norad_cat_id=${id}`; 
            headers = { 
                'accept': "application/json",
                'Authorization': `${process.env.API_KEY}`,
                'Cookie': `sessionid=${process.env.API_KEY}` 
            };
        } else {
            apiUrl = `${process.env.API_URL}/api/${apiType}`;
            if(apiType == 'observations') {
                apiUrl = `${apiUrl}/?format=json&ground_station=${id}`;
            } else {
                apiUrl = `${apiUrl}/?format=json&id=${id}`;
            }
        }

        console.log(`Fetching from URL: ${apiUrl}`);

        const response = await axios.get(apiUrl, { headers });
        const data = response.data;

        console.log(`Data fetched successfully:`, data); // Log the fetched data (consider logging a portion if it's too large)
        res.json(data);

    } catch (error) {
        console.error(`Error fetching data: ${error.message}`); 
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(500).json({ error: 'Failed to fetch data from the API'});   
    }
});

app.get('/satellite/:type', async (req, res) => {
    try {
        const id = req.query.id;
        const url = `${process.env.DB_URL}/satellite/${id}`;
        console.log(`Fetching HTML from: ${url}`);

        const response = await fetch(url);
        const html = await response.text();

        const $ = cheerio.load(html);
        const descriptionText = $('.card.card-info>.card-body>p').text();
        
        console.log(`Extracted description: ${descriptionText}`);
        res.json({ "Description": descriptionText });

    } catch (error) {
        console.error(`Error fetching data: ${error.message}`); 
        res.status(500).json({ error: 'Failed to fetch HTML text'});   
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        console.error(`CORS error: ${err.message}`); 
        res.status(403).json({ error: 'CORS error: Access denied.' });
    } else {
        next(err);
    }
});

const port = process.env.PORT || 1000; 

app.listen(port, () => {
    console.log(`Proxy server listening at port: ${port}`);
});
