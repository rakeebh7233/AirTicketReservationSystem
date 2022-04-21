import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
//Switch was replaced by Routes
import Home from './pages/Home';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterStaff from './pages/RegisterStaff';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/register/customer">Customer Registration</Link>
          <Link to="/register/staff">Staff Registration</Link>
        </div>
        //<Home />
        <Routes> 
          <Route path="/" element={<Home/>} />
          <Route path="/register/customer" element={<RegisterCustomer/>} />
          <Route path="/register/staff" element={<RegisterStaff/>} />
        </Routes>
      </Router>
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