const express = require("express");
require("dotenv").config(); // Load env vars before anything else
const app = express();
const cors = require("cors");
app.use(cors());  // This enables CORS for all routes

const DBConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const reviewRoute = require('./routes/reviewRoute');

app.use(express.json())
app.use('/api/reviews', reviewRoute);
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Node Server Started using nodemon'));

