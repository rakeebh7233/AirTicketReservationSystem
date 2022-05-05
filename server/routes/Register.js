const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");

router.post("/customer", async (req,res) => {
    console.log(req.body);
    User.Customer.getCustomerInfo(req.body.email_address, (err,data) => {
        if (err) throw err;
        if (data.length !== 0) res.json({error: "User already exists"});
        return;
    });
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const customer = User.Customer(req.body);
    User.Customer.insertCustomer(customer);
    res.json("success");
});

router.post("/staff", async (req,res) => {
    console.log(req.body);
    User.Staff.getStaffInfo(req.body.username, (err,data) => {
        if (err) throw err;
        if (data.length !== 0) res.json({error: "Airline Staff Member already exists"});
        return;
    });
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const staff = User.Staff(req.body);
    User.Staff.insertStaff(staff);
    res.json("success");
});

module.exports = router;