const Concert = require('../models/concerts.model');
var sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Concert.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = sanitize(req.body);
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.put = async (req, res) => {
  const {  performer, genre, price, day, image } = req.body;

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.status(200).json({dep});
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.delete = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.status(200).json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertByPerformer = async (req, res) => {
  try {
    const concert = await Concert.find({ performer: req.params.performer });
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert)
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertByGenre = async(req,res) => {
  try{
    const concert = await Concert.find({ genre: req.params.genre });
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertByPriceInRange = async(req, res) => {
  try{
    const concert = await Concert.find({ 
      price: { $gte: req.params.price_min, $lte: req.params.price_max }
    });
    if(concert.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getConcertByDay = async(req, res) => {
  try{
    const concert = await Concert.find({ day: req.params.day });
    if(concert.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch(err) {
    res.status(500).json({ message: err });
  }
}