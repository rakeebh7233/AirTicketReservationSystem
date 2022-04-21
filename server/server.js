const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const flightRouter = require("./routes/Flight");
app.use("/flights", flightRouter); //changed from flight to flights

const customerRouter = require("./routes/Customer"); //unsure about these
app.use("/customer", registerCustomerRouter);

const registerStaffRouter = require("./routes/Staff"); //unsure about these 
app.use("/staff", registerStaffRouter);



db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("\n\nServer running on port 3001");
    });
}); 

