const Card = require('../models/card');
const CustomError = require('../errors/CustomError');

module.exports = {
  listCards: async () => {
    const cards = await Card.find();
    return cards;
  },

  createCard: async (body, req) => {
    const { name, link } = body;
    const linkRegex = /^https?:\/\/[^\s]+$/;
    const isLinkValid = link.match(linkRegex);
    if (!isLinkValid) {
      throw new CustomError('Link de imagem inválido!', 'InvalidLinkError', 400);
    }
    const owner = req.user._id;
    const newCard = new Card({
      name,
      link,
      owner,
      createdAt: new Date(),
    });
    try {
      const saveCard = await newCard.save();
      return saveCard;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field].message;
        throw new CustomError(message, 'ValidationError', 400);
      } else {
        throw error;
      }
    }
  },

  deleteCard: async (id) => {
    const deletedCard = await Card.findByIdAndDelete(id);
    return deletedCard;
  },
};
