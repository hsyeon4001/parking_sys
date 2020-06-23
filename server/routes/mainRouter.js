const express = require('express');
const mainRouter = express.Router(); 
const ParkingMain = require('../controller/mainController');

mainRouter.get('/', function(req, res, next) {
    const parkingMain = new ParkingMain();
    
    if (parkingMain.showMain(res)) {
        res.status(200);
    }
    else {                
        res.status(404);
    }
});

module.exports = mainRouter;