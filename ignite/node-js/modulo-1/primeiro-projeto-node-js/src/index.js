const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(404).json({ error: 'Customer not found' });
  }

  request.customer = customer;

  return next();

}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' });
  }

  customers.push({
    cpf,
    name,
    id: v4(),
    statement: []
  });

  return response.status(201).send();

});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {

  const { customer } = request

  if (!customer.statement.length) {
    return response.status(204).send();
  }

  return response.status(200).json(customer.statement);

})

app.listen(3333, () => {
  console.log('✔ Listen on port 3333');
});