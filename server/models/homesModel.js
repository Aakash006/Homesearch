const mongoose = require('mongoose');

// schema for Home
const Home = new mongoose.Schema(
    {
        email: { type: String, },
        streetAd: { type: String, require: true },
        city: { type: String},
        neighbourhood: { type: String},
        postalCode: { type: String},
        province: { type: String},
        country: { type: String, },
        listedPrice: { type: Number, require: true },
        soldPrice: { type: Number},
        mls: { type: String},
    }
);

module.exports = mongoose.model('homes', Home);