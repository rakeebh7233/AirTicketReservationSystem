import '../styles/Home.css';
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

      {listOfFlights.map((value,key) => {
        return ( 
          <div className="flight"> 
            <div className = "airline_name"> {value.airline_name} </div> 
            <div className = "flight_num"> {value.flight_number} </div> 
            <div className = "departure"> {value.departure_date} </div> 
            <div className = "departure"> {value.departure_time} </div>
            <div className = "departure"> {value.departure_airport_code} </div>
            <div className = "arrival"> {value.arrival_date} </div> 
            <div className = "arrival"> {value.arrival_time} </div>
            <div className = "arrival"> {value.arrival_airport_code} </div>
            <div className = "airplane_id"> {value.airplane_id} </div>
            <div className = "base_price"> {value.base_price} </div>
            <div classname = "status"> {value.status} </div>
          </div>
        );
      })}
    </div> 
  ); 
}

export default Home;