const Doto = require('../models/Todolist');

const getTodo = async (req, res) => {
  try {
    const todoList = await Doto.find();
    res.status(200).send({
      message: 'success',
      data: todoList,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};
const createTodo = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    const newTodo = new Doto(data);
    await newTodo.save();
    res.status(201).send({
      message: 'Create Success',
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Doto.findByIdAndUpdate(id, {
      $set: {
        name,
      },
    });
    res.status(200).send({
      message: 'update success',
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Doto.findByIdAndDelete(id);
  res.status(200).send({
    message: 'Delete success',
  });
};

module.exports = {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
