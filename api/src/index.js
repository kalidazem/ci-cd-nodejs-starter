const mongoose = require('mongoose');
const app = require('./app');

let server;

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const dbName = process.env.MONGODB_DATABASE;

const mongoUrl = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected');
    server = app.listen(process.env.PORT, () => {
      console.log(`nodejs app running on port ${process.env.PORT}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
