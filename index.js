require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// DB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', function (req, res) {
  res.send('Hello World');
});

var server = app.listen(5000, function () {
  console.log("Server running on port 5000");
})