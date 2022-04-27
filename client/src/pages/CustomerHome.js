import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";


function CustomerHome() {

    const [listOfFlights, setListOfFlights] = useState([]);
    const [ticket_id, setTid] = useState("");
    let { source_city, dest_city, dateA, dateB } = useParams();

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
     genHome();
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
        }
      }).then(() => {
        genHome();
      });
    };

    return(
      <div className="CustomerHome">

        <div className="searchFlightContainer">
          <h3>Search For A Specific Upcoming Flight</h3>
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
          <label>Date Range:</label>
          <input
            type="text"
            onChange={(event) => {
              dateA = event.target.value;
            }}
          />--- 
          <input 
            type="text"
            onChange={(event) => {
              dateB = event.target.value;
            }}
          />
          <button onClick={searchFlight}> SEARCH </button>
        </div>

      <h3>Your Upcoming Flights:</h3>
        {console.log(listOfFlights)}
        {listOfFlights.map((value,key) => {
        return ( 
            <div className="flight" key={key}> 
            <div className = "airline_name"> {value.airline_name} </div> 
            <div className = "flight_num"> {value.flight_number} </div> 
            <div className = "departure"> {value.departure_date.substr(0,10)} </div> 
            <div className = "departure"> {value.departure_time} </div>
            <div className = "departure"> {value.departure_airport_code} </div>
            <div className = "arrival"> {value.arrival_date} </div> 
            <div className = "arrival"> {value.arrival_time} </div>
            <div className = "arrival"> {value.arrival_airport_code} </div>
            <div className = "airplane_id"> {value.airplane_id} </div>
            <div className = "base_price"> {value.base_price} </div>
            <div classname = "status"> {value.status} </div>
            <button onClick={() => {
              cancelFlight(value.ticket_id);
            }}>Cancel Flight</button>
            </div>
        );
        })}
    </div> 
    ); 
}


export default CustomerHome;