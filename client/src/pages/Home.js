import '../styles/App.css';
import React from "react";
import axios from "axios"; 
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";


function Home() {

  const [listOfFlights, setListOfFlights] = useState([]);
  let { source_city, dest_city, dep_date } = useParams();
  let { al_name, flight_num, arr_date } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3001/flights/allFlights").then((response) => {
      setListOfFlights(response.data);
    });
  }, []);

  const searchFlight = () => {
    console.log("Search was clicked");
    axios.get(`http://localhost:3001/flights/searchFlights/${source_city}/${dest_city}/${dep_date}`).then((response) => {
      console.log(response.data);
      setListOfFlights(response.data);
      console.log(listOfFlights);
    });
  };

  const searchStatus = () => {
    console.log("Status was clicked");
    axios.get(`http://localhost:3001/flights/getStatus/${al_name}/${flight_num}/${dep_date}/${arr_date}`).then((response) => {
      console.log(response.data);
      setListOfFlights(response.data);
      console.log(listOfFlights);
    });
};

  return (
    <div className="App">

      <div className="searchFlightContainer">
        <h3>Search For Your Desired Flight</h3>
        <label>Departure Airport Code:</label>
        <input
          type="text"
          onChange={(event) => {
            source_city = event.target.value;
          }}
        />
        <label>Arrival Airport Code:</label>
        <input
          type="text"
          onChange={(event) => {
            dest_city = event.target.value;
          }}
        />
        <label>Departure Date:</label>
        <input
          type="text"
          onChange={(event) => {
            dep_date = event.target.value;
          }}
        />
        <button onClick={searchFlight}> SEARCH </button>
      </div>
      <br/><br/>
      <div className="getStatusContainer">
        <h3>Get Your Flight's Status</h3>
        <label>Airline Name:</label>
        <input
          type="text"
          onChange={(event) => {
            al_name = event.target.value;
          }}
        />
        <label>Flight Number:</label>
        <input
          type="text"
          onChange={(event) => {
            flight_num = event.target.value;
          }}
        />
        <label>Departure Date:</label>
        <input
          type="text"
          onChange={(event) => {
            dep_date = event.target.value;
          }}
        />
        <label>Arrival Date Date:</label>
        <input
          type="text"
          onChange={(event) => {
            arr_date = event.target.value;
          }}
        />
        <button onClick={searchStatus}> GET STATUS </button>
      </div>
      <br/><br/>
      
      <h3>All Flights</h3>
      <table class="table">
        <thead>
          <th>Airline Name</th>
          <th>Flight Num</th>
          <th>Departure Date</th>
          <th>Departure Time</th>
          <th>Departure Airport Code</th>
          <th>Arrival Date</th>
          <th>Arrival Time</th>
          <th>Arrival Airport Code</th>
          <th>Airplane ID</th>
          <th>Base Price</th>
          <th>Status</th>
        </thead>
        <tbody>
          {listOfFlights.map((value,key) => {
            return ( 
              <tr> 
                <td> {value.airline_name} </td> 
                <td> {value.flight_number} </td> 
                <td> {value.departure_date.substr(0,10)} </td> 
                <td> {value.departure_time} </td>
                <td> {value.departure_airport_code} </td>
                <td> {value.arrival_date.substr(0,10)} </td> 
                <td> {value.arrival_time} </td>
                <td> {value.arrival_airport_code} </td>
                <td> {value.airplane_id} </td>
                <td> {value.base_price} </td>
                <td> {value.status} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div> 
  ); 
}

export default Home;