const express = require("express");
const router = express.Router();
const { airline_staff } = require('../models');

router.get("/", async (req,res) => {
    const listOfStaff = await airline_staff.findAll();
    res.json(listOfStaff);
});

router.post("/register", async (req,res) => {
    const newstaff = req.body
    await airline_staff.create(newstaff);
    res.json(newstaff);
});

module.exports = router;