const mongoose = require('mongoose');

const Home = new mongoose.Schema(
    {
        streetAd: { type: String, require: true },
        city: { type: String, require: true },
        neighbourhood: { type: String, require: true },
        postalCode: { type: String, require: true },
        province: { type: String, require: true },
        country: { type: String, require: true },
        listed: { type: Number, require: true },
        sold: { type: Number, require: true },
    }
);

module.exports = mongoose.model('homes', Home);