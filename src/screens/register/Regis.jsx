// src/screens/register/Regis.jsx
import React from "react";
import Left from "./components/Left_Regis";
import Right from "./components/Right_Regis";
import "./regis.css";

const Regis = () => {
  return (
    <div className="login-page">
      <div className="main-content">
        <Left />
        <Right />
      </div>
    </div>
  );
};

export default Regis;
