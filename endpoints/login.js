const express = require('express');
const router = express.Router();
require('dotenv').config();

const FETCH_TOKEN_ENDPOINT = 'https://login.microsoftonline.com/2c4c412c-1cb6-4770-9bb4-87b4bfe440c1/oauth2/v2.0/token';
const TOKEN_ROUTE = '/token';

const msalConfig = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    grantType: 'password',
    scope: 'user.read offline_access',
}

async function getToken() {
    const params = new URLSearchParams({
        client_id: msalConfig.clientId,
        client_secret: msalConfig.clientSecret,
        grant_type: msalConfig.grantType,
        scope: msalConfig.scope,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    });
    
    try {
        const response = await fetch(FETCH_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });
        
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Failed to acquire access token:', error);
        throw error;
    }
}

router.post(TOKEN_ROUTE, async (_, res) => {
    try {
        const token = await getToken();
        res.json({ token });
    } catch (error) {
        if (error.status === 401) {
            res.status(401).json({ error: 'Authentication failed', status: error.status });
        } else {
            res.status(500).json({ error: error.message || 'Error scheduling meeting', status: error.status });
        }
    }
});

module.exports = router;
