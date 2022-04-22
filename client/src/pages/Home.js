import '../styles/Home.css';
import React from "react";
import axios from "axios"; 
import { useEffect, useState} from "react";


function Home() {

  const [listOfFlights, setListOfFlights] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3001/flights/allFlights').then((response) => {
      console.log(response);
      setListOfFlights(response); //testing for data response
    });
  }, []); 

  return (
    <div className="App"> 
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