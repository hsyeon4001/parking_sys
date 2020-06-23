const express = require('express'); 
const ticketRouter = express.Router();
const Ticket = require('../controller/ticketController');

ticketRouter.get('/', function(req, res, next) {
    const ticket = new Ticket();

    if (ticket.showTicket(res)) {
        res.status(200);
    }
    else {                
        res.status(404);
    }
});


ticketRouter.post('/', function(req, res, next) {
    const ticketData = req.body;
    const ticket = new Ticket();
    
    if (ticket.addTicket(ticketData, res)) {
        res.status(200);
    }
    else {
        res.status(404);
    }
});

module.exports = ticketRouter;