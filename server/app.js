const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const homesRouter = require('./routes/homes.js');
const cors = require('cors');
require('dotenv/config');
const app = express();

const apiPort = 9000;

// Connect to DB
mongoose.connect("mongodb://localhost/homesearch", {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', function () {
    console.log('Connected to db');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', homesRouter); // for all homes requests send request to homes router

if (process.env.NODE_ENV === "production") {
    
    // Set static folder where javascriptand css files will be served from
    app.use(express.static("client/build"));
}

// Listen to server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));