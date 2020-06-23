const express = require('express');
const inRouter = express.Router(); 
const ParkingIn = require('../controller/inController');

inRouter.get('/', function(req, res, next) {    
    const parkingIn = new ParkingIn();
    if (parkingIn.showIn(res)) {
        res.status(200);
    }
    else {                
        res.status(404);
    }
});


inRouter.post('/', function(req, res, next) {
    const inData = req.body;
    const parkingIn = new ParkingIn();
    
    if (parkingIn.addParking(inData, res)) {
        res.status(200);
    }
    else {
        res.status(404);
    }
});


module.exports = inRouter;