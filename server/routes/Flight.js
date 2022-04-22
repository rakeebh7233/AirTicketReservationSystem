const express = require("express");
const router = express.Router();
const { Flight } = require('../models/flight_queries');

router.get("/allFlights", async (req,res) => {
    Flight.getAllFlights((err,data) => {
        if(err) throw err;
        res.send(data);
    });
});

router.get("/searchFlights", async(req,res) => {
    Flight.searchForFlight(req.params.source_city, req.params.dest_city, req.params.dep_date, (err,data) => {
        if(err) throw err;
        res.send(data);
    });
});



module.exports = router;