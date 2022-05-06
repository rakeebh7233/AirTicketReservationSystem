import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"


function LoginCustomer() {

  const [email_address, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  const history = useNavigate();

  const login = () => {
    const data = { email_address: email_address, password: password };
    axios.post("http://localhost:3001/login/customer", data).then((response) => {
      if (response.data.error) alert(response.data.error);
      else {
        localStorage.setItem("accessToken", response.data);
        localStorage.setItem("user", "customer");
        setAuthState(true);
        history('/customer/home');
        window.location.reload(false);
      }
    });
  };
  return (
    <section className="loginContainer">
      <label>Email Address:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Login</button>
    </section>
  );
}

export default LoginCustomer;