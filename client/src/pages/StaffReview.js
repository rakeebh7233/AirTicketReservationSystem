import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
//import { useParams, useNavigate } from "react-router-dom";


function StaffReview() {

    const[listOfFlights, setListOfFlights] = useState([]);

    useEffect(() => {
        console.log("function called");
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
          }
        });
      }, []);

    return(
        <div className="StaffReview">
            <h3>Flight Reviews:</h3>
            {console.log(listOfFlights)}
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
    );

}

export default StaffReview;