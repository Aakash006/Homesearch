const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const homesRouter = require('./routes/homes');
const cors = require('cors');
const path = require('path');
require('dotenv/config');
const app = express();

const apiPort = process.env.PORT || 9000;

// Connect to DB
mongoose.connect(process.env.MONGODB_ATLAS || "mongodb://localhost/homesearch", {useNewUrlParser:true});
mongoose.connection.on('open', function () {
    console.log('Connected to db');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', homesRouter); // for all homes requests send request to homes router

if (process.env.NODE_ENV === "production") {

    // set static file with js and css
    app.use(express.static('client/build'));

    // set requests for html files
    app.get('*', (req, res) => {
        res.sendFile(path.join(path.resolve(path.dirname('')), 'client', 'build', 'index.html'));
    });
    
}



// Listen to server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));