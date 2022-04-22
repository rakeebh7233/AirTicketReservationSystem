import '../styles/Home.css';
import React from "react";
import axios from "axios"; 
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';


function Home() {

  const [listOfFlights, setListOfFlights] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/flights/allFlights").then((response) => {
      setListOfFlights(response.data);
    });
  }, []);

  const initialValues = {
    departure_airport_code: null,
    arrival_airport_code: null,
    departure_date: null,
  };

  const onSubmit = (data) => {
      axios.get("http://localhost:3001/flights/searchFlights").then((response) => {
        setListOfFlights(response.data);
      });
  };

  const validationSchema = Yup.object().shape({
      departure_airport_code: Yup.string().max(20).required("Required"),
      arrival_airport_code: Yup.string().max(20).required("Required"),
      departure_date: Yup.string("Must be in the form YYYY-MM-DD").max(20).required("Required"),
  });

  return (
    <div className="App"> 
      <div className="searchForFlightPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="formSearchFlight">
            <div>
              <h3>Search For Your Desired Flight</h3>
              <label>Departure Airport Code:</label>
              <ErrorMessage name="departure_airport_code" component="span"/>
              <Field 
              autocomplete="off"
              id="inputSearchFlight" 
              name="departure_airport_code" 
              placeholder="PVG"
              />
              <label>Arrival Airport Code:</label>
              <ErrorMessage name="arrival_airport_code" component="span"/>
              <Field 
              autocomplete="off"
              id="inputSearchFlight" 
              name="arrival_airport_code" 
              placeholder="JFK"
              />
              <label>Departure Date:</label>
              <ErrorMessage name="departure_date" component="span"/>
              <Field 
              autocomplete="off"
              id="inputSearchFlight" 
              name="departure_date" 
              placeholder="YYYY-MM-DD"
              />
            </div>
            <button type="submit">SEARCH</button>
          </Form>
        </Formik>
      </div>
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