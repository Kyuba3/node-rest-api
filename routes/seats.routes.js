const express = require('express');
const uuid = require('uuid').v4;
const db = require('../db');

const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res, next) => {
  const id = req.params.id;
  const item = db.seats.find(item => item.id == id);
  if (item) {
    res.json(item);
  } else {
    next();
  }
});

router.route('/seats/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.seats.length);
  const randomItem = db.seats[randomIndex];

  res.json(randomItem);
});

router.route('/seats').post((req, res) => {
  const newDay = req.body.day;
  const newSeat = req.body.seat;
  const newClient = req.body.client;
  const newEmail = req.body.email;
  const newId = uuid();

  db.seats.push({ id: newId, day: newDay, seat: newSeat, client: newClient, email: newEmail });
  res.json({ message: 'data is added' })
});

router.route('/seats/:id').put((req, res, next) => {
  const id = req.params.id;
  const newDay = req.body.day;
  const newSeat = req.body.seat;
  const newClient = req.body.client;
  const newEmail = req.body.email;

  const itemIndex = db.seats.findIndex(item => item.id == id);
  if (itemIndex !== -1) {
    db.seats[itemIndex].day = newDay;
    db.seats[itemIndex].seat = newSeat;
    db.seats[itemIndex].client = newClient;
    db.seats[itemIndex].email = newEmail;
    res.json({ message: 'ok!' });
  } else {
    next();
  }
});

router.route('/seats/:id').delete((req, res, next) => {
  const id = req.params.id;
  const itemIndex = db.seats.findIndex(item => item.id == id);

  if(itemIndex !== -1) {
    db.seats.splice(itemIndex, 1);
    res.json({message: 'item deleted!'});
  } else {
    next();
  }
});

module.exports = router;