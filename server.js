const express = require('express');
const cors = require('cors');

// Express configuration
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Import routes
const scheduleMeetingRoutes = require('./endpoints/scheduleMeeting');
const fetchTokenRoutes = require('./endpoints/login');
const fetchCalendarRoutes = require('./endpoints/fetchCalendar');

// Use routes
app.use(scheduleMeetingRoutes);
app.use(fetchTokenRoutes);
app.use(fetchCalendarRoutes);

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
