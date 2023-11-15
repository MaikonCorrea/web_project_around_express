const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    require: true,
    validate: {
      vvalidator: function validateLinkURL(v) {
        return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: (props) => `${props.value} não é um link de imagem válido!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
