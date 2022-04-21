const express = require('express');
const router = express.Router();

router.get("/", async (req,res) => {
    res.send("Hi")
});

router.post("/", async (req,res) => {

});

module.exports = router;