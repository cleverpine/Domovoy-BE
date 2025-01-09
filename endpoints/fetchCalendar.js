const express = require('express');

const router = express.Router();
const fm = require('date-fns');
const fetchWithHeaders = require('../utils/fetchWrapper');

const FETCH_CALENDAR_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/calendar/getSchedule';
const FETCH_CALENDAR_ROOMS_ROUTE = '/fetch-calendar/rooms';

const DATE_PATTERN = 'yyyy-MM-dd\'T\'HH:mm:ssXXX';
const AVAILABILITY_VIEW_INTERVAL = 30;
const TIMEZONE = 'E. Europe Standard Time';
const ROOMS = [
  'room401@cleverpine.com',
  'room402@cleverpine.com',
  'room403@cleverpine.com',
  'room405@cleverpine.com',
  'room406@cleverpine.com',
  'room407@cleverpine.com',
  'room408@cleverpine.com',
  // TODO remove when testing is done
  'moni404@cleverpine.com',
];

const fetchCalendarRequest = async (token) => {
  const now = new Date();
  const daysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const formattedDateNow = fm.format(now, DATE_PATTERN);
  const formattedDaysFromNow = fm.format(daysFromNow, DATE_PATTERN);

  const body = {
    schedules: ROOMS,
    startTime: { dateTime: formattedDateNow, timezone: TIMEZONE },
    endTime: { dateTime: formattedDaysFromNow, timezone: TIMEZONE },
    availabilityViewInterval: AVAILABILITY_VIEW_INTERVAL,
  };

  return fetchWithHeaders(FETCH_CALENDAR_ENDPOINT, token, body, 'POST');
};

router.post(FETCH_CALENDAR_ROOMS_ROUTE, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const calendarData = await fetchCalendarRequest(token);
    res.json(calendarData);
  } catch (error) {
    if (error.status === 401) {
      res.status(401).json({ error: 'Authentication failed', status: error.status });
    } else {
      res.status(500).json({ error: error.message || 'Error scheduling meeting', status: error.status });
    }
  }
});

module.exports = router;
