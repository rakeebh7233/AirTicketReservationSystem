const express = require("express");
const router = express.Router();
const { Ticket } = require('../models/ticket_queries');
const { validateToken } = require("../middleware/auth");

router.get('/viewMyFlights', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.searchFutureFlights(email_address, (err,data) => {
        if (err) throw error;
        res.send(data);
    });
});

router.get("/viewSearchedFlights/:source_city/:dest_city/:dateA/:dateB", validateToken, async (req,res) => {
    const email_address = req.user.email_address;
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

router.post('/purchaseTicket/:airline_name/:flight_number/:departure_date/:departure_time/:base_price', validateToken, async (req,res) => {
   console.log(req.body);
   const ticket_id = (Math.floor(100000 + Math.random() * 900000)).toString(); //generates random 6 digit number
   const email_address = req.user.email_address;
   let sold_price = parseInt(req.params.base_price);
   Ticket.getFlightCapacity(req.params.flight_number, (err,data) => {
       if(err) throw error;
       //console.log("Current Cap %: " + data);
       if (data >= 0.75) sold_price *= 1.25;
   });
   if (req.body.travel_class == "business") sold_price += 500;
   if (req.body.travel_class == "first") sold_price += 1000;
   console.log("Final Sold Price: " + sold_price);
   Ticket.purchaseTicket(ticket_id, req.params.airline_name,req.params.flight_number,req.params.departure_date.substr(0,10),req.params.departure_time,req.body.travel_class, sold_price,
                req.body.card_type, req.body.card_number, req.body.card_expiration, req.body.name_on_card, email_address, (err,data) => {
        if (err) throw error;
        res.json("You have purchased the ticket!");
    });
});

router.post('/cancelTrip', validateToken, async(req,res) => {
    console.log(req.body.ticket_id);
    Ticket.cancelTicket(req.body.ticket_id, (err,data) => {
        if (err) throw err;
        res.json("Your flight has been canceled");
        
    });
});

router.post('/addReview', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.addReview(email_address, req.body.ticket_id, req.body.rating, req.body.comment, (err,data) => {
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
    Ticket.pastYearSpent(email_address, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get('/spendingDateRange/:dateA/:dateB', validateToken, async (req,res) => {
    const email_address = req.user.email_address;
    Ticket.rangeSpent(email_address, req.params.dateA, req.params.dateB, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get('/auth', validateToken, (req,res) => {
    res.json(req.user);
});

module.exports = router;
