const sql = require('../db');

const Customer = function createCustomer(customer) {
    this.email_address = customer.email_address;
    this.password = customer.password;
    this.name = customer.name;
    this.building_number = customer.building_number;
    this.street = customer.street;
    this.city = customer.city;
    this.state = customer.state;
    this.phone_number = customer.phone_number;
    this.passport_number = customer.passport_number;
    this.passport_expiration = customer.passport_expiration;
    this.passport_country = customer.passport_country;
    this.date_of_birth = customer.date_of_birth;
}

const Staff = function createStaff(staff) {
    this.username = staff.username;
    this.password = staff.password;
    this.airline_name = staff.airline_name;
    this.fname = staff.fname;
    this.lname = staff.lname;
}

Customer.getCustomerInfo = (customer_email, result) => {
    sql.query('SELECT * FROM Customer WHERE email_address=?', customer_email, (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Customer: " + res);
        result(null,res);
    });
};

Staff.getStaffInfo = (staff_username, result) => {
    sql.query('SELECT * FROM Airline_Staff WHERE username=?', staff_username, (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        console.log("Airline Staff: " + res);
        result(null,res);
    });
};

Customer.insertCustomer = (customer, result) => {
    sql.query('INSERT INTO CUSTOMER VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [customer.email_address, customer.password, customer.name, customer.building_number, customer.street, 
        customer.city, customer.state, customer.phone_number, customer.passport_number, customer.passport_expiration,
        customer.passport_country, customer.date_of_birth], (err,res) => {
            if (err) {
                console.log("Error: ", err);
                result(null,err);
                return;
            }
            console.log("Inserted Customer: " + res);
            result(null,res);
        });
};

Staff.insertStaff = (staff, result) => {
    sql.query('INSERT INTO CUSTOMER VALUES (?, ?, ?, ?, ?)', 
        [staff.username, staff.password, staff.airline_name, staff.fname, staff.lname], (err,res) => {
            if (err) {
                console.log("Error: ", err);
                result(null,err);
                return;
            }
            console.log("Inserted Airline Staff: " + res);
            result(null,res);
        });
};

module.exports = { Customer, Staff }
