const router = require('express').Router();
const { listCards, createCard } = require('../controllers/cards');

router.get('/', async (req, res) => {
  const cards = await listCards();
  res.json(cards);
});

router.post('/', async (req, res) => {
  const { body } = req;
  const newCard = await createCard(body, req);
  res.status(201).json(newCard);
});

module.exports = router;
