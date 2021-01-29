const mongoose = require('mongoose');

const Home = new mongoose.Schema(
    {
        streetAd: { type: String, require: true },
        city: { type: String, require: true },
        neighbourhood: { type: String, require: true },
        postalCode: { type: String, require: true },
        province: { type: String, require: true },
        country: { type: String, require: true },
        listedPrice: { type: Number, require: true },
        soldPrice: { type: Number, require: true },
    }
);

module.exports = mongoose.model('homes', Home);