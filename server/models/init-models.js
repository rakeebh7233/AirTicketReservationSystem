var DataTypes = require("sequelize").DataTypes;
var _airline = require("./airline");
var _airline_staff = require("./airline_staff");
var _airplane = require("./airplane");
var _airport = require("./airport");
var _customer = require("./customer");
var _flight = require("./flight");
var _phone_number = require("./phone_number");
var _reviews = require("./reviews");
var _ticket = require("./ticket");

function initModels(sequelize) {
  var airline = _airline(sequelize, DataTypes);
  var airline_staff = _airline_staff(sequelize, DataTypes);
  var airplane = _airplane(sequelize, DataTypes);
  var airport = _airport(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var flight = _flight(sequelize, DataTypes);
  var phone_number = _phone_number(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);

  airline_staff.belongsTo(airline, { as: "airline_name_airline", foreignKey: "airline_name"});
  airline.hasMany(airline_staff, { as: "airline_staffs", foreignKey: "airline_name"});
  airplane.belongsTo(airline, { as: "airline_name_airline", foreignKey: "airline_name"});
  airline.hasMany(airplane, { as: "airplanes", foreignKey: "airline_name"});
  flight.belongsTo(airline, { as: "airline_name_airline", foreignKey: "airline_name"});
  airline.hasMany(flight, { as: "flights", foreignKey: "airline_name"});
  phone_number.belongsTo(airline_staff, { as: "username_airline_staff", foreignKey: "username"});
  airline_staff.hasMany(phone_number, { as: "phone_numbers", foreignKey: "username"});
  flight.belongsTo(airplane, { as: "airplane", foreignKey: "airplane_id"});
  airplane.hasMany(flight, { as: "flights", foreignKey: "airplane_id"});
  flight.belongsTo(airport, { as: "departure_airport_code_airport", foreignKey: "departure_airport_code"});
  airport.hasMany(flight, { as: "flights", foreignKey: "departure_airport_code"});
  flight.belongsTo(airport, { as: "arrival_airport_code_airport", foreignKey: "arrival_airport_code"});
  airport.hasMany(flight, { as: "arrival_airport_code_flights", foreignKey: "arrival_airport_code"});
  reviews.belongsTo(customer, { as: "email_address_customer", foreignKey: "email_address"});
  customer.hasMany(reviews, { as: "reviews", foreignKey: "email_address"});
  ticket.belongsTo(customer, { as: "email_address_customer", foreignKey: "email_address"});
  customer.hasMany(ticket, { as: "tickets", foreignKey: "email_address"});
  ticket.belongsTo(flight, { as: "airline_name_flight", foreignKey: "airline_name"});
  flight.hasMany(ticket, { as: "tickets", foreignKey: "airline_name"});
  ticket.belongsTo(flight, { as: "flight_number_flight", foreignKey: "flight_number"});
  flight.hasMany(ticket, { as: "flight_number_tickets", foreignKey: "flight_number"});
  ticket.belongsTo(flight, { as: "departure_date_flight", foreignKey: "departure_date"});
  flight.hasMany(ticket, { as: "departure_date_tickets", foreignKey: "departure_date"});
  ticket.belongsTo(flight, { as: "departure_time_flight", foreignKey: "departure_time"});
  flight.hasMany(ticket, { as: "departure_time_tickets", foreignKey: "departure_time"});
  reviews.belongsTo(ticket, { as: "ticket", foreignKey: "ticket_id"});
  ticket.hasMany(reviews, { as: "reviews", foreignKey: "ticket_id"});

  return {
    airline,
    airline_staff,
    airplane,
    airport,
    customer,
    flight,
    phone_number,
    reviews,
    ticket,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
