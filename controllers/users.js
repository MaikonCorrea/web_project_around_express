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
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },
  updateUser: async (userId, updatedData) => {
    try {
      if (!userId) {
        throw new CustomError('ID de usuário inválido!', 'InvalidUserIdError', 400);
      }

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        throw new CustomError('Usuário não encontrado!', 'UserNotFoundError', 404);
      }

      if (updatedData.avatar) {
        const urlRegex = /^https?:\/\/[^\s]+$/;
        const isAvatarValid = updatedData.avatar.match(urlRegex);
        if (!isAvatarValid) {
          throw new CustomError('Link do Avatar é inválido!', 'InvalidLinkError', 400);
        }
      }
      Object.assign(existingUser, updatedData);
      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },
};
