const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const db = require('./db');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// midleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);
 

app.use((req, res) => {
  res.status(404).send('Not found');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});