const mongoose = require('mongoose');

const Neighbourhood = new mongoose.Schema(
    {
        name: { type: String, require: true }
    }
);

module.exports = mongoose.model('neighbourhoods', Neighbourhood);