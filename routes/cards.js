const router = require('express').Router();

router.get('/', (req, res) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      res
        .status(500)
        .json({ message: 'Erro na leitura do arquivo de cartões' });
      return;
    }
    const cards = JSON.parse(data);
    res.status(200).json(cards);
  });
});

module.exports = router;
