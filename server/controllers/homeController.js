const Home = require('../models/homesModel');
const Neighbourhood = require('../models/neighbourhoodsModel');

getHomes = async (req, res) => {
    const homes = await Home.find({}, (err, response) => {
        if (err) {
            return res.json({message: err});
        }

        if (response.length != 0) {
            return res.json(response);
        } else {
            return res.json({message: 'No properties found'});
        }
    }).catch((err) => {
        return res.json({message: err});
    })

    // try {
    //     const homes = await Home.find();
    //     res.json(homes);
    // } catch(err) {
    //     res.send('Error ' + err);
    // }
}
createHome = (req, res) => {
    console.log(res.body);
    // if (!res.body) {
    //     return res.status(400).json({
    //         message: 'You must provide a property',
    //     });
    // } else {
    //     const toCreate = new Home({
    //         streetAd: req.body.streetAd,
    //         city: req.body.city,
    //         neighbourhood: req.body.neighbourhood, 
    //         postalCode: req.body.postalCode,
    //         province: req.body.province,
    //         country: req.body.country,
    //         listedPrice: req.body.listedPrice,
    //         soldPrice: req.body.soldPrice
    //     });

    //     const save = await toCreate.save().then(() => {
    //         return res.json();
    //     }).catch((err) => {
    //         return res.json({message: err});
    //     });
    // }
}

findHomeById = async (req, res) => {
    const home = await Home.findById({_id: req.params.id}, (err, response) => {
        if (err) {
            return res.json({message: err});
        }
        if (response.length != 0) {
            return res.json(response);
        } else {
            return res.json({message: 'No property found'});
        }
    }).catch((err) => {
        return res.json({message: err});
    });

    // try {
    //     const home = await Home.findById(req.params.id);
    //     console.log(home);
    //     res.json(home);
    // } catch(err) {
    //     res.send('Error ' + err);
    // }
}

updateHome = async (req, res) => {
    const update = await Home.updateOne(
        { _id: req.params.id },
        { $set: { soldPrice:req.body.soldPrice }},
        (err, response) => {
            if (err) {
                return res.json({message: err});
            } else {
                return res.json(response);
            }
        }).catch((err) => {
            return res.json({message: err});
        });
}

deleteHome = async (req, res) => {
    const deleted = await Home.remove({ _id: req.params.id }, (err, response) => {
        if (err) {
            return res.json({message: false});
        } else if (!response) {
            return res.json({message: true});
        } else {
            return res.json({message: false});
        }
    }).catch((err) => {
        return res.json({message: err});
    });

    // try {
    //     const deleted = await Home.remove(req.params.id);
    //     res.send(deleted);
    // } catch(err) {
    //     res.send('Error ' + err);
    // }
}

getNeighbourhoods = async (req, res) => {

}

addNeighbourhood = (neighbourhood) => {
    const toCreate = new Neighbourhood({name: neighbourhood});
    toCreate.save().then(() => {
        console.log('Neighbourhood added');
    }).catch(err => {
        console.log('Error ' + err);
    })
}

module.exports = {
    getHomes,
    createHome,
    findHomeById,
    updateHome,
    deleteHome,
    getNeighbourhoods
}