const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/homeController');

router.get('/', homeCtrl.getHomes);

router.get('/neighbourhoods', homeCtrl.getNeighbourhoods);

router.get('/average/:neighbourhood', homeCtrl.getAverage);

router.get('/:id', homeCtrl.findHomeById);

router.post('/', homeCtrl.createHome);

router.put('/:id', homeCtrl.updateHome);

router.delete('/:id', homeCtrl.deleteHome);

module.exports = router;