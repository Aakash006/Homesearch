const Home = require('../models/homesModel');
const Neighbourhood = require('../models/neighbourhoodsModel');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_KEY)

// This method retrieves all the properties that are in a users watchlist from the database
getHomes = async (req, res) => {
    console.log("test if api caled");
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

// This method add a property that the user would like to add to their watchlist into the database
createHome = async (req, res) => {
    if (!req.body) {
        return res.json({ message: 'You must provide a property' });
    } else {
        const toCreate = new Home({
            email: req.body.email,
            streetAd: req.body.streetAd,
            city: req.body.city,
            neighbourhood: req.body.neighbourhood, 
            postalCode: req.body.postalCode,
            province: req.body.province,
            country: req.body.country,
            listedPrice: req.body.listedPrice,
            soldPrice: req.body.soldPrice,
            mls: req.body.mls
        });

        if (toCreate.neighbourhood !== '') {
            addNeighbourhood(toCreate.neighbourhood);
        }

        const property = Home.find({streetAd: toCreate.streetAd}, (err, response) => {
            if (response.length == 0) {
                const save = toCreate.save().then(() => {
                    if (toCreate.email !== null) {
                        const message = {
                            to: toCreate.email,
                            from: {
                                name: 'HomeSearch',
                                email :'aakashpatel141@gmail.com'
                            },
                            subject: 'HomeSearch: ' + req.body.streetAd + ' has been added to your watchlist',
                            text: req.body.streetAd + ' has been added to your watchlist',
                            html: '<h1>' + req.body.streetAd + ' has been added to your watchlist</h1>',
                        };
                
                        sgMail.send(message)
                        .then(response => console.log('Email has been sent'))
                        .catch((error) => console.error(error.message));
                    }
                    
                    return res.json({success: true, message: ""});
                }).catch((err) => {
                    return res.json({success: false, message: err.message});
                });
            } else {
                return res.json({success: false, message: "Property already exists"});
            }
        }).catch((err) => {
            return res.json({success: false, message: "Property could not be added"});
        });
    }
}


// This method updates an existing property in the database that has been edited by a user
updateHome = async (req, res) => {
    
    const update = await Home.updateOne(
        { _id: req.params.id },
        { $set: {
            email: req.body.email,
            streetAd: req.body.streetAd,
            city: req.body.city,
            neighbourhood: req.body.neighbourhood,
            postalCode: req.body.postalCode,
            province: req.body.province,
            country: req.body.country,
            listedPrice: req.body.listedPrice,
            soldPrice: req.body.soldPrice,
            mls: req.body.mls }},
        (err, response) => {
            if (err) {
                return res.status(404).json({success: false, message: err});
            } else {
                if (req.body.neighbourhood !== '') {
                    addNeighbourhood(req.body.neighbourhood);
                }

                if (req.body.email !== null) {
                    const message = {
                        to: req.body.email,
                        from: {
                            name: 'HomeSearch',
                            email :'aakashpatel141@gmail.com'
                        },
                        subject: 'HomeSearch: ' + req.body.streetAd + ' has been updated in your watchlist',
                        text: req.body.streetAd + ' has been updated in your watchlist',
                        html: '<h1>' + req.body.streetAd + ' has been updated in your watchlist</h1>',
                    };

                    sgMail.send(message)
                    .then(response => console.log('Email has been sent'))
                    .catch((error) => console.error(error.message));
                }
                
                return res.status(200).json({success: true, message: ""});
            }
        }).catch((err) => {
            return res.status(404).json({success: false, message: err});
    });
}


// This method takes an ID of a property and finds the property in the database
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


// This method takes an ID of a property and deletes in from the database
deleteHome = async (req, res) => {
    const home = await Home.findById({ _id: req.params.id });
    const deleted = await Home.deleteOne({ _id: req.params.id }, (err, response) => {
        if (err) {
            return res.status(404).json({success: false});
        } else {
            if (home.neighbourhood !== null && home.neighbourhood !== '') {
                checkNeighbourhoods(home.neighbourhood);
            }

            if (home.email !== null) {
                const message = {
                    to: home.email,
                    from: {
                        name: 'HomeSearch',
                        email :'aakashpatel141@gmail.com'
                    },
                    subject: 'HomeSearch: ' + home.streetAd + ' has been deleted from your watchlist',
                    text: home.streetAd + '  deleted from your watchlist',
                    html: '<h1>' + home.streetAd + '  deleted from your watchlist</h1>',
                };

                sgMail.send(message)
                .then(response => console.log('Email has been sent'))
                .catch((error) => console.error(error.message));
            }

            return res.status(200).json({success: true});
        }
    }).catch((err) => {
        return res.status(400).json({message: err});
    });
}


// This method will return all the neibourhoods that are stored in the database
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


// This method will add a neighbourhood to the database
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


// This method will calculate an average for properties sold in a particular neighbourhood
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

// This method will check if a neighbourhood has any houses in the users watchlist and if it doesn't then the neighbourhood is deleted
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