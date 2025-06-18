import React, { useEffect } from "react";
import "./auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function login({ handleAuthType }) {
  const navigate = useNavigate();
  const [enteredCred, setenteredCred] = useState({
    email: "",
    password: "",
  });
  const [userCred, setUserCred] = useState({});

  const handleChange = (event) => {
    setenteredCred((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = () => {
      fetch(`http://localhost:3001/users?email=${enteredCred.email}`)
        .then((res)=> res.json())
        .then((res) => {
          if(res.length > 0)
           { setUserCred(res[0])
             console.log(res[0]);
           }
          else
            alert("No user Found")
        })
    console.log(userCred, "userCred");
  };

  const authCheck =()=>{
    if(userCred.password === enteredCred.password){
      alert("Login Successfull")
      navigate('')
    }else{
      alert("Wrong password!")
    }
  }
  useEffect(()=>{
    authCheck()
  },[userCred])
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
