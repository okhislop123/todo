const express = require('express');

const todoRoute = express.Router();
const { getTodo, createTodo, updateTodo, deleteTodo } = require('../controller/todo.controller');
const { checkRequireId, checkRequireName, checkExitsName } = require('../middleware/validation');
const Doto = require('../models/Todolist');

todoRoute.get('/', getTodo);
todoRoute.post('/', checkRequireName, checkExitsName(Doto), createTodo);
todoRoute.put('/:id', checkRequireName, checkRequireId(Doto), checkExitsName(Doto), updateTodo);
todoRoute.delete('/:id', checkRequireId(Doto), deleteTodo);

module.exports = {
  todoRoute,
};
