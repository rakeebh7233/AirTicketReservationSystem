import React from "react";
import axios from "axios";
import { useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function CustomerSearch() {

    const [listOfFlights, setListOfFlights] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);
    const [purchaseState, setPurchaseState] = useState(false);
    const [airline_name, setAl] = useState("");
    const [flight_num, setFn] = useState("");
    const [departure_date, setDd] = useState("");
    const [departure_time, setDt] = useState("");
    const [base_price, setBp] = useState("");
    let { source_city, dest_city, dep_date, ret_date } = useParams();
    let history = useNavigate();
    
    const user = localStorage.getItem("user");
    if (user!="customer") {
      window.location.replace('/')
    }

    const searchFlight = () => {
        console.log(source_city + " " + dest_city + " " + dep_date + " " + ret_date);
        if (source_city === "" || dest_city === "" || dep_date === "") {
            alert("Please enter required fields. Only return date is optional!");
        }
        else {
            axios.get(`http://localhost:3001/flights/searchFutureFlights/${source_city}/${dest_city}/${dep_date}`,
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
            setReturnFlights([]);
            if (ret_date !== "") {
                console.log(ret_date);
                axios.get(`http://localhost:3001/flights/searchReturnFlights/${dest_city}/${source_city}/${dep_date}/${ret_date}`,
                {
                    headers: {
                    accessToken: localStorage.getItem("accessToken"),
                    },
                }
                ).then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    setReturnFlights(response.data);
                }
                });
            }
            document.getElementById('dac').value = "";
            document.getElementById('aac').value = "";
            document.getElementById('dd').value = "";
            document.getElementById('rd').value = "";
        }
    };

    const initialValues = {
        travel_class: null,
        card_type: null,
        card_number: null,
        card_expiration: null,
    };

    const onSubmit = (data) => {
        console.log(airline_name + " " + flight_num + " " + departure_date + " " + departure_time + " " + base_price);
        console.log(data);
        axios.post(`http://localhost:3001/customer/purchaseTicket/${airline_name}/${flight_num}/${departure_date}/${departure_time}/${base_price}`, data,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((response) => {
            console.log("Data will be inserted into ticket table")
            setPurchaseState(false);
            history('/customer/home');
        });
    };

    const validationSchema = Yup.object().shape({
        travel_class: Yup.string().max(20).required().typeError("Please select a travel class"),
        card_type: Yup.string().max(20).required().typeError("Please indicate if you are paying with debit/credit"),
        card_number: Yup.string().max(20).required().typeError("Valid Card Number Required"),
        card_expiration: Yup.string().max(20).required().typeError("Card Expiration Date Required"),
        name_on_card: Yup.string().max(30).required().typeError("Name on Card Required"),
    });


    return (
        <section className="CustomerSearch">
            {!purchaseState ? (
            <>
            <div className="searchFlightContainer">
                <h3>Search For Your Desired Flight</h3>
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
                <label>Departure Date:</label>
                <input
                id = "dd"
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(event) => {
                    dep_date = event.target.value;
                }}
                />
                <label>Return Date:</label>
                <input
                id = "rd"
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(event) => {
                    ret_date = event.target.value;
                }}
                />
                <button onClick={searchFlight}> SEARCH </button>
            </div>

            <h3>Departing Flights:</h3>
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
                        <td>
                            <button onClick={() => {
                                setAl(value.airline_name);
                                setFn(value.flight_number);
                                setDd(value.departure_date);
                                setDt(value.departure_time);
                                setBp(value.base_price);
                                setPurchaseState(true);
                            }}>Purchase</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            <h3>Return Flights:</h3>
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
                {returnFlights.map((value,key) => {
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
                        <td>
                            <button onClick={() => {
                                setAl(value.airline_name);
                                setFn(value.flight_number);
                                setDd(value.departure_date);
                                setDt(value.departure_time);
                                setBp(value.base_price);
                                setPurchaseState(true);
                            }}>Purchase</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </>
            ) : (
                <>
                <div className="newTicket">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className="purchaseTicket">
                            <div>
                            <h3>Travel Preference: </h3>
                            <label>Travel Class: </label>
                                <ErrorMessage name="travel_class" component="span"/>
                                <Field 
                                    autocomplete="off"
                                    id="inputTicket" 
                                    name="travel_class" 
                                    placeholder="first/business/economy"
                                />
                            </div>
                            <div>
                            <h3>Payment Information:</h3>
                                <label>Card Type: </label>
                                <ErrorMessage name="card_type" component="span"/>
                                <Field 
                                    autocomplete="off"
                                    id="inputTicket" 
                                    name="card_type" 
                                    placeholder="debit/credit"
                                />
                                <label>Card Number: </label>
                                <ErrorMessage name="card_number" component="span"/>
                                <Field 
                                    autocomplete="off"
                                    id="inputTicket" 
                                    name="card_number" 
                                    placeholder=""
                                />
                                <label>Card Expiration Date: </label>
                                <ErrorMessage name="card_expiration" component="span"/>
                                <Field 
                                    autocomplete="off"
                                    id="inputTicket" 
                                    name="card_expiration" 
                                    placeholder="YYYY-MM-DD"
                                />
                                <label>Name on Card: </label>
                                <ErrorMessage name="name_on_card" component="span"/>
                                <Field 
                                    autocomplete="off"
                                    id="inputTicket" 
                                    name="name_on_card" 
                                    placeholder=""
                                />
                            </div>
                            {/* break */}
                            <div class="break"></div> 
                            <button type="submit">Confirm Purchase</button>
                        </Form>
                    </Formik>
                </div>
                </>
            )}

        </section>
    );
};

export default CustomerSearch;