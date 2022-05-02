import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";



function CustomerSpending() {
    const [yearSpent, setYearSpent] = useState([]);
    const [monthsSpent, setMonthsSpent] = useState([]);
    const [rangeState, setRangeState] = useState(false);
    let { start_date, end_date } = useParams();

    const user = localStorage.getItem("user");
    if (user!="customer") {
      window.location.replace('/')
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/customer/spendingLastYear`, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
              } else {
                setYearSpent(response.data);
              }
        });

        /*
        axios.get(`http://localhost:3001/customer/spendingLastSixMonths`, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
              } else {
                setMonthsSpent(response.data);
              }
        });

        setRangeState(false);
        */
       sixMonthSpending();
       setRangeState(false);

    }, []);

    const sixMonthSpending = () => {
        axios.get(`http://localhost:3001/customer/spendingLastSixMonths`, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
              } else {
                console.log("Six Month Data: " + response.data);
                setMonthsSpent(response.data);
              }
        });
    }

    const spendingRange = () => {
        axios.get(`http://localhost:3001/customer/spendingDateRange/${start_date}/${end_date}`,
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
            setMonthsSpent(response.data);
          }
        });
        setRangeState(true);
    };

    const sixMonthRange = () => {
        sixMonthSpending();
        setRangeState(false);
    };


    return(
        <div className="CustomerSpending">
            <h3 style={{'fontSize': '40px', 'marginBottom': '25px'}}>Track My Spending</h3>
            <p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Spending This Past Year</p>
            <table id="flightSpending" style={{'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tbody>
                {yearSpent.map((value,key) => {
                        return (
                            <tr>
                                <td>${value.totalSpent}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!rangeState ? (
                <><p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Spending These Past Six Months</p></>
            ) : (
                <><p style={{'fontSize': '25px', 'marginBottom': '20px'}}>Spending In Desired Range</p></>
            )}
            <table class="table">
                <thead>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Spending</th>
                </thead>
                <tbody>
                    {monthsSpent.map((value,key) => {
                        return (
                            <tr>
                                <td>{value.Month}</td>
                                <td>{value.Year}</td>
                                <td>${value.MonthlyTotal}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {!rangeState ? (
                <>
                    <div className="setRangeContainer">
                        <h3 style={{'fontSize': '25px', 'marginBottom': '2-px'}}>View Spending in Range</h3>
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
                        <button onClick={spendingRange}> SET RANGE </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="setSixMonthContainer">
                        <button onClick={sixMonthRange}> SIX-MONTH REPORT </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomerSpending;