const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");

router.post("/customer", async(req,res) => {
    const { email_address, password } = req.body; 
    const user = User.Customer.getCustomerInfo(email_address);
    if (!user) res.json({error: "User doesn't exist"});
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "Wrong username/password"});
        res.json("Logged In."); 
    });
});

router.post("/staff", async(req,res) => {
    const { username, password } = req.body; 
    const user = User.Staff.getStaffInfo(username);
    if (!user) res.json({error: "User doesn't exist"});
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "Wrong username/password"});
        res.json("Logged In."); 
    });
});

module.exports = router;