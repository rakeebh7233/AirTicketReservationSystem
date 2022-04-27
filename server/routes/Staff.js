const express = require("express");
const router = express.Router();
const { Flight } = require('../models/flight_queries');
const { Ticket } = require('../models/ticket_queries');
const User = require('../models/user_queries');
const { validateToken } = require('../middleware/auth');

router.get("/viewAirlineFlights", validateToken, async (req,res) => {
    User.Staff.getStaffInfo(req.user.username, (err, data) => {
        Flight.searchAirlineFlight(data[0].airline_name, (err,data) => {
            if (err) throw err;
            res.send(data);
        });
    });
});

//have to add additional search routes/queries

router.post("/createFlight", validateToken, async(req,res) => {
    console.log("here")
    console.log(req.body);
    const newFlight = Flight(req.body);
    console.log(newFlight)
    Flight.insertFlight(newFlight);
});

router.post("/changeFlightStatus/:al_name/:flight_num/:dep_date/:dep_time/:new_status", validateToken, async (req,res) => {
    Flight.updateFlightStatus(req.params.al_name, req.params.flight_num, req.params.dep_date, req.params.dep_time, 
                                req.params.new_status, (err,data) => {
        if (err) throw err;
        res.json("Flight Status has been updated");
    })
});

router.post("/addAirplane/:airplane_id/:airline_name/:num_seats/:manufacturing_company/:age", validateToken, async(req,res) => {
    Flight.insertAirplane(req.params.airplane_id, req.params.airline_name, req.params.num_seats,
                            req.params.manufacturing_company, req.params.age, (err,data) => {
        if (err) throw err;
        res.json("Airplane has been added into the System");
    })
});

router.post("/addAirport/:airport_code/:name/:city/:country/:airport_type", validateToken, async(req,res) => {
    Flight.insertAirport(req.params.airport_code, req.params.name, req.params.city, req.params.country, 
                            req.params.airport_type, (err,data) => {
        if (err) throw err;
        res.json("Airport has been added into the System");
    });
});

router.get("/ratings/:airline_name", validateToken, async(req,res) => {
    Ticket.viewFlightRatings(req.params.airline_name, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get("/revenueLastYear/:airline_name", validateToken, async(req,res) => {
    Ticket.pastYearSold(req.params.airline_name, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get("/revenueLastSixMonths/:airline_name", validateToken, async(req,res) => {
    Ticket.lastSixMonthsSold(req.params.airline_name, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.get("/revenueClass/:airline_name", validateToken, async(req,res) => {
    Ticket.pastYearSoldTravelClass(req.params.airline_name, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

//Still to complete: 1, 7, 8, 11, 12

module.exports = router;