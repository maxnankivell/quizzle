const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./src/app');

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log('connected to db'));

const server = app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
