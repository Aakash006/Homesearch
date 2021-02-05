const Home = require('../models/homesModel');
const Neighbourhood = require('../models/neighbourhoodsModel');

getHomes = async (req, res) => {
    const homes = await Home.find({}, (err, response) => {
        if (err) {
            return res.status(400).json({message: 'No properties found'});
        } else {
            return res.status(201).json(response);
        }
    }).catch((err) => {
        return res.status(400).json({message: err});
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
            return res.json({success: true, message: ""});
        }).catch((err) => {
            return res.json({success: false, message: err});
        });
    }
}

updateHome = async (req, res) => {
    const update = await Home.updateOne(
        { _id: req.params.id },
        { $set: { 
            streetAd: req.body.streetAd,
            city: req.body.city,
            neighbourhood: req.body.neighbourhood,
            postalCode: req.body.postalCode,
            province: req.body.province,
            country: req.body.country,
            listedPrice: req.body.listedPrice,
            soldPrice: req.body.soldPrice }},
        (err, response) => {
            if (err) {
                return res.status(404).json({success: false, message: err});
            } else {
                return res.status(200).json({success: true, message: ""});
            }
        }).catch((err) => {
            return res.status(404).json({success: false, message: err});
    });
}

findHomeById = async (req, res) => {
    const home = await Home.findById({_id: req.params.id}, (err, response) => {
        if (err) {
            return res.status(404).json({message: 'No property found'});
        } else {
            return res.status(200).json(response);
        }
    }).catch((err) => {
        return res.status(400).json({success: false, message: err});
    });
}

deleteHome = async (req, res) => {
    const home = await Home.findById({ _id: req.params.id });
    const deleted = await Home.deleteOne({ _id: req.params.id }, (err, response) => {
        if (err) {
            return res.status(404).json({success: false});
        } else {
            checkNeighbourhoods(home.neighbourhood);
            return res.status(200).json({success: true});
        }
    }).catch((err) => {
        return res.status(400).json({message: err});
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
                console.log('Neighbourhood ' + neighbourhood + ' added');
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
                let finalHomes = [];
                let sum = 0;
                let housesSold = 0;
                homes.forEach(home => {
                    if (home.soldPrice > 0) {
                        finalHomes.push(home);
                        sum = sum + home.soldPrice;
                        housesSold = housesSold + 1;
                    }
                });
                let average = sum/housesSold;
                average = Math.round(average*100)/100;
                if (average === 0) {
                    average = 0
                }
                res.json({homes: finalHomes, average: average});
            } else {
                res.json({average: 0});
            }
        }
    }).catch((err) => {
        console.log('Problem calculating average ' + err);
    });
}

checkNeighbourhoods = async (neighbourhood) => {
    const houses = Home.find({neighbourhood: neighbourhood}, (err, response) => {
        if (err) {
            res.json({message: err});
        } else {
            if (response.length != 0) {
                console.log('Houses still exist in ' + neighbourhood);
            } else {
                const deleted = Neighbourhood.findOneAndDelete({ name: neighbourhood }, (err, response) => {
                    if (err) {
                        console.log('Error deleting neighbourhood')
                    } else {
                        console.log('Neighbourhood ' + neighbourhood + ' deleted');
                    }
                }).catch((err) => {
                    return res.json({message: err});
                });
            }
        }
    }).catch((err) => {
        console.log('Problem checking neighbourhoods ' + err);
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