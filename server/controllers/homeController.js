const Home = require('../models/homesModel');
const Neighbourhood = require('../models/neighbourhoodsModel');

getHomes = async (req, res) => {
    const homes = await Home.find({}, (err, response) => {
        if (err) {
            return res.json({message: 'No properties found'});
        } else {
            return res.json(response);
        }
    }).catch((err) => {
        return res.json({message: err});
    });
}
createHome = async (req, res) => {
    if (!req.body) {
        return res.json({ message: 'You must provide a property' });
    } else {
        const toCreate = new Home({
            streetAd: req.body.streetAd,
            city: req.body.city,
            neighbourhood: req.body.neighbourhood, 
            postalCode: req.body.postalCode,
            province: req.body.province,
            country: req.body.country,
            listedPrice: req.body.listedPrice,
            soldPrice: req.body.soldPrice
        });

        addNeighbourhood(toCreate.neighbourhood);

        const save = await toCreate.save().then(() => {
            return res.json({success: true});
        }).catch((err) => {
            return res.json({success: err});
        });
    }
}

findHomeById = async (req, res) => {
    const home = await Home.findById({_id: req.params.id}, (err, response) => {
        if (err) {
            return res.json({message: 'No property found'});
        } else {
            return res.json(response);
        }
    }).catch((err) => {
        return res.json({success: err});
    });
}

updateHome = async (req, res) => {
    const update = await Home.updateOne(
        { _id: req.params.id },
        { $set: { soldPrice:req.body.soldPrice }},
        (err, response) => {
            if (err) {
                return res.json({success: false});
            } else {
                return res.json({success: true});
            }
        }).catch((err) => {
            return res.json({message: err});
    });
}

deleteHome = async (req, res) => {
    const deleted = await Home.deleteOne({ _id: req.params.id }, (err, respose) => {
        if (err) {
            return res.json({success: false});
        } else {
            return res.json({success: true});
        }
    }).catch((err) => {
        return res.json({message: err});
    });
}

getNeighbourhoods = async (req, res) => {
    const neighbourhoods = await Neighbourhood.find({}, (err, response) => {
        if (err) {
            return res.json({message: err});
        } else {
            return res.json(response);
        }
    }).catch((err) => {
        return res.json({message: err});
    });
}

addNeighbourhood = (neighbourhood) => {
    const neighbourhoods = Neighbourhood.find({name: neighbourhood}, (err, response) => {
        if (response.length == 0) {
            const toCreate = new Neighbourhood({name: neighbourhood});
            toCreate.save().then(() => {
                console.log(neighbourhood + ' added');
            }).catch(err => {
                console.log('Error ' + err);
            });
        }
    }).catch((err) => {
        console.log('Neighbourhood could not be added ' + err);
    });
}

getAverage = async (req, res) => {
    const houses = Home.find({neighbourhood: req.params.neighbourhood}, (err, response) => {
        if (err) {
            res.json({message: err});
        } else {
            if (response.length != 0) {
                const homes = JSON.parse(JSON.stringify(response));
                let sum = 0;
                let housesSold = 0;
                homes.forEach(home => {
                    if (home.soldPrice != 0) {
                        sum = sum + home.soldPrice;
                        housesSold = housesSold + 1;
                    }
                });
                const average = sum/housesSold;
                res.json({average: average});
            } else {
                res.json({average: 0});
            }
        }
    }).catch((err) => {
        console.log('Problem calculating average ' + err);
    });
}

module.exports = {
    getHomes,
    createHome,
    findHomeById,
    updateHome,
    deleteHome,
    getNeighbourhoods,
    getAverage
}