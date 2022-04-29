const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user_queries");
const {sign} = require("jsonwebtoken");
const {validateToken} = require('../middleware/auth')

router.post("/customer", async (req, res) => {
    const { email_address, password } = req.body;
    User.Customer.getCustomerInfo(email_address, (err,data) => {
        if (err) throw err;
        if (data.length == 0) res.json({error: "User does not exist"});
        else {
            console.log(data);
            console.log(data[0].password);
            bcrypt.compare(password, data[0].password).then((match) => {
                console.log({ error: "Checking password"});
                if (!match) {
                    console.log("did not match");
                    res.json({ error: "Wrong Username And Password Combination" });
                    return;
                }
                console.log("Matched!");
                const accessToken = sign({email_address: data[0].email_address}, "secret");
                res.json(accessToken);
            });
        }
    });
});

router.post("/staff", async(req,res) => {
    const { username, password } = req.body;
    User.Staff.getStaffInfo(username, (err,data) => {
        if (err) throw err;
        if (data.length == 0) res.json({error: "User does not exist"});
        else {
            bcrypt.compare(password, data[0].password).then((match) => {
                if (!match) {
                    res.json({ error: "Wrong Username And Password Combination" });
                    return;
                }
                const accessToken = sign({staff: data[0]}, "secret");
                res.json(accessToken);
            });
        }
    });
});

router.get('/auth', validateToken, (req,res) => {
    res.json(req.user);
});

module.exports = router;