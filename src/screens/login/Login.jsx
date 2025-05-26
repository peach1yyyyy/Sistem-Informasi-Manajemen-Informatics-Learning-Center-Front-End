// src/screens/login/Login.jsx
import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="main-content">
        <Left />
        <Right />
      </div>
    </div>
  );
};

export default Login;
