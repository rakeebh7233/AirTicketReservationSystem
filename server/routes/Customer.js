const express = require("express");
const router = express.Router();

router.post("/", async (req,res) => {
    const {username, password} = req.body;
});

module.exports = router;