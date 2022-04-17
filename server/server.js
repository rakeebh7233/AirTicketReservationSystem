const express = require('express');
const app = express();
const cors = require("cors");

<<<<<<< HEAD
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

=======
const db = require("./models");

// Routers
const flightRouter = require("./routes/Flights")

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log("Server running on port 3001"));
})
>>>>>>> d757bdab13787637c0ff787c55b5439686d562f8
