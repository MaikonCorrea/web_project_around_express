const router = require('express').Router();
const { listUsers, createUser } = require('../controllers/users');
const CustomError = require('../errors/CustomError');

router.get('/', async (req, res) => {
  const users = await listUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  try {
    const users = await listUsers();
    const user = users.find((u) => u._id.toString() === req.params.id);
    if (!user) {
      throw new CustomError('Usuário não encontrado', 'NotFoundError', 404);
    }
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
      type: error.name,
      status: error.statusCode || 500,
    });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newUser = await createUser(body);
    res.status(200).json(newUser);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({
        message: error.message,
        type: error.name,
        Status: error.statusCode,
      });
  }
});

module.exports = router;
