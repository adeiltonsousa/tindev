const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://adeilton:iltinho25@tindev-kuneg.mongodb.net/tindevdb?retryWrites=true&w=majority', {
  useUnifiedTopology: true
}, (err, res) => {
  if (err) throw err;  
  console.log('Database online');
  });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
