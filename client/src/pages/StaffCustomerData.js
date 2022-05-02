import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 


function StaffReview() {
    const[listOfFlights, setListOfFlights] = useState([]);
    const[mostFreqCustomer, setMostFreqCustomer] = useState([]);

    const user = localStorage.getItem("user");
    if (user!="staff") {
      window.location.replace('/')
    }

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
          <table class="table">
            <thead>
              <th>Flight Num</th>
              <th>Average Rating</th>
              <th>Email Adress</th>
              <th>Rating</th>
              <th>Comment</th>
            </thead>
            <tbody>
            {listOfFlights.map((value,key) => {
              return ( 
                <tr> 
                  <td> {value.flight_number} </td> 
                  <td> {value.avg_rating} </td> 
                  <td> {value.email_address} </td>
                  <td> {value.rating} </td>
                  <td> {value.comment} </td> 
                </tr>
              );
            })}
            </tbody>
          </table>
          
        </div>

        <div className="freqCustomer">
          <h3>Most Frequent Customer</h3>
          {mostFreqCustomer.map((value,key) => {
          return ( 
            <div className="flight" key={key}> 
              <p>Name: {value.name}</p>
              <p>Email Address: {value.email_address}</p>
            </div>
          );
        })}
        </div>
      </section>
    );
}

export default StaffReview;