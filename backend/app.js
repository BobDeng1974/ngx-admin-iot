const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

// TODO: 引用Route
const userRoutes = require('./routes/user');
const deviceRoutes = require('./routes/device');

const app = express();

// TODO: 連線mongodb
mongoose.connect('mongodb://localhost:10000/ngx-admin-iot')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed', err);
  });

// TODO: 設定bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

// TODO: 設定CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

// TODO: 註冊Route
app.use('/api/device', deviceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
