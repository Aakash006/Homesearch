const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const homesRouter = require('./routes/homes.js');
require('dotenv/config');
const app = express();

const apiPort = 9000;


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', function () {
    console.log('Connected to db');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/homes', homesRouter); // for all homes requests send request to homes router

// Listen to server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));