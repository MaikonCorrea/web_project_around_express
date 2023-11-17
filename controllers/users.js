const User = require('../models/user');

module.exports = {
  listUsers: async () => {
    const users = await User.find();
    return users;
  },
  createUser: async (body) => {
    const { name, about, avatar } = body;
    const newUser = new User({ name, about, avatar });
    const savedUser = await newUser.save();
    return savedUser;
  },
};
