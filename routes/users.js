const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  const file = path.join(__dirname, "../data/users.json");
  fs.readFile(file, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Erro na leitura do arquivo de usuários" });
      return;
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

router.get("/:id", (req, res) => {
  const file = path.join(__dirname, "../data/users.json");
  fs.readFile(file, (err, data) => {
    if (err) {
      res.status(500).json({ "message": "Erro ao ler Usuário" });
      return;
    }

    const users = JSON.parse(data);
    const userId = req.params.id;

    const user = users.find((user) => user._id === userId);

    if (!user) {
      res.status(404).json({ "message": "ID do usuário não encontrado" });
      return;
    }

    res.status(200).json(user);
  });
});

module.exports = router;
