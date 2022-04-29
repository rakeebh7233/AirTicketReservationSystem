const express = require("express");
const router = express.Router();
const { Flight } = require('../models/flight_queries');
const { Ticket } = require('../models/ticket_queries');
const User = require('../models/user_queries');
const { validateToken } = require('../middleware/auth');

router.get("/viewAirlineFlights", validateToken, async (req,res) => {
    User.Staff.getStaffInfo(req.user.staff.username, (err, data) => {
        Flight.searchAirlineFlight(data[0].airline_name, (err,data) => {
            if (err) throw err;
            res.send(data);
        });
    });
});

router.post("/createFlight", validateToken, async(req,res) => {
    const newFlight = Flight(req.body);
    Flight.insertFlight(newFlight);
    res.json("Flight has been added into the System");
});

router.post("/changeFlightStatus", validateToken, async(req,res) => {
    Flight.updateFlightStatus(req.user.staff.airline_name,req.body.flight_num,req.body.dep_date,req.body.dep_time,
        req.body.new_status, (err,data) => {
            if (err) throw err;
            res.json("Flight Status has been updated");
        })
});

router.get("/airplanesOwned", validateToken, async(req,res) => {
    Flight.getAirplanesOwnedByAirline(req.user.staff.airline_name, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});

router.post("/addAirplane", validateToken, async(req,res) => {
    Flight.insertAirplane(req.body.airplane_id, req.body.airline_name, req.body.num_seats,
                            req.body.manufacturing_company, req.body.age, (err,data) => {
        if (err) throw err;
        res.json("Airplane has been added into the System");
    })
});

router.post("/addAirport", validateToken, async(req,res) => {
    Flight.insertAirport(req.body.airport_code, req.body.name, req.body.city, req.body.country, 
                            req.body.airport_type, (err,data) => {
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

router.get("/viewRatings", validateToken, async(req,res) => {
    User.Staff.getStaffInfo(req.user.username, (err, data) => {
        Ticket.viewFlightRatings(data[0].airline_name, (err,data) => {
            if (err) throw err;
            res.send(data);
        });
    });
});

//Still to complete: 1, 7, 8, 11, 12

router.get('/auth', validateToken, (req,res) => {
    res.json(req.user);
});

module.exports = router;