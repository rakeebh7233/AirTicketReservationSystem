const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");

router.post("/customer", async (req, res) => {
    const { email_address, password } = req.body;
    User.Customer.getCustomerInfo(email_address, (err,data) => {
        if (err) throw err;
        if (data.length == 0) res.json("User does not exist");
        else {
            console.log(data);
            console.log(data[0].password);
            bcrypt.compare(password, data[0].password).then((match) => {
                console.log("Checking password");
                if (!match) {
                    console.log("did not match");
                    res.json({ error: "Wrong Username And Password Combination" });
                }
                console.log("Matched!");
                res.json("YOU LOGGED IN!!!");
            });
        }
    });
});

router.post("/staff", async(req,res) => {
    const { username, password } = req.body;
    User.Staff.getStaffInfo(username, (err,data) => {
        if (err) throw err;
        if (data.length == 0) res.json("User does not exist");
        else {
            console.log(data);
            console.log(data[0].password);
            bcrypt.compare(password, data[0].password).then((match) => {
                console.log("Checking password");
                if (!match) {
                    console.log("did not match");
                    res.json({ error: "Wrong Username And Password Combination" });
                    return;
                }
                console.log("Matched!");
                res.json("YOU LOGGED IN!!!");
            });
        }
    });
});

module.exports = router;