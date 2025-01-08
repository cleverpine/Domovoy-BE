const express = require('express');

const router = express.Router();

const fetchWithHeaders = require('../utils/fetchWrapper');

const SCHEDULE_MEETING_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/events';
const SCHEDULE_MEETING_ROUTE = '/schedule-meeting';

router.post(SCHEDULE_MEETING_ROUTE, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { body } = req;

    if (!body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    const responseData = await fetchWithHeaders(SCHEDULE_MEETING_ENDPOINT, token, body, 'POST');
    return res.json(responseData);
  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({ error: 'Authentication failed', status: error.status });
    }
    return res.status(500).json({ error: error.message || 'Error scheduling meeting', status: error.status });
  }
});

module.exports = router;
