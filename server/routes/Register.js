const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");

router.post("/customer", async (req,res) => {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const customer = User.Customer(req.body);
    User.Customer.insertCustomer(customer);
});

router.post("/staff", async (req,res) => {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const staff = User.Staff(req.body);
    User.Staff.insertStaff(staff);
});

module.exports = router;