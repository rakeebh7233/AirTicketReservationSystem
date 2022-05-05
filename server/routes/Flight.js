const express = require("express");
const router = express.Router();
const { Flight } = require('../models/flight_queries');

router.get("/allFlights", async (req,res) => {
    Flight.getAllFlights((err,data) => {
        if(err) throw err;
        //console.log(data);
        res.send(data);
    });
});

router.get("/searchFlights/:source_city/:dest_city/:dep_date", async(req,res) => {
    Flight.searchForFlight(req.params.source_city, req.params.dest_city, req.params.dep_date, (err,data) => {
        if(err) throw err;
        res.send(data);
    });
});

router.get("/searchFutureFlights/:source_city/:dest_city/:dep_date", async(req,res) => {
    Flight.searchFutureFlight(req.params.source_city, req.params.dest_city, req.params.dep_date, (err,data) => {
        if(err) throw err;
        res.send(data);
    });
});

router.get("/searchReturnFlights/:source_city/:dest_city/:dep_date/:ret_date", async(req,res) => {
    Flight.searchReturnFlight(req.params.source_city, req.params.dest_city, req.params.dep_date, req.params.ret_date, (err,data) => {
        if(err) throw err;
        res.send(data);
    });
});


router.get("/getStatus/:al_name/:flight_num/:dep_date/:arr_date", async(req,res) => {
    Flight.getFlightStatus(req.params.al_name, req.params.flight_num, req.params.dep_date, req.params.dep_date, (err,data) => {
        if (err) throw err;
        res.send(data);
    });
});




module.exports = router;