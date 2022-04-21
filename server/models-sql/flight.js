const sql = require('../db');

const Flight = function createFlight(flight) {
    this.airline_name = flight.airline_name;
    this.flight_number = flight.flight_number;
    this.departure_date = flight.departure_date;
    this.departure_time = flight.departure_time;
    this.departure_airport_code = flight.departure_airport_code;
    this.arrival_date = flight.arrival_date;
    this.arrival_time = flight.arrival_time;
    this.arrival_airport_code = flight.arrival_airport_code;
    this.airplane_id = flight.airplane_id;
    this.base_price = flight.base_price;
    this.status = flight.status;
};

Flight.getAllFlights = (result) => {
    sql.query('SELECT * FROM Flight', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Flights: " + res);
        result(null,res);
    });
};

Flight.insertFlight = (flight, result) => {
    sql.query('INSERT INTO Flight VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?',
    [flight.airline_name, flight.flight_number, flight.departure_date, flight.departure_time,
    flight.departure_airport_code, flight.arrival_date, flight.arrival_time, flight.arrival_airport_code,
    flight.airplane_id, flight.base_price, flight.status], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Inserted Flight: " + res);
        result(null,res);
    });
};

Flight.getAllAirports = (result) => {
    sql.query('SELECT * FROM Airport', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Airports: " + res);
        result(null,res);
    });
};

Flight.getAllAirlines = (result) => {
    sql.query('SELECT * FROM Airline', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Airlines: " + res);
        result(null,res);
    });
};

Flight.searchForFlight = (source_city, dest_city, dep_date, result) => {
    sql.query('SELECT * FROM Flight WHERE departure_airport_code = ? AND arrival_airport_code = ? AND departure_date = ?', 
    [source_city, dest_city, dep_date], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Flights: " + res);
        result(null,res);
    });
};

Flight.getFlightStatus = (al_name, flight_num, dep_date, arr_date, result) => {
    sql.query('SELECt * FROM Flight WHERE airline_name = ? AND flight_number = ? AND departure_date = ? AND arrival_date = ?', 
    [al_name, flight_num, dep_date, arr_date], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Flights: " + res);
        result(null,res);
    });
};

Flight.updateFlightStatus = (al_name, flight_num, dep_date, dep_time, new_status, result) => {
    sql.query('UPDATE Flight SET status=? WHERE airline_name=? AND flight_number=? AND departure_date=? AND departure_time=?', 
    [new_status, al_name, flight_num, dep_date, dep_time], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Updated Flight: " + res);
        result(null,res);
    });
};