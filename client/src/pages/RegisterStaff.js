import React from 'react';
import axios from "axios"; 
//import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../styles/RegisterStaff.css';


function RegisterStaff() {

   // const [listOfStaff, setListOfStaff] = useState([]);

    const initialValues = {
        username: null,
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
        username: Yup.string().max(20).required("Required"),
        password: Yup.string().max(200).required("Required"),
        airline_name: Yup.string().max(30).required("Required"),
        fname: Yup.string().max(20).required("Required"),
        lname: Yup.string().max(20).required("Required"),
    });

    return (  
        <div className="registerStaffPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formRegisterStaff">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputRegisterStaff" 
                        name="username" 
                        placeholder=""
                    />
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputRegisterStaff" 
                        name="password" 
                        placeholder=""
                    />
                    <label>Airline Name: </label>
                    <ErrorMessage name="airline_name" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputRegisterStaff" 
                        name="airline_name" 
                        placeholder=""
                    />
                    <label>First Name: </label>
                    <ErrorMessage name="fname" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputRegisterStaff" 
                        name="fname" 
                        placeholder=""
                    />
                    <label>Last Name: </label>
                    <ErrorMessage name="lname" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputRegisterStaff" 
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