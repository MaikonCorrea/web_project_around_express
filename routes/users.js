const router = require('express').Router();
const { listUsers, createUser } = require('../controllers/users')

router.get('/', async (req, res) => {
  const users = await listUsers()
  res.json(users)
 });

 router.get('/:id', async (req, res) => {
  try {
    const users = await listUsers();
    const user = users.find(u => u._id.toString() === req.params.id);
    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  const newUser = await createUser(body)
  res.status(201).json(newUser)
 });


module.exports = router;
