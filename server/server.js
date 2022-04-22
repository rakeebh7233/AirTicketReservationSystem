const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({extended:false}));  
app.use(cors());

// Sessions
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Routers
const registerRouter = require("./routes/Register");
app.use("/register", registerRouter);
const flightRouter = require("./routes/Flight");
app.use("/flights", flightRouter); 
const customerRouter = require("./routes/Customer"); 
app.use("/customer", customerRouter);

app.listen(3001, () => {
    console.log("\n\nServer running on port 3001");
});


