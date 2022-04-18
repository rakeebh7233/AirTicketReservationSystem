
const express = require('express');
const router = express.Router();
const { flight } = require('../models');

router.get("/", async (req,res) => {
    const listOfFlights = await flight.findAll();
    res.json(listOfFlights);
});

router.post("/", async (req,res) => {
    const newflight = req.body
    await flight.create(newflight);
    res.json(newflight);
});

module.exports = router;