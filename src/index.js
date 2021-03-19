const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
	const { username } = request.header;

	const user = users.find((user) => user.name === username);

	if (!user) {
		return response.status(400).json({ erro: 'User not found' });
	}
	request.user;

	return next();
}

app.post('/users', (request, response) => {
	const { name, username } = request.body;

	const existUser = users.find(user.username === username);

	if (existUser) {
		response.status(400).json({ erro: 'Username already exist' });
	}
	const user = {
		id: uuidv4(),
		name,
		username,
		todos: []
	};

	users.push(user);
	return response.status(200).json(user);
});

app.get('/users', checksExistsUserAccount, (request, response) => {
	const { user } = request;

	return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
	const { user } = request;

	const { title, deadline } = request.body;

	const todo = {
		id: uuidv4(),
		title,
		done: false,
		deadline: new Date(deadline),
		created_at: new Date()
	};

	users.todos.push(todo);

	return user.json(todos);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { title, deadline } = request.body;
	const { id } = request.params;

	const todo = user.todos.find((todo) => todo.id === id);

	if (!todo) {
		return response.status(400).json({ erro: 'Erro todo not found!' });
	}

	todo.title = title;
	todo.deadline = new Date(deadline);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { id } = request.params;

	const todo = user.todos.find((todo) => todo.id === id);

	if (!todo) {
		return response.status(400).json({ erro: 'todo not found' });
	}

	todo.done = true;

	return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
	const { user } = request;
	const { id } = request.params;

	const todoIndex = user.todo.findIndex((todo) => todo.id === id);

	if (todoIndex === -1) {
		return response.status(400).json({ erro: 'todo not found' });
	}

	user.todo.splice(todoIndex, 1);

	return response.status(204).send();
});

module.exports = app;
