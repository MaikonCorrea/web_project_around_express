const express = require("express");
const mongoose = require('mongoose');
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}); // avaliar a necessidade de usar este segundo argumento

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use("/", (req, res, next) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
  next(error);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
