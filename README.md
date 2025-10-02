# ✈️ Air Ticket Reservation System
An online platform for booking and managing flight reservations. The system supports two types of users: **Customers** and **Airline Staff (Administrators)**.
* **Customers** can search flights, purchase tickets, view future/past flights, cancel trips, track spending, and review flights.
* **Airline Staff** can manage airplanes, flights, airports, and track operational reports such as revenue, delays, and customer statistics.

This project was built as a course project for **CS3083: Introduction to Databases (Spring 2022)**

## 🚀 Features
### Customer Features
* Search flights (one-way or round trip) by city, airport, and date.
* Purchase tickets securely with credit/debit card.
* View flight history (upcoming and past).
* Cancel trips (with refund rules if >24 hours before departure).
* Rate & review flights after traveling.
* Track spending with breakdowns by month or custom date range.

### Airline Staff Features
* Add and manage airplanes within the airline.
* Create new flights with schedules and base pricing.
* Update flight statuses (on-time, delayed, canceled).
* View passengers on flights.
* See flight ratings and reviews from customers.
* Analytics & Reports:
    * Monthly ticket sales
    * Revenue by travel class
    * Frequent customers
    * Top destinations

### Public Access (No Login Required)
* Search upcoming flights
* View flight statuses by airline, flight number, and time

## 🛠 Tech Stack
* **Frontend:** React (JavaScript)
* **Backend:** Node.js with Express
* **Database:** MySQL
* **Authentication:** Bcrypt + Access Tokens
* **Session Management:** JWT (JSON Web Tokens)

## 📂 Project Structure
**Client** (`/client/`)
* `public/index.html` – Root HTML file
* `src/pages/` – React pages for customers and staff
    * `CustomerHome.js` – View customer flights
    * `CustomerSearch.js` – Search & purchase flights
    * `CustomerReview.js` – Rate/review flights
    * `CustomerSpending.js` – Spending analytics
    * `StaffHome.js` – View airline flights
    * `StaffAdd.js` – Add airplanes/airports
    * `StaffReport.js` – Revenue and analytics reports
* `src/helpers/auth.js` – Authentication context
* `App.js` – Navigation and routes
* `index.js` – Entry point for React

**Server** (`/server`)
* `server.js` – Main server entry point
* `db.js` – Database connection setup
* `middleware/auth.js` – JWT-based authentication middleware
* `models/` – SQL query handlers
    * `User_queries.js`, Flight_queries.js`, Ticket_queries.js`
* `routes/` – API routes for each resource
    * `Customer.js`, `Staff.js`, `Flight.js`, `Login.js`, `Register.js`

## ⚙️ Installation & Setup
1. Clone the repository:
```
git clone <repo_url>
cd air-ticket-reservation
```
2. Install dependencies:
    * **Client** (React):
    ```
    cd client
    npm install
    npm start
    ```
    * **Server** (Node.js):
    ```
    cd server
    npm install
    node server.js
    ```
3. Database setup:
* Install MySQL and create a database.
* Run the schema from /server/models/ if provided.
* Update db.js with your MySQL credentials.

## ▶️ Usage Workflows
### Customer Workflow
```
Register/Login → Search Flights → Purchase Ticket → 
View Trips → Cancel Trip (if >24 hrs before departure) → 
Rate & Review Past Flights → Track Spending
```
### Airline Staff Workflow
```
Login → Add Airplanes/Airports → Create Flights → 
Update Flight Status → View Passengers → 
View Flight Ratings & Reviews → 
Generate Reports (Revenue, Popular Destinations, Delays)
```
Public Workflow
```
Search Flights (future only) → View Flight Status
```

##📊 Example Reports (Staff Dashboard)
* Revenue by Month
* Top 3 Destinations (last 3 months / year)
* Frequent Flyers
* Flight Delay Statistics

## 🙌 Acknowledgements
* Authors: **Rakeeb Hossain** & **Sunan Tajwar**
* PedroTech – Full Stack Web Development Course
* MySQL & React documentation
