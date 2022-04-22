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

//make ticket_id auto increment
Ticket.purchaseTicket = (ticket, result) => {
    sql.query('INSERT INTO Ticket VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [ticket.ticket_id, ticket.airline_name, ticket.flight_number, ticket.departure_date,
    ticket.departure_time, ticket.travel_class, ticket.sold_price, ticket.card_type,
    ticket.card_number, ticket.card_expiration, ticket.name_on_card, ticket.purchase_date,
    ticket.purchase_time, ticket.email_address], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("New Purchase: " + res);
        result(null,res);
    });
};

Ticket.cancelTicket = (ticket_id, departure_date, departure_time, result) => {
    if (/*check that flight is less than 24 hours away*/) {
        sql.query('DELETE FROM Ticket WHERE ticket_id = ?', [ticket_id], (err,res) =>{
            if (err) {
                console.log("Error: ", err);
                result(null,err);
                return;
            }
            console.log("Canceled Ticket: " + res);
            result(null,res);
        });
    } else {
        //how can we tell user that they can't cancel this flight
    }
};

Ticket.createReview = (email_address, ticket_id, rating, comment, result) => {
    if (/*check that this is a ticket for a previous flight*/) {
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
    }
    else {

    }
};

//check this query in phpMyAdmin
Ticket.pastYearSpent = (email_address, result) => {
    sql.query('SELECT SUM(sold_price) FROM Ticket WHERE email_address = ? AND purchase_date >= (SELECT DATEADD(year,-1,SELECT CURDATE()))', 
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
    sql.query('SELECT SUM(sold_price) FROM Ticket WHERE email_address = ? AND purchase_date >= (SELECT DATEADD(month,-6,SELECT CURDATE()))', 
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
    sql.query('SELECT SUM(sold_price) FROM Ticket WHERE email_address = ? AND purchase_date >= ? AND purchase_date <= ?', 
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

Ticket.viewFlightRatings = (result) => {
    sql.query('SELECT flight_number, AVG(rating), email_address, rating, comment FROM Ticket NATURAL JOIN Reviews GROUP BY flight_number', (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Flight Ratings: " + res);
        result(null,res);
    });
};

Ticket.pastYearSold = (airline_name, result) => {
    sql.query('SELECT COUNT(*) FROM Ticket WHERE airline_name = ? AND purchase_date >= (SELECT DATEADD(year,-1,SELECT CURDATE()))', 
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

Ticket.lastSixMonthsSold = (airline_name, result) => {
    sql.query('SELECT COUNT(*) FROM Ticket WHERE airline_name = ? AND purchase_date >= (SELECT DATEADD(month,-6,SELECT CURDATE()))', 
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

Ticket.rangeSold = (airline_name, dateA, dateB,result) => {
    sql.query('SELECT COUNT(*) FROM Ticket WHERE airline_name = ? AND purchase_date >= ? AND purchase_date <= ?', 
    [email_address, dateA, dateB], (err,res) => {
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
    sql.query('SELECT travel_class, SUM(sold_price) FROM Ticket WHERE airline_name = ? AND purchase_date >= (SELECT DATEADD(year,-1,SELECT CURDATE())) GROUP BY travel_class', 
    [airline_name], (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Total Sold Travel Class Past Year: " + res);
        result(null,res);
    });
};

module.exports = { Ticket };

//Still have to do 7,11




