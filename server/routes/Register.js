const express = require("express");
const router = express.Router();

router.get("/", async (req,res) => {
    console.log("I am on the register page");
});

router.get("/customer", async (req,res) => {
    console.log("I am in register get customer");
});

router.get("/airline_staff", async (req,res) => {
    console.log("I am in register get staff");
});

router.post("/customer", async (req,res) => {
    console.log("I am in register post customer");
    const newcustomer = req.body
    await customer.create(newcustomer);
    res.json(newcustomer);
});

router.post("/airline_staff", async (req,res) => {
    console.log("I am in register post staff");
});

module.exports = router;