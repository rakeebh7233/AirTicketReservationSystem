const sql = require('../db');

const Ticket = function createTicket(ticket) {
    this.ticket_id = ticket.ticket_id;
    this.airline_name = ticket.airline_name;
    this.flight_number = ticket.flight_number;
    this.departure_date = ticket.departure_date;
    this.departure_time = ticket.departure_time;
    this.travel_class = ticket.travel_class;
    this.sold_price = ticket.sold_price;
    this.card_type = ticket.card_type;
    this.card_number = ticket.card_number;
    this.card_expiration = ticket.card_expiration;
    this.name_on_card = ticket.name_on_card;
    this.purchase_date = ticket.purchase_date;
    this.purchase_time = ticket.purchase_time;
    this.email_address = ticket.email_address;
};

Ticket.purchaseTicket = (ticket_id, airline_name, flight_number, departure_date, departure_time, travel_class, sold_price, card_type, card_number, card_expiration, name_on_card, email_address, result) => {
    sql.query('INSERT INTO Ticket VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT CURDATE()), (SELECT CURTIME()), ?)', 
    [ticket_id, airline_name, flight_number, departure_date, departure_time, travel_class, sold_price, card_type, card_number, card_expiration, name_on_card,
    email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("New Purchase: " + res);
        result(null,res);
    });
};

Ticket.searchFutureFlights = (email_address, result) => {
    sql.query('SELECT * FROM Ticket LEFT JOIN Flight ON Ticket.flight_number = Flight.flight_number WHERE email_address = ? AND ((Ticket.departure_date > (SELECT CURDATE())) OR (Ticket.departure_date = (SELECT CURDATE()) and Ticket.departure_time > (SELECT NOW())))',
    [email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Customer Flights: " + res);
        result(null,res);
    });
};

Ticket.getFlightCustomers = (flight_number, departure_date, departure_time, result) => {
    sql.query('SELECT email_address FROM ticket WHERE flight_number=? AND departure_date=? AND departure_time=?',
    [flight_number, departure_date, departure_time], (err,res) => {
        if (err) { 
            result(null,err);
            return;
        }
        console.log("Searched Flight's Customers: " + res);
        result(null,res);
    });
}

Ticket.searchCustomerFlights = (email_address, source_city, dest_city, dateA, dateB, result) => {
    sql.query('SELECT * FROM Flight WHERE flight_number IN (SELECT flight_number FROM Ticket WHERE email_address = ?) AND departure_airport_code = ? AND arrival_airport_code = ? AND (departure_date BETWEEN ? AND ?)', 
    [email_address, source_city, dest_city, dateA, dateB], (err,res) => {
        if (err) {
            
            result(null,err);
            return;
        }
        console.log("Searched Customer Flights: " + res);
        result(null,res);
    });
};

Ticket.getFlightCapacity = (flight_number, result) => {
    console.log("Capacity function called");
    sql.query('SELECT COUNT(*)/num_seats as Capacity FROM Flight NATURAL JOIN Airplane WHERE flight_number = ?', [flight_number], (err,res) => {
        if (err) {
            result(null,err);
            return;
        }
        console.log("Percentage Seats Bought: " + res);
        result(null,res);
    });
};

Ticket.searchPreviousFlights = (email_address, result) => {
    sql.query('SELECT ticket_id, flight_number, departure_date, departure_time, travel_class, sold_price FROM Ticket WHERE email_address = ? AND ((departure_date < (SELECT CURDATE())) OR (departure_date = (SELECT CURDATE()) and departure_time > (SELECT NOW())))',
    [email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Previous Customer Flights: " + res);
        result(null,res);
    });
};

Ticket.cancelTicket = (ticket_id, result) => {
    //console.log("called cancel ticket query");
    //console.log(`DELETE FROM Ticket WHERE ticket_id = ${ticket_id}`);
    sql.query('DELETE FROM Ticket WHERE ticket_id = ?', [ticket_id], (err,res) =>{
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Canceled Ticket: " + res);
        result(null,res);
    });
};

Ticket.addReview = (email_address, ticket_id, rating, comment, result) => {
    sql.query('INSERT INTO Reviews VALUES (?, ?, ?, ?)', [email_address, ticket_id,
    rating, comment], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("New Review: " + res);
        result(null,res);
    });
};

//check this query in phpMyAdmin
Ticket.pastYearSpent = (email_address, result) => {
    sql.query('SELECT SUM(sold_price) as totalSpent FROM Ticket WHERE email_address = ? AND purchase_date  BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE()', 
    [email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Spent Past Year: " + res);
        result(null,res);
    });
};

Ticket.lastSixMonthsSpent = (email_address, result) => {
    //query written like this so it is easier to convert to table in the front end
    sql.query('SELECT MONTH(purchase_date) as Month, YEAR(purchase_date) as Year, SUM(sold_price) as MonthlyTotal FROM Ticket WHERE email_address = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -6 MONTH) AND CURRENT_DATE() GROUP BY MONTH(purchase_date), YEAR(purchase_date)', 
    [email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Spent Past 6 Months: " + res);
        result(null,res);
    });
};

Ticket.rangeSpent = (email_address, dateA, dateB,result) => {
    //console.log(`SELECT MONTH(purchase_date) as Month, YEAR(purchase_date) as Year, SUM(sold_price) as MonthlyTotal FROM Ticket WHERE email_address = ${email_address} AND purchase_date BETWEEN ${dateA} AND ${dateB} GROUP BY MONTH(purchase_date), YEAR(purchase_date)`);
    sql.query('SELECT MONTH(purchase_date) as Month, YEAR(purchase_date) as Year, SUM(sold_price) as MonthlyTotal FROM Ticket WHERE email_address = ? AND purchase_date BETWEEN ? AND ? GROUP BY MONTH(purchase_date), YEAR(purchase_date)', 
    [email_address, dateA, dateB], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Spent In Range: " + res);
        result(null,res);
    });
};

Ticket.viewFlightRatings = (airline_name, result) => {
    sql.query('SELECT flight_number, AVG(rating) as avg_rating, email_address, rating, comment FROM Ticket NATURAL JOIN Reviews WHERE airline_name = ? GROUP BY flight_number', [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Flight Ratings: " + res);
        result(null,res);
    });
};

Ticket.pastYearRevenue = (airline_name, result) => {
    sql.query('SELECT SUM(sold_price) FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE()', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Sold Past Year: " + res);
        result(null,res);
    });
};

Ticket.lastMonthRevenue = (airline_name, result) => {
    sql.query('SELECT SUM(sold_price) FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH) AND CURRENT_DATE()', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Sold Past 6 Months: " + res);
        result(null,res);
    });
};

Ticket.pastYearRevenueTravelClass = (airline_name, result) => {
    sql.query('SELECT travel_class, SUM(sold_price) as classRev FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE() GROUP BY travel_class ORDER BY SUM(sold_price) DESC', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Total Sold Travel Class Past Year: " + res);
        result(null,res);
    });
};

Ticket.pastYearSold = (airline_name, result) => {
    sql.query('SELECT COUNT(*) as totalSold, SUM(sold_price) as totalRevenue FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE()', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Total Sold Past Year: " + res);
        result(null,res);
    });
};

Ticket.lastMonthSold = (airline_name, result) => {
    sql.query('SELECT COUNT(*) as totalSold, SUM(sold_price) as totalRevenue, MONTH(purchase_date) as month, YEAR(purchase_date) as year FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH) AND CURRENT_DATE()', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Total Sold Past 6 Months: " + res);
        result(null,res);
    });
};

Ticket.rangeSold = (airline_name, dateA, dateB,result) => {
    sql.query('SELECT COUNT(*) as totalSold, SUM(sold_price) as totalRevenue, MONTH(purchase_date) as month, YEAR(purchase_date) as year FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN ? AND ? GROUP BY MONTH(purchase_date), YEAR(purchase_date)', 
    [airline_name, dateA, dateB], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Sold In Range: " + res);
        result(null,res);
    });
};

Ticket.pastYearSoldTravelClass = (airline_name, result) => {
    sql.query('SELECT travel_class, COUNT(*) FROM Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE() GROUP BY travel_class', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Total Sold Travel Class Past Year: " + res);
        result(null,res);
    });
};

Ticket.getMostFreqCustomer = (airline_name, result) => {
    sql.query('SELECT name, email_address FROM ticket NATURAL JOIN customer WHERE airline_name=? AND purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE() GROUP BY email_address ORDER by COUNT(*) DESC LIMIT 1',
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Most frequent customer: " + res);
        result(null,res);
    });
}

Ticket.viewCustomerFlightsInAirline = (airline_name, email_address, result) => {
    sql.query('SELECT * FROM `ticket` WHERE airline_name = ? AND email_address=?',
    [airline_name, email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Customer Flights for Airline : " + res);
        result(null,res);
    });
}

Ticket.getTopDestinations = (airline_name, result) => {
    const sqlQuery = `SELECT city FROM airport WHERE airport_code IN (
        SELECT arrival_airport_code FROM ticket NATURAL JOIN flight
        WHERE airline_name=? 
        GROUP BY arrival_airport_code
        ORDER by COUNT(*) DESC) LIMIT 3`
    sql.query(sqlQuery,[airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Top Destinations: " + res);
        result(null,res);
    });
} 

module.exports = { Ticket }
