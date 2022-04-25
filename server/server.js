const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:false}));  
app.use(cors());

//Routers
const registerRouter = require("./routes/Register");
app.use("/register", registerRouter); 
const loginRouter = require("./routes/Login"); 
app.use("/login", loginRouter);
const flightRouter = require("./routes/Flight");
app.use("/flights", flightRouter); 
const customerRouter = require("./routes/Customer"); 
app.use("/customer", customerRouter);
const staffRouter = require("./routes/Staff");
app.use("/staff", staffRouter);

app.listen(3001, () => {
    console.log("\n\nServer running on port 3001");
});


