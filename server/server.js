const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const database = require('./db');

app.use(express.json());
app.use(cors());
app.use(express,urlencoded((extended:false)));

const db = require("./models");
const { urlencoded } = require('body-parser');

app.listen(3001, () => {
    console.log("\n\nServer running on port 3001");
});


/*

//Routers
const flightRouter = require("./routes/Flight");
app.use("/flights", flightRouter); //changed from flight to flights

const customerRouter = require("./routes/Customer"); //unsure about these
app.use("/customer", customerRouter);

const registerStaffRouter = require("./routes/Staff"); //unsure about these 
app.use("/staff", registerStaffRouter);

*/

