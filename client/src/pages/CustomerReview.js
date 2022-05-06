import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";

function CustomerReview() {

    const [listOfFlights, setListOfFlights] = useState([]);
    const [reviewState, setReviewState] = useState(false);
    const [ticket_id, setTid] = useState("");
    let { rating, comment } = useParams();

    const user = localStorage.getItem("user");
    if (user!="customer") {
      window.location.replace('/')
    }

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
            alert("Your review has been submitted");
          }
        });
      }; 

    return (
        <section className="CustomerReview">
            {!reviewState ? (
            <>
            <h3>Review Your Previous Flights:</h3>
            <table class="table">
              <thead>
                <th>Ticket ID</th>
                <th>Flight Number</th>
                <th>Departure Date</th>
                <th>Departure Time</th>
                <th>Travel Class</th>
                <th>Sold Price</th>
              </thead>
              <tbody>
                {listOfFlights.map((value,key) => {
                  return ( 
                    <tr>
                      <td> {value.ticket_id} </td> 
                      <td> {value.flight_number} </td> 
                      <td> {value.departure_date.substring(0,10)} </td> 
                      <td> {value.departure_time} </td>
                      <td> {value.travel_class} </td>
                      <td> {value.sold_price} </td> 
                      <td>
                        <button onClick={() => {
                            setTid(value.ticket_id);
                            setReviewState(true);
                        }}>Review</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
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
        </section>
    );
};

export default CustomerReview;