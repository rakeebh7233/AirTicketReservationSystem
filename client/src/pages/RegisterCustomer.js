import React from 'react';
import axios from "axios"; 
//import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function RegisterCustomer() {

    //const [listOfCustomers, setListOfCustomers] = useState([]);

    const intialValues = {
        email_address: null,
        password: null,
        name: null,
        phone_number: null, 
        date_of_birth: null,
        building_number: null,
        street: null,
        city: null,
        state: null, 
        passport_number: null,
        passport_expiration: null,
        passport_country: null,
    };

    const onSubmit = (data) => {
        axios.post("", data).then((response) => {
            console.log("Data will be inserted into customer table")
        });
    };

    const validationSchema = Yup.object().shape({
        email_address: Yup.string().email().max(30).required("Required"),
        password: Yup.string().max(200).required("Required"),
        name: Yup.string().max(30).required("Required"),
        phone_number: Yup.string().max(20).required("Required"), 
        date_of_birth: Yup.string().required("Required"),
        building_number: Yup.number().positive().integer().required("Required"),
        street: Yup.string().max(20).required("Required"),
        city: Yup.string().max(20).required("Required"),
        state: Yup.string().max(20).required("Required"), 
        passport_number: Yup.string().max(20).required("Required"),
        passport_expiration: Yup.string().required("Required"),
        passport_country: Yup.string().max(20).required("Required"),
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
                    <label>Name: </label>
                    <ErrorMessage name="name" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="name" 
                        placeholder=""
                    />
                    <label>Phone Number: </label>
                    <ErrorMessage name="phone_number" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="phone_number" 
                        placeholder="555-555-5555"
                    />
                    <label>Date of Birth: </label>
                    <ErrorMessage name="date_of_birth" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="date_of_birth" 
                        placeholder="YYYY-MM-DD"
                    />
                    <label>Address</label>
                    <label>Building Number: </label>
                    <ErrorMessage name="building_number" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="building_number" 
                        placeholder="YYYY-MM-DD"
                    />
                    <label>Street: </label>
                    <ErrorMessage name="street" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="street" 
                        placeholder=""
                    />
                    <label>City: </label>
                    <ErrorMessage name="city" component="em"/>
                    <Field
                        autocomplete="off" 
                        id="inputeRegisterCustomer" 
                        name="city" 
                        placeholder=""
                    />
                    <label>State: </label>
                    <ErrorMessage name="state" component="em"/>
                    <Field
                        autocomplete="off" 
                        id="inputeRegisterCustomer" 
                        name="state" 
                        placeholder=""
                    />
                    <label>Passport Information</label>
                    <label>Passport Number: </label>
                    <ErrorMessage name="passport_number" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="passport_number" 
                        placeholder=""
                    />
                    <label>Passport Expiration Date: </label>
                    <ErrorMessage name="passport_expiration" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="passport_expiration" 
                        placeholder="YYYY-MM-DD"
                    />
                    <label>Passport Country: </label>
                    <ErrorMessage name="passport_country" component="em"/>
                    <Field 
                        autocomplete="off"
                        id="inputeRegisterCustomer" 
                        name="passport_country" 
                        placeholder=""
                    />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>  
    );
}

export default RegisterCustomer;