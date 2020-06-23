const express = require('express');
const outRouter = express.Router(); 
const ParkingOut = require('../controller/outController')

outRouter.get('/', function(req, res, next) {    
    const parkingOut = new ParkingOut();
    
    if (parkingOut.showOut(res)) {
        res.status(200);
    }
    else {                
        res.status(404);
    }
});


outRouter.get('/number', function(req, res, next) {
    const outData = req.query;
    const parkingOut = new ParkingOut();
    
    if (parkingOut.searchParking(outData, res)) { 
        res.status(200);
    }
    else {
        res.status(404);
    }
})


outRouter.put('/', function(req, res, next) {
    const outData = req.body;
    const parkingOut = new ParkingOut();
    
    if (parkingOut.payParking(outData, res)) {
        res.status(200);
    }
    else {
        res.status(404);
    }
})

module.exports = outRouter;