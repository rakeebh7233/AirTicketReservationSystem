import './App.css';
import axios from "axios"; 
import { useEffect, useState} from "react";
//import { response } from 'express';


function App() {

  const [listOfFlights, setListOfFlights] = useState([]); 

  useEffect(() => {
    axios.get("http://localhost:3001/flights").then((response) => {
      setListOfFlights(response.data); //testing for data response
    });
  }, []); 

  return (
    <div className="App"> {listOfFlights.map((value,key) => {
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
        <div className = "price_status"> {value.base_price} </div>
        <div classname = "price_status"> {value.status} </div>
      </div>)
    })}</div>
  );

}


export default App;



/*
function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>App Component</h1>
      </div>
    </div>
  );
}
*/