import React, { useState } from "react";
import axios from "axios";

function LoginCustomer() {

  const [email_address, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { email_address: email_address, password: password };
    axios.post("http://localhost:3001/login/customer", data).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div className="loginContainer">
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
    </div>
  );
}

export default LoginCustomer;