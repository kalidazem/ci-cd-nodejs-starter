const express = require('express');

const app = express();
const { todosRouter } = require('./todos');

app.use(express.json());
app.use('/todos', todosRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
module.exports = app;
//
