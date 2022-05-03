# Air Ticket Reservation System
The course project for this semester is online Air Ticket Reservation System. There will be two types of  users of this system – Customers, and Airline Staff (Administrator). Using this system, customers can  search for flights (one way or round trip), purchase flights ticket, view their future flight status or see  their past flights etc. Airline Staff will add new airplanes, create new flights, and update flight status. In  general, this will be a simple air ticket reservation system.

## Project Description
There are several airports (Airport), each consisting of a unique code, a name, a city, a country, and an
airport type (domestic/international/both).

There are several airlines (Airline), each with a unique name. Each airline owns several airplanes. An 
airplane (Airplane) consists of the airline that owns it, a unique identification number within that airline, and the number of seats on the airplane, a manufacturing company of that airplane, age of the airplane.

Each airline operates flights (Flight), which consist of the airline operating the flight, a flight number, 
departure airport, departure date and time, arrival airport, arrival date and time, a base price, and the 
identification number of the airplane for the flight. Each flight is identifiable using flight number and 
departure date and time together within that airline.

A ticket (Ticket) can be purchased for a flight by a customer, and will consist of the customer’s email 
address, travel class (it could be either first class, business class, or economy class), the airline name, the 
flight number, sold_price (may be different from base price of the flight), payment information 
(including card type - credit/debit, card number, name on card, expiration date), purchase date and 
time. Each ticket will have a ticket ID number which is unique in this System.

Anyone (including users not signed in) can see flights (future flights) based on the source airport, 
destination airport, source city, or destination city, departure date for one way (departure and return
dates for round trip). Additionally, anyone can see the status (delayed, on time, or canceled) of the
flight based on an airline and flight number combination and arrival or departure time.


**There are two types of users for this system: Customer, and Airline Staff.**
### Customer:
Each Customer has a name, email, password, address (composite attribute consisting of 
building_number, street, city, state), phone_number, passport_number, passport_expiration, 
passport_country, and date_of_birth. Each Customer’s email is unique, and they will sign into the 
system using their email address and password.

Customers must be logged in to purchase a flight ticket.

Customers can purchase a ticket for a flight as long as there is still room on the plane. This is based on 
the number of tickets already booked for the flight and the seating capacity of the airplane assigned to 
the flight and customer needs to pay the associated price for that flight. Ticket price of a flight will be 
determined based on two factors – minimum/base price as set by the airline and additional price which 
will depend on demand of that flight. If 75% of the capacities is already booked/reserved for that flight, 
extra 25% will be added with the minimum/base price. Customer can buy tickets using either credit card 
or debit card. We want to store card information (card number and expiration date and name on the 
card but not the security code) along with purchased date, time. 

Customer will be able to see their future flights or previous flights taken for the airline they logged in.

Customer will be able to rate and comment on their previous flights taken for the airline they logged in.

### Airline Staff:
Each Airline Staff has a unique username, a password, a first name, a last name, a date of birth, may 
have more than one phone number, and the airline name that they work for. One Airline Staff only
works for one airline.

Airline Staff will be able to add new airplanes into the system for the airline they work for.

Airline Staff will set flight statuses in the system. 

Each Airline Staff can create new flights only for the particular airline that they work for by inserting all 
necessary information and will set the ticket base price for flight. They will also be able to see all on-
time, future, and previous flights for the airline that they work for, as well as a list of passengers for the flights.

In addition, Airline Staff will be able to see a list of all flights a particular Customer has taken only on that particular airline.

Airline Staff will be able to see each flight’s average ratings and all the comments and ratings of that 
flight given by the customers.

Airline Staff will also be able to see the most frequent customer within the last year, see the number of 
tickets sold each month, see the total amount of revenue earned etc.

Airline Staff can query for how many flights get delayed/on-time etc

## Part 1 - ER Model
![Capture](https://user-images.githubusercontent.com/67334348/164604590-37eedc47-92fd-4b33-890b-16ae3f63da75.PNG)

## Part 2 - Relational Model
![Capture](https://user-images.githubusercontent.com/67334348/164604718-f7c19cf4-7b74-4275-a035-756d534af7a3.PNG)

### Resources Used
PedroTech - Full Stack Web Development Course: https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL
