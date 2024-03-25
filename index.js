const express = require('express');
const axios = require('axios');
const { logger } = require('./logger'); 
const { GITHUB_API_TOKEN } = require('./settings');

const app = express();
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
    logger(`Received ${req.method} request at ${req.path}`);
    next();
});

// POST endpoint
app.post('/fetch-settings', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/repos/username/repo/contents/github_settings.json', {
            headers: { 'Authorization': `token ${GITHUB_API_TOKEN}` }
        });
        const settings = JSON.parse(Buffer.from(response.data.content, 'base64').toString('utf8'));

        const filteredSettings = { operatingStatus: settings.ecomStore.operatingStatus };

        logger('Sending filtered settings');
        res.json(filteredSettings);
    } catch (error) {
        logger('Error fetching settings: ' + error.message);
        res.status(500).send('Error fetching settings');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
