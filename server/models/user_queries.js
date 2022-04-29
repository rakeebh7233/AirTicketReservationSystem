const sql = require('../db');

const Customer = function createCustomer(customer) {
    let result = {};
    result.email_address = customer.email_address;
    result.password = customer.password;
    result.name = customer.name;
    result.building_number = customer.building_number;
    result.street = customer.street;
    result.city = customer.city;
    result.state = customer.state;
    result.phone_number = customer.phone_number;
    result.passport_number = customer.passport_number;
    result.passport_expiration = customer.passport_expiration;
    result.passport_country = customer.passport_country;
    result.date_of_birth = customer.date_of_birth;
    return result;
}

const Staff = function createStaff(staff) {
    let result = {}
    result.username = staff.username;
    result.password = staff.password;
    result.airline_name = staff.airline_name;
    result.fname = staff.fname;
    result.lname = staff.lname;
    return result
}

Customer.getCustomerInfo = (customer_email, result) => {
    sql.query('SELECT * FROM Customer WHERE email_address=?', customer_email, (err,res) => {
        if (err) {
            console.log("Error: ", err);
            result(null,err);
            return;
        }
        //console.log("Customer: " + res);
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
        //console.log("Airline Staff: " + res);
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
                //result(null,err);
                return;
            }
            console.log("Inserted Customer: " + res);
            //result(null,res);
        });
};

Staff.insertStaff = (staff, result) => {
    sql.query('INSERT INTO airline_staff VALUES (?, ?, ?, ?, ?)', 
        [staff.username, staff.password, staff.airline_name, staff.fname, staff.lname], (err,res) => {
            if (err) {
                console.log("Error: ", err);
                //result(null,err);
                return;
            }
            console.log("Inserted Airline Staff: " + res);
            //result(null,res);
        });
};

module.exports = { Customer, Staff }
