const Card = require('../models/card');

module.exports = {
  listCards: async () => {
    const cards = await Card.find();
    return cards;
  },
  createCard: async (body, req) => {
    const { name, link } = body;
    const owner = req.user._id;
    const newCard = new Card({ name, link, owner });
    const saveCard = await newCard.save();
    return saveCard;
  },
  deleteCard: async (id) => {
    const cards = await Card.deleteOne({ _id: id });
    return cards;
  },
};
