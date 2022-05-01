import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import Home from './pages/Home';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterStaff from './pages/RegisterStaff';
import LoginCustomer from './pages/LoginCustomer';
import LoginStaff from './pages/LoginStaff';
import CustomerHome from './pages/CustomerHome';
import CustomerSearch from './pages/CustomerSearch';
import CustomerReview from './pages/CustomerReview';
import CustomerSpending from './pages/CustomerSpending';
import StaffHome from './pages/StaffHome';
import StaffAdd from './pages/StaffAdd';
import StaffCustomerData from './pages/StaffCustomerData';
import StaffReports from './pages/StaffReports';
import LogOut from './pages/Logout';
import {AuthContext} from "./helpers/AuthContext";
import { useState, useEffect } from "react"
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);
  const [customerState, setCustomerState] = useState(false);
  const [staffState, setStaffState] = useState(false);
  const history = useNavigate();

  useEffect(() => {

    axios.get("http://localhost:3001/login/auth", {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      }
    })
    .then((response) => {
      const user = localStorage.getItem('user');
      if (response.data.error) {
        setCustomerState(false);
        setAuthState(false)
      } else {
        setAuthState(true)
        if (user==="customer") {
          setCustomerState(true);
        } else {
          setCustomerState(false);
        }
        if (user=="staff") {
          setStaffState(true);
        } else {
          setStaffState(false);
        }
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuthState(false);
    setCustomerState(false);
    history('/');
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Logo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="collapsibleNavbar">
              <ul class="navbar-nav">
                {!customerState && !staffState && (
                  <li class="nav-item ">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                )}
                {customerState && (
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/customer/home">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/customer/search">Purchase Flights</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/customer/review">Review Flights</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/customer/spending">Spending History</a>
                    </li>
                  </ul>
                )}
                {staffState && (
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/staff/home">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/staff/add">Add Airplanes</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/staff/customer-data">Customer Data</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/staff/reports">Sales Report</a>
                    </li>
                  </ul>
                )}
              </ul>
              {!authState ?  (
                <>
                  <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown ">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Login</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/login/customer">Customer</a></li>
                        <li><a class="dropdown-item" href="/login/staff">Staff</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Register</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/register/customer">Customer</a></li>
                        <li><a class="dropdown-item" href="/register/staff">Staff</a></li>
                      </ul>
                    </li>
                  </ul>
                </>
              ) : ( 
                <ul class="navbar-nav ms-auto">
                  <a class="nav-link" href="/logout" onClick={logout}>Logout</a>
                </ul>
                // <button onClick={logout}>Logout</button>
              )}
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/customer" element={<LoginCustomer />} />
          <Route path="/login/staff" element={<LoginStaff />} />
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/register/staff" element={<RegisterStaff />} />
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/search" element={<CustomerSearch />} />
          <Route path="/customer/review" element={<CustomerReview />} />
          <Route path="/customer/spending" element={<CustomerSpending />} />
          <Route path="/staff/home" element={<StaffHome />} />
          <Route path="/staff/add" element={<StaffAdd />} />
          <Route path="/staff/customer-data" element={<StaffCustomerData />} />
          <Route path="/staff/reports" element={<StaffReports />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  )

}

export default App;
