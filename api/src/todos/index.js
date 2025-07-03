const express = require('express');
const Todo = require('./model');

const router = express.Router();

// Create a todo
router.post('/', async (req, res, next) => {
  try {
    const { description, completed } = req.body;
    const todo = await Todo.create({ description: `${description} new one`, completed });
    return res.status(201).json({
      description: todo.description,
      completed: todo.completed,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get a single todo by ID
router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({
      description: todo.description,
      completed: todo.completed,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update a todo
router.put('/:id', async (req, res, next) => {
  try {
    const { description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { description, completed }, { new: true, runValidators: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({
      description: todo.description,
      completed: todo.completed,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get all todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(
      todos.map((todo) => ({
        id: todo._id,
        description: todo.description,
        completed: todo.completed,
      })),
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// (Optional) Delete a todo
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports.todosRouter = router;
