const express = require('express');
const uuid = require('uuid').v4;
const db = require('../db');

const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res, next) => {
  const id = req.params.id;
  const item = db.concerts.find(item => item.id == id);
  if (item) {
    res.json(item);
  } else {
    next();
  }
});

router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  const randomItem = db.concerts[randomIndex];

  res.json(randomItem);
});

router.route('/concerts').post((req, res) => {
  const newAuthor = req.body.author;
  const newText = req.body.text;
  const newId = uuid();

  db.concerts.push({ id: newId, author: newAuthor, text: newText});
  res.json({ message: 'data is added' })
});

router.route('/concerts/:id').put((req, res, next) => {
  const id = req.params.id;
  const newAuthor = req.body.author;
  const newText = req.body.text;

  const itemIndex = db.concerts.findIndex(item => item.id == id);
  if (itemIndex !== -1) {
    db.concerts[itemIndex].author = newAuthor;
    db.concerts[itemIndex].text = newText;
    res.json({ message: 'ok!' });
  } else {
    next();
  }
});

router.route('/concerts/:id').delete((req, res, next) => {
  const id = req.params.id;
  const itemIndex = db.concerts.findIndex(item => item.id == id);

  if(itemIndex !== -1) {
    db.concerts.splice(itemIndex, 1);
    res.json({message: 'item deleted!'});
  } else {
    next();
  }
});

module.exports = router;