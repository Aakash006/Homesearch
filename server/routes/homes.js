const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/homeController');

router.get('/', homeCtrl.getHomes);

router.get('/neighbourhoods', homeCtrl.getNeighbourhoods);

router.get('/average/:neighbourhood', homeCtrl.getNeighbourhoods);

router.get('/:id', homeCtrl.findHomeById);

router.post('/', homeCtrl.createHome);

router.put('/', homeCtrl.updateHome);

router.delete('/:id', homeCtrl.deleteHome);

module.exports = router;