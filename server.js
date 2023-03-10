const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://Kyuba3:${process.env.DB_PASS}@cluster0.lsrtv0c.mongodb.net/NewWaveDB?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/NewWaveDB';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(helmet());

app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).send('Not found');
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log('New client!' + socket.id);
});

mongoose.connect( dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected with database');
});

db.on('error', err => console.log('Error ' + err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

module.exports = server;