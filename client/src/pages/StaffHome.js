import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { Formik, Form, Field, ErrorMessage } from "formik";


function StaffHome() {
  const [listOfFlights, setListOfFlights] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/staff/viewAirlineFlights`,
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

  const onSubmit = (data) => {
    console.log(data)
    axios.post("http://localhost:3001/staff/createFlight", data, 
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }
    ).then((response)=> {
      console.log("Data will be inserted into flight table")
    })
  }

  const initialValues = {
    airline_name: null,
    flight_number: null,
    departure_date: null,
    departure_time: null,
    departure_airport_code: null,
    arrival_date: null,
    arrival_time: null,
    arrival_airport_code: null,
    airplane_id: null,
    base_price: null,
    status: null
  }
  
  return (
    <section className="staffHome">
      <div className="staffViewFlights">
        <h3>View Flights</h3>
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
      <h3>Create New Flight</h3>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="createFlight">
          <label>Airline Name:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="airline_name" 
          />
          <label>Flight Number:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="flight_number" 
          />
          <label>Departure Date:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="departure_date" 
          />
          <label>Departure Time:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="departure_time" 
          />
          <label>Departure Airport Code:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="departure_airport_code" 
          />
          <label>Arrival Date:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="arrival_date" 
          />
          <label>Arrival Time:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="arrival_time" 
          />
          <label>Arrival Airport Code:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="arrival_airport_code" 
          />
          <label>Airplane ID:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="airplane_id" 
          />
          <label>Base Price:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="base_price" 
          />
          <label>Status:</label>
          <Field 
              autocomplete="off"
              id="inputCreateFlight" 
              name="status" 
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </section>
  )
}

export default StaffHome;