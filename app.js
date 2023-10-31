const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use("/", (req, res, next) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
  next(error);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
