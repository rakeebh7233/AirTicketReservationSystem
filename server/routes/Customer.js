const express = require("express");
const router = express.Router();
const { customer } = require('../models');

router.get("/", async (req,res) => {
    const listOfCustomers = await customer.findAll();
    res.json(listOfCustomers);
});

router.post("/register", async (req,res) => {
    const newcustomer = req.body
    await customer.create(newcustomer);
    res.json(newcustomer);
});

module.exports = router;