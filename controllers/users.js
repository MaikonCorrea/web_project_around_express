const User = require('../models/user');
const CustomError = require('../errors/CustomError');

module.exports = {
  listUsers: async () => {
    const users = await User.find();
    return users;
  },
  createUser: async (body) => {
    const { name, about, avatar } = body;
    const urlRegex = /^https?:\/\/[^\s]+$/;
    const isAvatarValid = avatar.match(urlRegex);
    if (!isAvatarValid) {
      throw new CustomError(
        'link do Avatar é inválido!',
        'InvalidLinkError',
        400,
      );
    }
    const newUser = new User({ name, about, avatar });
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0];
        const message = error.errors[field].message;
        throw new CustomError(message, 'ValidationError', 400);
      }
    }
  },
};
