// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
