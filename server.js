const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const db = require('./db.js');

const app = express();

// midleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res, next) => {
  const id = req.params.id;
  const item = db.testimonials.find(item => item.id == id);
  if (item) {
    res.json(item);
  } else {
    next();
  }
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomItem = db.testimonials[randomIndex];

  res.json(randomItem);
});

app.post('/testimonials', (req, res) => {
  const newAuthor = req.body.author;
  const newText = req.body.text;
  const newId = uuid();

  db.testimonials.push({ id: newId, author: newAuthor, text: newText});
  res.json({ message: 'data is added' })
});

app.put('/testimonials/:id', (req, res, next) => {
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

app.delete('/testimonials/:id', (req, res, next) => {
  const id = req.params.id;
  const itemIndex = db.testimonials.findIndex(item => item.id == id);

  if(itemIndex !== -1) {
    db.testimonials.splice(itemIndex, 1);
    res.json({message: 'item deleted!'});
  } else {
    next();
  }
}); 

app.use((req, res) => {
  res.status(404).send('Not found');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});