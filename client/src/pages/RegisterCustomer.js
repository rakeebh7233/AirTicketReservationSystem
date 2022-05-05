import React from 'react';
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../styles/RegisterCustomer.css';


function RegisterCustomer() {

    const initialValues = {
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

    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/register/customer", data).then((response) => {
            if (response.data.error) alert(response.data.error);
            else {
                console.log("Data will be inserted into customer table");
                navigate("../login/customer");
            }
        });
    };

    const validationSchema = Yup.object().shape({
        email_address: Yup.string().email().max(30).required().typeError("Please enter a valid email address"),
        password: Yup.string('please create a strong password').max(200).required().typeError('please create a strong password'),
        name: Yup.string().max(30).required().typeError('Name Required'),
        phone_number: Yup.string().max(20).required().typeError('Valid Phone Number Required'), 
        date_of_birth: Yup.string().required().typeError('Please enter valid DOB in format YYYY-MM-DD'),
        building_number: Yup.number().positive().integer().required().typeError('Valid Building Number Required'),
        street: Yup.string().max(20).required().typeError('Street Required'),
        city: Yup.string().max(20).required().typeError('City Required'),
        state: Yup.string().max(20).required().typeError('State Required'), 
        passport_number: Yup.string().max(20).required().typeError('Passport Number Required'),
        passport_expiration: Yup.string().required().typeError('Passport Expiration required'),
        passport_country: Yup.string().max(20).required().typeError('Passport Country Required'),
    });

    return (  
        <div className="registerCustomerPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formRegisterCustomer">
                    <div>
                        <h3>General Info</h3>
                        <label>Email_Address: </label>
                        <ErrorMessage name="email_address" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="email_address" 
                            placeholder=""
                        />
                        <label>Password: </label>
                        <ErrorMessage name="password" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="password" 
                            type="password"
                            placeholder=""
                        />
                        <label>Name: </label>
                        <ErrorMessage name="name" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="name" 
                            placeholder=""
                        />
                        <label>Phone Number: </label>
                        <ErrorMessage name="phone_number" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="phone_number" 
                            placeholder="555-555-5555"
                        />
                        <label>Date of Birth: </label>
                        <ErrorMessage name="date_of_birth" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="date_of_birth" 
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                    <div>
                        <h3>Address</h3>
                        <label>Building Number: </label>
                        <ErrorMessage name="building_number" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="building_number" 
                            placeholder=""
                        />
                        <label>Street: </label>
                        <ErrorMessage name="street" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="street" 
                            placeholder=""
                        />
                        <label>City: </label>
                        <ErrorMessage name="city" component="span"/>
                        <Field
                            autocomplete="off" 
                            id="inputRegisterCustomer" 
                            name="city" 
                            placeholder=""
                        />
                        <label>State: </label>
                        <ErrorMessage name="state" component="span"/>
                        <Field
                            autocomplete="off" 
                            id="inputRegisterCustomer" 
                            name="state" 
                            placeholder=""
                        />
                    </div>
                    <div>
                        <h3>Passport Information</h3>
                        <label>Passport Number: </label>
                        <ErrorMessage name="passport_number" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="passport_number" 
                            placeholder=""
                        />
                        <label>Passport Expiration Date: </label>
                        <ErrorMessage name="passport_expiration" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="passport_expiration" 
                            placeholder="YYYY-MM-DD"
                        />
                        <label>Passport Country: </label>
                        <ErrorMessage name="passport_country" component="span"/>
                        <Field 
                            autocomplete="off"
                            id="inputRegisterCustomer" 
                            name="passport_country" 
                            placeholder=""
                        />
                    </div>
                    {/* break */}
                    <div class="break"></div> 
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>  
    );
}

export default RegisterCustomer;