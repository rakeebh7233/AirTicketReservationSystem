import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";

function CustomerHome() {

    const [listOfFlights, setListOfFlights] = useState([]);
    const [ticket_id, setTid] = useState("");
    let { source_city, dest_city, dateA, dateB } = useParams();

    const user = localStorage.getItem("user");
    if (user!="customer") {
      window.location.replace('/')
    }
    
    const genHome = () => {
      console.log("genHome called");
      axios.get("http://localhost:3001/customer/viewMyFlights",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setListOfFlights(response.data);
        }
      });
    }; 

    useEffect(() => {
      axios.get("http://localhost:3001/customer/viewMyFlights",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setListOfFlights(response.data);
        }
      });
    }, []);

    const searchFlight = () => {
      axios.get(`http://localhost:3001/customer/viewSearchedFlights/${source_city}/${dest_city}/${dateA}/${dateB}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setListOfFlights(response.data);
        }
      });
      document.getElementById('dac').value = "";
      document.getElementById('aac').value = "";
      document.getElementById('dateA').value = "";
      document.getElementById('dateB').value = "";
    };   
    
    const cancelFlight = (passed_ticket_id) => {
      console.log("Called cancelFlight, TicketID: " + passed_ticket_id);
      setTid(passed_ticket_id);
      const data = { ticket_id: ticket_id };
      axios.post('http://localhost:3001/customer/cancelTrip', data,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log('Data will be removed from ticket table');
          //window.location.reload(false);
          genHome();
        }
      })
    };

    return (
      <section className="CustomerHome">
        <div className="searchFlightContainer">
          <h3>Search For A Specific Upcoming Flight</h3>
          <label>Departure Airport Code:</label>
          <input
            id = "dac"
            type="text"
            onChange={(event) => {
              source_city = event.target.value;
            }}
          />
          <label>Arrival Airport Code:</label>
          <input
            id = "aac"
            type="text"
            onChange={(event) => {
              dest_city = event.target.value;
            }}
          />
          <label>Date Range:</label>
          <input
            id = "dateA"
            type="text"
            onChange={(event) => {
              dateA = event.target.value;
            }}
          />--- 
          <input 
            id = "dateB"
            type="text"
            onChange={(event) => {
              dateB = event.target.value;
            }}
          />
          <button onClick={searchFlight}> SEARCH </button>
        </div>

      <h3>Your Upcoming Flights:</h3>
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
                <td> <button onClick={() => { 
                  cancelFlight(value.ticket_id);}}>Cancel Flight</button> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section> 
  ); 
}

export default CustomerHome;