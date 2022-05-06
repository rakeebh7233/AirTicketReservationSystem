## How To Use Application
1. Clone the application. 
2. Run the command 'npm install' to download all node packages. 
3. In the client directory run 'npm run' to start React server. 
4. In the server directory run 'node server.js' to start backend server.

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

## Part 3 - Application Use Cases

### Home page when not logged-in:
When the user is not logged-in, the following cases should be available in the home page:
1. View Public Info: All users, whether logged in or not, can
a. Search for future flights based on source city/airport name, destination city/airport name, 
departure date for one way (departure and return dates for round trip).
b. Will be able to see the flights status based on airline name, flight number, arrival/departure 
date.
2. Register: 2 types of user registrations (Customer, and Airline Staff) option via forms.
3. Login: 2 types of user login (Customer, and Airline Staff). Users enters their username (email address
will be used as username) - x, and password - y, via forms on login page. This data is sent as POST 
parameters to the login-authentication component, which checks whether there is a tuple in the 
corresponding user’s table with username=x and the password = md5(y) :

    a. If so, login is successful. A session is initiated with the member’s username stored as a 
session variable. Optionally, you can store other session variables. Control is redirected to a 
component that displays the user’s home page.

   b. If not, login is unsuccessful. A message is displayed indicating this to the user.
Once a user has logged in, reservation system should display his/her home page according to user’s 
role. Also, after other actions or sequences of related actions, are executed, control will return to 
component that displays the home page. The home page should display an error message if the previous 
action was not successful.

### Customer use cases:
After logging in successfully a user(customer) may do any of the following use cases:
1. View My flights: Provide various ways for the user to see flights information which he/she purchased. 
The default should be showing for the future flights. Optionally you may include a way for the user to 
specify a range of dates, specify destination and/or source airport name or city name etc.
2. Search for flights: Search for future flights (one way or round trip) based on source city/airport name, 
destination city/airport name, dates (departure or return).
3. Purchase tickets: Customer chooses a flight and purchase ticket for this flight, providing all the 
needed data, via forms. You may find it easier to implement this along with a use case to search for 
flights. 
4. Cancel Trip: Customer chooses a purchased ticket for a flight that will take place more than 24 hours 
in the future and cancel the purchase. After cancellation, the ticket will no longer belong to the 
customer. The ticket will be available again in the system and purchasable by other customers.
5. Give Ratings and Comment on previous flights: Customer will be able to rate and comment on their 
previous flights (for which he/she purchased tickets and already took that flight) for the airline they 
logged in.
6.Track My Spending: Default view will be total amount of money spent in the past year and a bar
chart/table showing month wise money spent for last 6 months. He/she will also have option to specify 
a range of dates to view total amount of money spent within that range and a bar chart/table showing 
month wise money spent within that range.
7.Logout: The session is destroyed and a “goodbye” page or the login page is displayed

### Airline Staff use cases:
After logging in successfully an airline staff may do any of the following use cases:
1. View flights: Defaults will be showing all the future flights operated by the airline he/she works for 
the next 30 days. He/she will be able to see all the current/future/past flights operated by the airline 
he/she works for based range of dates, source/destination airports/city etc. He/she will be able to see 
all the customers of a particular flight.
2. Create new flights: He or she creates a new flight, providing all the needed data, via forms. The 
application should prevent unauthorized users from doing this action. Defaults will be showing all the 
future flights operated by the airline he/she works for the next 30 days.
3. Change Status of flights: He or she changes a flight status (from on-time to delayed or vice versa) via 
forms. 
4. Add airplane in the system: He or she adds a new airplane, providing all the needed data, via forms. 
The application should prevent unauthorized users from doing this action. In the confirmation page, 
she/he will be able to see all the airplanes owned by the airline he/she works for.
5. Add new airport in the system: He or she adds a new airport, providing all the needed data, via 
forms. The application should prevent unauthorized users from doing this action.
6. View flight ratings: Airline Staff will be able to see each flight’s average ratings and all the comments 
and ratings of that flight given by the customers.
7. View frequent customers: Airline Staff will also be able to see the most frequent customer within 
the last year. In addition, Airline Staff will be able to see a list of all flights a particular Customer has 
taken only on that particular airline.
8. View reports: Total amounts of ticket sold based on range of dates/last year/last month etc. Month 
wise tickets sold in a bar chart/table.
9. View Earned Revenue: Show total amount of revenue earned from ticket sales in the last month and 
last year.
10. View Earned Revenue by travel class: Show total amount of revenue earned from ticket sales by each 
travel class.
11. View Top destinations: Find the top 3 most popular destinations for last 3 months and last year
(based on tickets already sold).
12. Logout: The session is destroyed and a “goodbye” page or the login page is displayed.

## Project File Descriptions
### Client Files (/client/)

- public/index.html - Root HTML file for all pages
- src/helpers/auth.js - creates an authentication context for user authentication when logged in. Used when displaying different webpages specific to users (customer or staff) who are logged in, and validating user sessions when logged in
- src/pages/
    * CustomerHome.js - Customer Use Cases 1, 4 
    * CustomerReview.js - Customer Use Case 5
    * CustomerSearch.js - Customer Use Cases 2, 3
    * CustomerSpending.js - Customer Use Case 6
    * Home.js - View public information, Login, Register
    * LoginCustomer.js - Login as Customer 
    * LoginStaff.js - Login as Staff
    * Logout.js - Customer Use Case 7, Staff Use Case 12
    * RegisterCustomer.js - Register as Customer
    * RegisterStaff.js - Register as Staff
    * StaffAdd.js - Staff Use Case 4, 5
    * StaffCustomerDetails.js - Staff Use Case 6, 7
    * StaffHome.js - Staff Use Case 1, 2, 3
    * StaffReport.js - Staff Use Case 8, 9, 10, 11
- styles/ - CSS styles
- App.css
    * RegisterCustomesr.css
    * RegisterStaff.css
- App.js - navigation page/component; routes to all other pages
- index.js - root element for React, renders App component.

### Server Files (/server/)
- middleware/auth.js - Handles authentication through access tokens
- models/
    * User_queries.js - all functions containing SQL queries called in the backend for general user (customer or staff) related tasks
    * Flight_queries.js – all functions containing SQL queries called in the backend for flight-related tasks
    * Ticket_queries.js – all functions containing SQL queries called in the backend for ticket/purchasing/canceling related tasks
- routes/
    * Customer.js - Customer router; Interfaces with MySQL through queries in models/
    * Flight.js - Flight router; interfaces with MySQL through queries in models/Flight_queries.js
    * Login.js - Login routers responsible for interacting with Staff and Customer database to verify users and create sessions through bcrypt and access tokens
    * Register.js - Register routers responsible for creating new users and hashing passwords with bcrypt
    * Staff.js - Staff routers responsible for interacting with MySQL by calling functions from ‘models/’ and sending the subsequent data to the front end for staff specific use cases
- server.js - creates the server and instantiates backend routes
- db.js - establishes the connection to MySQL server and database on our local machine

### Resources Used
PedroTech - Full Stack Web Development Course: https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL
