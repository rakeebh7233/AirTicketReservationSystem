const express = require("express");
const router = express.Router();
const { Ticket } = require('../models/ticket_queries');
const { validateToken } = require("../middleware/auth");

router.get('/viewMyFlights', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    console.log(email_address);
    Ticket.searchFutureFlights(email_address, (err,data) => {
        if (err) throw error;
        res.send(data);
    });
});

//have to add additional search routes/queries
router.get("/viewSearchedFlights/:source_city/:dest_city/:dateA/:dateB", validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    console.log(email_address);
    Ticket.searchCustomerFlights(email_address, req.params.source_city, req.params.dest_city, req.params.dateA, req.params.dateB, (err,data) => {
        if (err) throw error;
        res.send(data);
    });
});

router.get('/viewMyPreviousFlights', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.searchPreviousFlights(email_address, (err,data) => {
        if (err) throw error;
        res.send(data);
    });
});

router.post('/purchaseTicket', validateToken, async (req,res) => {
    console.log(req.body);
    const purchasedTicket = Ticket.Ticket(req.body);
    Ticket.purchaseTicket(purchasedTicket);
});

router.post('/cancelTrip/:ticket_id', validateToken, async(req,res) => {
    Ticket.cancelTicket(req.params.ticket_id, (err,data) => {
        if (err) throw err;
        res.json("Your flight has been canceled");
    });
});

router.post('/addReview/:ticket_id/:rating/:comment', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.addReview(email_address, req.params.ticket_id, req.params.rating, req.params.comment, (err,data) => {
        if (err) throw err;
        res.json("Thank you for your Feedback!");
    });
});

router.get('/spendingLastSixMonths', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.lastSixMonthsSpent(email_address, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get('/spendingLastYear', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.pastYearSpent(req.params.email_address, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

//Still to Complete: 1, 7

module.exports = router;
