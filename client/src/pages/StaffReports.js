import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";



function StaffReports() {

    const [yearSold, setYearSold] = useState([]);
    const [monthSold, setMonthSold] = useState([]);
    const [rangeSold, setRangeSold] = useState([]);
    const [classRevenue, setClassRevenue] = useState([]);
    const [rangeState, setRangeState] = useState(false);
    let { start_date, end_date } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:3001/staff/sold/year`, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
              } else {
                setYearSold(response.data);
              }
        });

       lastMonthSold();
       travelClassRevenue();
       setRangeState(false);

    }, []);

    const lastMonthSold = () => {
        axios.get(`http://localhost:3001/staff/sold/month`, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
              } else {
                console.log("Month Data: " + response.data);
                setMonthSold(response.data);
              }
        });
    }

    const soldRange = () => {
        axios.get(`http://localhost:3001/staff/sold/range/${start_date}/${end_date}`,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log("Range Data: " + response.data);
            setRangeSold(response.data);
          }
        });
        setRangeState(true);
    };

    const travelClassRevenue = () => {
        axios.get(`http://localhost:3001/staff/sold/class`,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log("Travel Class Data: " + response.data);
            setClassRevenue(response.data);
          }
        });
    };

    const NewRange = () => {
        //lastMonthSold();
        setRangeState(false);
    };


    return(
        <div className="Staff Reports">
            <h3 style={{'fontSize': '40px', 'marginBottom': '25px'}}>Track Ticket Sales</h3>
            <br/>
            <p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Yearly Report</p>
            <table id="ticketSales" style={{'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <thead>
                    <tr>
                    <th>Tickets Sold</th>
                    <th>Ticket Revenue</th>
                    </tr>
                </thead>
                <tbody>
                {yearSold.map((value,key) => {
                        return (
                            <tr>
                                <td>{value.totalSold}</td>
                                <td>${value.totalRevenue}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br/>
            <p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Monthly Report</p>
            <table id="ticketSales" style={{'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
            <thead>
                <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Ticket Sales</th>
                <th>Ticket Revenue</th>
                </tr>
            </thead>
            <tbody>
                {monthSold.map((value,key) => {
                    return (
                        <tr>
                            <td>{value.month}</td>
                            <td>{value.year}</td>
                            <td>{value.totalSold}</td>
                            <td>${value.totalRevenue}</td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <br/>
            {!rangeState ? (
                <>
                    <div className="setRangeContainer">
                        <h3 style={{'fontSize': '25px', 'marginBottom': '2-px'}}>View Sales Report in Range: </h3>
                        <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        onChange={(event) => {
                            start_date = event.target.value;
                        }}
                        />---
                        <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        onChange={(event) => {
                            end_date = event.target.value;
                        }}
                        /><br/>
                        <button onClick={soldRange}> SET RANGE </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="displayRangeContainer">
                        <p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Ticket Sales In Desired Range</p>
                        <table id="flightSpending" style={{'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                        <thead>
                            <tr>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Ticket Sales</th>
                            <th>Ticket Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rangeSold.map((value,key) => {
                                return (
                                    <tr>
                                        <td>{value.month}</td>
                                        <td>{value.year}</td>
                                        <td>{value.totalSold}</td>
                                        <td>${value.totalRevenue}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        </table>
                        <button onClick={NewRange}> SET NEW RANGE </button>
                    </div>
                </>
            )}
            <br/>
            <p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Revenue by Travel Class</p>
            <table id="ticketSales" style={{'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
            <thead>
                <tr>
                <th>Travel Class</th>
                <th>Ticket Revenue</th>
                </tr>
            </thead>
            <tbody>
                {classRevenue.map((value,key) => {
                    return (
                        <tr>
                            <td>{value.travel_class.toUpperCase()}</td>
                            <td>${value.classRev}</td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
};

export default StaffReports;