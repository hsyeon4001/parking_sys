const express = require('express');
const checkRouter = express.Router(); 
const ParkingCheck = require('../controller/checkController');

checkRouter.get('/', function(req, res, next) {    
    const parkingCheck = new ParkingCheck();

    if (parkingCheck.showCheck(res)) {
        res.status(200);
    }
    else {                
        res.status(404);
    }
});


checkRouter.post('/number', function (req, res, next) {
    const checkData = req.body;
    const parkingCheck = new ParkingCheck();

    if (parkingCheck.verifyParking(checkData, res)) {
        res.status(200);
    }
    else {        
        res.status(404);
    }
})


module.exports = checkRouter;