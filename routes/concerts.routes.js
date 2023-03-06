const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.put);

router.delete('/concerts/:id', ConcertController.delete);

router.get('/concerts/performer/:performer', ConcertController.getConcertByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getConcertByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getConcertByPriceInRange);

router.get('/concerts/price/day/:day', ConcertController.getConcertByDay);

module.exports = router;