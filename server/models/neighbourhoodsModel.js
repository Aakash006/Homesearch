const mongoose = require('mongoose');

// schema for Neighbourhood
const Neighbourhood = new mongoose.Schema(
    {
        name: { type: String, require: true }
    }
);

module.exports = mongoose.model('neighbourhoods', Neighbourhood);