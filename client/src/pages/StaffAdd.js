import {React, useEffect, useState} from "react";
import axios from "axios";

function StaffAdd() {
    const [listOfFAirplanes, setListOfAirplanes] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/staff/airplanesOwned`,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setListOfAirplanes(response.data);
          }
        });
      }, []);

    let airplane_id, airline_name, num_seats, manufacturing_company, age;
    const airplaneSubmit = (event) => {
        event.preventDefault();
        const data = {airplane_id, airline_name, num_seats, manufacturing_company, age};
        axios.post("http://localhost:3001/staff/addAirplane", data, 
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        ).then((response)=> {
            console.log("Data will be added into airplane table");
            window.location.reload(false);
        });
    }

    let airport_code, name,city, country, airport_type;
    const airportSubmit = (event) => { 
        event.preventDefault();
        const data = {airport_code, name,city, country, airport_type};
        axios.post("http://localhost:3001/staff/addAirport", data, 
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        ).then((response)=> {
            console.log("Data will be added into airplane table");
            window.location.reload(false);
        });
    }

    return (
        <section>
            <div className="staffViewAirplanes"> 
                <h3>View Owned Airplanes</h3>
                {listOfFAirplanes.map(airplane => {
                    return (
                        <div className="airplane">
                            <div>{airplane.airplane_id}</div>
                            <div>{airplane.airline_name}</div>
                            <div>{airplane.num_seats}</div>
                            <div>{airplane.manufacturing_company}</div>
                            <div>{airplane.age}</div>
                        </div>
                    )
                })}
            </div>
            <div id="addAirplaneContainer">
                <h3>Add Airplane</h3>
                <form onSubmit={airplaneSubmit}>
                    <label>Airplane ID: </label>
                    <input type="text" onChange={(e)=>airplane_id=e.target.value}/>
                    <label>Number of Seats: </label>
                    <input type="text" onChange={(e)=>num_seats=e.target.value} />
                    <label>Manufactoring Company: </label>
                    <input type="text" onChange={(e)=>manufacturing_company=e.target.value} />
                    <label>Age: </label>
                    <input type="text" onChange={(e)=>age=e.target.value} />
                    <input type="submit"></input>
                </form>
            </div>
            <div id="addAirportContainter">
                <h3>Add Airport</h3>
                <form onSubmit={airportSubmit}>
                    <label>Airport Code Name: </label>
                    <input type="text" onChange={(e)=>airport_code=e.target.value}/>
                    <label>Name: </label>
                    <input type="text" onChange={(e)=>name=e.target.value} />
                    <label>City: </label>
                    <input type="text" onChange={(e)=>city=e.target.value} />
                    <label>Country: </label>
                    <input type="text" onChange={(e)=>country=e.target.value} />
                    <label>Airport Type: </label>
                    <input type="text" onChange={(e)=>airport_type=e.target.value} />
                    <input type="submit"></input>
                </form>
            </div>
        </section>
    )
}

export default StaffAdd;
