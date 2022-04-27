import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";

function CustomerReview() {

    const [listOfFlights, setListOfFlights] = useState([]);
    const [reviewState, setReviewState] = useState(false);
    const [ticket_id, setTid] = useState("");
    let { rating, comment } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3001/customer/viewMyPreviousFlights",
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

    const submitReview = () => {
        const data = { ticket_id: ticket_id, rating: rating, comment: comment };
        axios.post('http://localhost:3001/customer/addReview', data,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log("data will be inserted into Reviews table");
            setReviewState(false);
          }
        });
      }; 

    return (
        <div className="CustomerReview">
            {!reviewState ? (
            <>
            <h3>Review Your Previous Flights:</h3>
            {listOfFlights.map((value,key) => {
            return ( 
                <div className="flight"> 
                <div className = "ticket_id"> {value.ticket_id} </div> 
                <div className = "flight_num"> {value.flight_number} </div> 
                <div className = "departure"> {value.departure_date} </div> 
                <div className = "departure"> {value.departure_time} </div>
                <div className = "travel_class"> {value.travel_class} </div>
                <div className = "sold_price"> {value.sold_price} </div> 
                <button onClick={() => {
                    setTid(value.ticket_id);
                    setReviewState(true);
                }}>Review</button>
                </div>
            );
            })}
            </>
            ) : (
                <div className="EnterReview">
                    <h3>Enter Your Review Here</h3>
                    <label>Rating:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                        rating = event.target.value;
                        }}
                    />
                    <label>Comment:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                        comment = event.target.value;
                        }}
                    />
                    <button onClick={submitReview}>Submit Review</button>
                </div>
            )}
        </div>
    );
};

export default CustomerReview;