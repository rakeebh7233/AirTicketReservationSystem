const express = require("express");
const router = express.Router();
const { Ticket } = require('../models/ticket_queries');

router.get('/viewMyFlights/:email_address', async (req,res) => {
    Ticket.searchFutureFlights(req.params.email_address, (err,data) => {
        if (err) throw error;
        res.send(data);
    });
});

//have to add additional search routes/queries

router.get('/viewMyPreviousFlights/:email_address', async (req,res) => {
    Ticket.searchPreviousFlights(req.params.email_address, (err,data) => {
        if (err) throw error;
        res.send(data);
    });
});

router.post('/purchaseTicket', async (req,res) => {
    console.log(req.body);
    const purchasedTicket = Ticket.Ticket(req.body);
    Ticket.purchaseTicket(purchasedTicket);
});

router.post('/cancelTrip/:ticket_id', async(req,res) => {
    Ticket.cancelTicket(req.params.ticket_id, (err,data) => {
        if (err) throw err;
        res.json("Your flight has been canceled");
    });
});

router.post('/addReview/:email_address/:ticket_id/:rating/:comment', async (req,res) => {
    Ticket.addReview(req.params.email_address, req.params.ticket_id, req.params.rating, req.params.comment, (err,data) => {
        if (err) throw err;
        res.json("Thank you for your Feedback!");
    });
});

router.get('/spendingLastSixMonths/:email_address', async (req,res) => {
    Ticket.lastSixMonthsSpent(req.params.email_address, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get('/spendingLastYear/:email_address', async (req,res) => {
    Ticket.pastYearSpent(req.params.email_address, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

//Still to Complete: 1, 7

module.exports = router;
