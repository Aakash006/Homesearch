const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/homeController');

router.get('/homes', homeCtrl.getHomes);

router.get('/neighbourhoods', homeCtrl.getNeighbourhoods);

router.get('/average/:neighbourhood', homeCtrl.getAverage);

router.get('/home/:id', homeCtrl.findHomeById);

router.post('/home', homeCtrl.createHome);

router.put('/home/:id', homeCtrl.updateHome);

router.delete('/home/:id', homeCtrl.deleteHome);

module.exports = router;