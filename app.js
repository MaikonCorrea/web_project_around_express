const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');

const app = express();
connectDatabase();

app.use(bodyParser.json());



app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/', (req, res, next) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
