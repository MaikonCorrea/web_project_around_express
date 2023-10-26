const express = require('express');

const {PORT = 3000} = process.env;

const app = express();

app.get('/cards', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`App está funcionando na porta ${PORT}`)
});
