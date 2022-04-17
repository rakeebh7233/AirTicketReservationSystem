
const express = require('express');
const router = express.Router();
const { Flight } = require('../models');

router.get("/", async (req,res) => {
    const listOfFlights = await Flight.findAll();
    res.json.apply(listOfFlights);
});

router.post("/", async (req,res) => {
    const flight = req.body
    await Flight.create(flight);
    res.json.flight;
});

module.exports = router;