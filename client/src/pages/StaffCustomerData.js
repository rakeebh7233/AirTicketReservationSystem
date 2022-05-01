import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
//import { useParams, useNavigate } from "react-router-dom";


function StaffReview() {

    const[listOfFlights, setListOfFlights] = useState([]);
    const[mostFreqCustomer, setMostFreqCustomer] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3001/staff/ratings",
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
          //console.log(response.data)
        }
      });

      axios.get("http://localhost:3001/staff/frequentCustomer",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          console.log("test")
        } else {
          setMostFreqCustomer(response.data);
          console.log(response.data)
          console.log("test")
        }
      });
    }, []);

    return(
      <section>
        <div className="StaffReview">
          <h3>Flight Reviews:</h3>
          {listOfFlights.map((value,key) => {
          return ( 
            <div className="flight" key={key}> 
              <div className = "flight_num"> {value.flight_number} </div> 
              <div className = "avg_rating"> {value.avg_rating} </div> 
              <div className = "email_address"> {value.email_address} </div>
              <div className = "rating"> {value.rating} </div>
              <div className = "comment"> {value.comment} </div> 
            </div>
          );
        })}
        </div>

        <div className="freqCustomer">
          <h3>Most Frequent Customer</h3>
          {mostFreqCustomer.map((value,key) => {
          return ( 
            <div className="flight" key={key}> 
              <div>{value.name}</div>
              <div>{value.email_address}</div>
            </div>
          );
        })}
        </div>
      </section>
    );
}

export default StaffReview;