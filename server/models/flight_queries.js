const sql = require('../db');

const Flight = function createFlight(flight) {
    let result = {};
    result.airline_name = flight.airline_name;
    result.flight_number = flight.flight_number;
    result.departure_date = flight.departure_date;
    result.departure_time = flight.departure_time;
    result.departure_airport_code = flight.departure_airport_code;
    result.arrival_date = flight.arrival_date;
    result.arrival_time = flight.arrival_time;
    result.arrival_airport_code = flight.arrival_airport_code;
    result.airplane_id = flight.airplane_id;
    result.base_price = flight.base_price;
    result.status = flight.status;
    return result;
};

Flight.getAllFlights = (result) => {
    sql.query('SELECT * FROM Flight', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Flights: " + res);
        result(null,res);
    });
};

Flight.insertFlight = (flight, result) => {
    sql.query('INSERT INTO Flight VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)',
    [flight.airline_name, flight.flight_number, flight.departure_date, flight.departure_time,
    flight.departure_airport_code, flight.arrival_date, flight.arrival_time, flight.arrival_airport_code,
    flight.airplane_id, flight.base_price, flight.status], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            //result(null,err);
            return;
        }
        console.log("Inserted Flight: " + res);
        //result(null,res);
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

Flight.getAirplanesOwnedByAirline = (airline_name, result) => {
    sql.query('SELECT * FROM airplane WHERE airline_name=?',
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Airlines: " + res);
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

Flight.searchFutureFlight = (source_city, dest_city, dep_date, result) => {
    sql.query('SELECT * FROM Flight WHERE departure_airport_code = ? AND arrival_airport_code = ? AND departure_date > (SELECT CURDATE()) AND departure_date = ?', 
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

Flight.searchReturnFlight = (source_city, dest_city, dep_date, ret_date, result) => {
    sql.query('SELECT * FROM Flight WHERE departure_airport_code = ? AND arrival_airport_code = ? AND arrival_date > ? AND arrival_date = ?', 
    [source_city, dest_city, dep_date, ret_date], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Return Flights: " + res);
        result(null,res);
    });
};

Flight.getAirlineFlight = (airline_name, result) => {
    sql.query('SELECT * FROM Flight WHERE airline_name = ? AND departure_date BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)', [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log(airline_name + " Flights: " + res);
        result(null,res);
    });
};

Flight.searchAirlineFlight = (airline_name, source_city, dest_city, dateA, dateB, result) => { 
    sql.query('SELECT * FROM Flight WHERE airline_name = ? AND departure_airport_code = ? AND arrival_airport_code = ? AND (departure_date BETWEEN ? AND ?)', 
    [airline_name, source_city, dest_city, dateA, dateB], (err,res) => {
        if (err) { 
            result(null,err);
            return;
        }
        console.log("Searched Airline Flights: " + res);
        result(null,res);
    });
}

Flight.getFlightStatus = (al_name, flight_num, dep_date, arr_date, result) => {
    sql.query('SELECT airline_name, flight_number, status FROM Flight WHERE airline_name = ? AND flight_number = ? AND departure_date = ? AND arrival_date = ?', 
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
    sql.query('UPDATE flight SET status=? WHERE airline_name=? AND flight_number=? AND departure_date=? AND departure_time=?', 
    [new_status, al_name, flight_num, dep_date, dep_time], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log(res.affectedRows + " record(s) updated");
        console.log("Updated Flight: " + res);
        result(null,res);
    });
};

Flight.insertAirplane = (airplane_id, airline_name, num_seats, manufacturing_company, age, result) => {
    sql.query('INSERT INTO Airplane VALUES (?, ?, ?, ?, ?)', [airplane_id, airline_name, num_seats,
    manufacturing_company, age], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Inserted Airplane: " + res);
        result(null,res);
    });
};

Flight.insertAirport = (airport_code, name, city, country, airport_type, result) => {
    sql.query('INSERT INTO Airport VALUES (?, ?, ?, ?, ?)', [airport_code, name, city, country, airport_type],
    (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Inserted Airport: " + res);
        result(null,res);
    });
};

module.exports = { Flight }

