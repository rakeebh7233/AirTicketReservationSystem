import React from 'react';
import { useNavigate } from "react-router-dom"
//Switch was replaced by Routes
import RegisterCustomer from './RegisterCustomer';
import RegisterStaff from './RegisterStaff';
//import { Nav }



function RegisterHome() {

    let navigate = useNavigate();
    function handleClickCustomer() {
        navigate(RegisterCustomer);
    }
    function handleClickStaff() {
        navigate(RegisterStaff);
    }

    return (
        <div className="RegisterHome">
            <button onClick={handleClickCustomer}>
                Register as Customer
            </button>
            <button onClick={handleClickStaff}>
                Register as Airline Staff
            </button>
        </div>  
    );

}

export default RegisterHome;

