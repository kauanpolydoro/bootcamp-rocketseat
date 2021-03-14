const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next)
{

  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if (!user)
  {
    return response.status(404).json({ error: 'User not found' });
  }

  request.user = user;

  return next();

}

app.post('/users', (request, response) =>
{
  const { name, username } = request.body;

  const alreadyExistsUserAccount = users.some(user => user.username === username);

  if (alreadyExistsUserAccount)
  {
    return response.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: []
  };

  users.push(newUser);

  return response.status(201).json(newUser);

});

app.get('/todos', checksExistsUserAccount, (request, response) =>
{

  const { user } = request;

  return response.status(200).json(user.todos);

});

app.post('/todos', checksExistsUserAccount, (request, response) =>
{

  const { user } = request;
  const { title, deadline } = request.body;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline,
    created_at: new Date(deadline)
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);


});

app.put('/todos/:id', checksExistsUserAccount, (request, response) =>
{
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const todo = user.todos.find(todo => todo.id === id);

  if (!todo)
  {
    return response.status(404).json({ error: 'Todo not found' });
  }

  Object.assign(todo, { title, deadline });

  return response.status(200).json(todo);

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) =>
{
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find(todo => todo.id === id);

  if (!todo)
  {
    return response.status(404).json({ error: 'Todo not found' });
  }

  todo.done = true;

  return response.status(200).json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) =>
{
  const { id } = request.params;
  const { user } = request;

  const todoIndex = user.todos.findIndex(todo => todo.id = id);

  if (todoIndex < 0)
  {
    return response.status(404).json({ error: 'Todo not found' });
  }

  user.todos.splice(todoIndex, 1);

  return response.status(204).send();


});

module.exports = app;