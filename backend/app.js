const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const tanksRoutes = require('./routes/tanks');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://andy:x2GE4Ptnp2kXuuIp@cluster0-1sqh7.mongodb.net/tanks?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log(err + 'Connection failed!!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/tanks', tanksRoutes);
app.use('/api/user', userRoutes);

module.exports = app;

