const router = require('express').Router;
const fs = require('fs').promises;
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(file);
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'erro na leitura de arquivos do usuário' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(file);
    const users = JSON.parse(data);
    const userId = req.params.id;
    const user = users.find(() => user._id === userId);

    if (!user) {
      res.status(404).json({ message: 'ID do usuário não encontrado' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao ler usuário' });
  }
});

/* router.post('/users', async (req, res) => {
  try {
    const data = await fs.readFile(file);
    const users = JSON.parse(data);

    const newUser = req.body; // Supondo que o corpo da requisição contenha as informações do novo usuário
    users.push(newUser);

    await fs.writeFile(file, JSON.stringify(users, null, 2));

    res.status(201).json(newUser); // Retorna o novo usuário criado
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar novo usuário" });
  }
}); */

/* router.post('/users', async (req, res) => {
  try {
    const data = await fs.readFile(file);
    const users = JSON.parse(data);

    const { name, about, avatar } = req.body;

    const newUser = {
      _id: generateUniqueId(), // Você pode criar uma função para gerar IDs únicos
      name,
      about,
      avatar
    };

    users.push(newUser);

    await fs.writeFile(file, JSON.stringify(users, null, 2));

    res.status(201).json(newUser); // Retorna o novo usuário criado
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar novo usuário" });
  }
}); */
