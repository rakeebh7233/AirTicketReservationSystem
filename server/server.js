const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./module");

//Routers
const flightRouter = require("./routes/Flight");
app.use("/flights", flightRouter); //changed from flight to flights

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
}); 

