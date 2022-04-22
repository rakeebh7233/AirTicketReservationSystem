const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");

router.post("/customer", async (req,res) => {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // v1
    const customer = User.Customer(req.body);
    User.Customer.insertCustomer(customer);
    /* V2
    User.Customer(req.body);
    User.Customer.insertCustomer(User);
    */
});

router.post("/staff", async (req,res) => {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const staff = User.Staff(req.body);
    User.Staff.insertStaff(staff);
});

// testing purposes
router.get("/customer", async (req,res) => {
    res.send("I am on /register/customer");
});




module.exports = router;