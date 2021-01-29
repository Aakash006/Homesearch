const Home = require('../models/homesModel');

getHomes = async (req, res) => {
    try {
        const homes = await Home.find();
        res.json(homes);
    } catch(err) {
        res.send('Error ' + err);
    }
}
createHome = (req, res) => {
    console.log(req.body);
    const toCreate = new Home({
        streetAd: req.body.streetAd,
        city: req.body.city,
        neighbourhood: req.body.neighbourhood, 
        postalCode: req.body.postalCode,
        province: req.body.province,
        country: req.body.country
    });

    try {
        const homeObj = toCreate.save();
        res.json(homeObj);
    } catch(err) {
        res.send('Error ' + err);
    }
}

findHomeById = async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        res.json(home);
    } catch(err) {
        res.send('Error ' + err);
    }
}

updateHome = async (req, res) => {

}

deleteHome = async (req, res) => {
    try {
        const deleted = await Home.remove(req.params.id);
        res.send(deleted);
    } catch(err) {
        res.send('Error ' + err);
    }
}

getNeighbourhoods = async (req, res) => {

}

module.exports = {
    getHomes,
    createHome,
    findHomeById,
    updateHome,
    deleteHome,
    getNeighbourhoods
}