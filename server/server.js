const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const conn = require('./db');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

//Routers
const flightRouter = require("./routes/Flight");
app.use("/flights", flightRouter); //changed from flight to flights

app.listen(3001, () => {
    console.log("\n\nServer running on port 3001");
});


/*



const customerRouter = require("./routes/Customer"); //unsure about these
app.use("/customer", customerRouter);

const registerStaffRouter = require("./routes/Staff"); //unsure about these 
app.use("/staff", registerStaffRouter);

*/

