import React, { useEffect } from "react";
import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function login({ handleAuthType }) {
  const API_URL = "http://localhost:2000/api";
  const navigate = useNavigate();
  const [enteredCred, setenteredCred] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setenteredCred((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = () => {
    fetch(`${API_URL}/user/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredCred),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.message === "success"){
          localStorage.setItem("user", JSON.stringify(res.user));
          alert("Login Successful");
          navigate("/products");
          window.location.reload();
        }
      });
    console.log(enteredCred, "EnteredCred");
  };

  return (
    <div className="sign-up-in">
      <p>Welcome back!</p>
      <input
        className="component"
        name="email"
        type="text"
        placeholder="Name"
        autoComplete="off"
        onChange={handleChange}
        defaultValue={""}
      />
      <input
        className="component"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={onSubmit}>Sign In</button>
      <p>
        Dont have an account? <a onClick={handleAuthType}>Sign-Up</a>
      </p>
    </div>
  );
}
