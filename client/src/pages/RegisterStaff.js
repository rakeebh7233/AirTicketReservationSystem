import React from 'react';
import axios from "axios"; 
//import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function RegisterStaff() {

   // const [listOfStaff, setListOfStaff] = useState([]);

    const intialValues = {
        email_address: null,
        password: null,
        airline_name: null,
        fname: null, 
        lname: null,
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/register/staff", data).then((response) => {
            console.log("Data will be inserted into staff table")
        });
    };

    const validationSchema = Yup.object().shape({
        email_address: Yup.string().email().max(20).required("Required"),
        password: Yup.string().max(200).required("Required"),
        airline_name: Yup.string().max(30).required("Required"),
        fname: Yup.string().max(20).required("Required"),
        lname: Yup.string().max(20).required("Required"),
    });

    return (  
        <div className="registerCustomer">
            <Formik initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formRegisterCustomer">
                    <label>Email_Address: </label>
                    <ErrorMessage name="email_address" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="email_address" 
                        placeholder=""
                    />
                    <label>Password: </label>
                    <ErrorMessage name="password" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="password" 
                        placeholder=""
                    />
                    <label>Airline Name: </label>
                    <ErrorMessage name="airline_name" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="airline_name" 
                        placeholder=""
                    />
                    <label>First Name: </label>
                    <ErrorMessage name="fname" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="fname" 
                        placeholder=""
                    />
                    <label>Last Name: </label>
                    <ErrorMessage name="lname" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="lname" 
                        placeholder=""
                    />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>  
    );
}

export default RegisterStaff;