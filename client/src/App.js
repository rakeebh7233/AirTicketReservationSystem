import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from './pages/Home';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterStaff from './pages/RegisterStaff';
import LoginCustomer from './pages/LoginCustomer';
import LoginStaff from './pages/LoginStaff';
import CustomerHome from './pages/CustomerHome';
import CustomerSearch from './pages/CustomerSearch';
import CustomerReview from './pages/CustomerReview';
import {AuthContext} from "./helpers/AuthContext";
import { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom";
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);
  
  //const history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/login/auth", {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      }
    })
    .then((response) => {
      if (response.data.error) {
        setAuthState(false)
      } else {
        setAuthState(true)
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    //history('/');
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">Logo</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse " id="collapsibleNavbar">
                <ul class="navbar-nav">
                  <li class="nav-item ">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
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
                  <button onClick={logout}>Logout</button>
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
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )

}

export default App;







/*
function App() {
  const [listOfFlights, setListOfFlights] = useState([]); 
  useEffect(() => {
    axios.get("http://localhost:3001/flights").then((response) => {
      setListOfFlights(response.data); //testing for data response
    });
  }, []); 
  return (
    <div className="App"> 
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
export default App;
*/


/*
function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>App Component</h1>
      </div>
    </div>
  );
}
*/