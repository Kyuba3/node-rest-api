const express = require('express');
const uuid = require('uuid').v4;
const db = require('../db');

const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res, next) => {
  const id = req.params.id;
  const item = db.testimonials.find(item => item.id == id);
  if (item) {
    res.json(item);
  } else {
    next();
  }
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomItem = db.testimonials[randomIndex];

  res.json(randomItem);
});

router.route('/testimonials').post((req, res) => {
  const newAuthor = req.body.author;
  const newText = req.body.text;
  const newId = uuid();

  db.testimonials.push({ id: newId, author: newAuthor, text: newText});
  res.json({ message: 'data is added' })
});

router.route('/testimonials/:id').put((req, res, next) => {
  const id = req.params.id;
  const newAuthor = req.body.author;
  const newText = req.body.text;

  const itemIndex = db.testimonials.findIndex(item => item.id == id);
  if (itemIndex !== -1) {
    db.testimonials[itemIndex].author = newAuthor;
    db.testimonials[itemIndex].text = newText;
    res.json({ message: 'ok!' });
  } else {
    next();
  }
});

router.route('/testimonials/:id').delete((req, res, next) => {
  const id = req.params.id;
  const itemIndex = db.testimonials.findIndex(item => item.id == id);

  if(itemIndex !== -1) {
    db.testimonials.splice(itemIndex, 1);
    res.json({message: 'item deleted!'});
  } else {
    next();
  }
});

module.exports = router;