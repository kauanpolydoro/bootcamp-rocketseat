const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;
  const id = v4();

  customers.push({
    cpf,
    name, id,
    statement: []
  });

  return response.status(201).send();

});

app.listen(3333, () => {
  console.log('✔ Listen on port 3333');
});