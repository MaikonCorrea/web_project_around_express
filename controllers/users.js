const User = require('../models/user');

module.exports = {
  createUser: async (body) => {
    const { name, about, avatar } = body
    console.log({ name, about, avatar });
    return [];
  },
  listUsers: async () => {
    const users = await User.find();
    return users;
  }
};