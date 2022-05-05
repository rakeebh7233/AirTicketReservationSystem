import React from 'react';
import axios from "axios"; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import '../styles/RegisterStaff.css';


function RegisterStaff() {

    const initialValues = {
        username: null,
        password: null,
        airline_name: null,
        fname: null, 
        lname: null,
    };

    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/register/staff", data).then((response) => {
            console.log("here")
            if (response.data.error) { 
                alert(response.data.error);
            }
            else { 
                console.log("Data will be inserted into staff table");
                navigate("../login/staff");
            }
        });
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(20).required().typeError("Username Required"),
        password: Yup.string().max(200).required().typeError("Please create a strong password"),
        airline_name: Yup.string().max(30).required().typeError("Airline Name Required"),
        fname: Yup.string().max(20).required().typeError("First Name Required"),
        lname: Yup.string().max(20).required().typeError("Last Name Required"),
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
                        type="password"
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