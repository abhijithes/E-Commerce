import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";

export default function SignUp({ handleAuthType }) {
    const API_URL = "http://localhost:2000/api";
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        setUserData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const onSubmit = async (event) => {
        console.log(userData);
        event.preventDefault();
        if (userData.password !== userData.Confirmpassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (res.ok) {
                alert("account created Successfully!");
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/products");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="sign-up-in">
            <p>Create a new account</p>
            <form action="" method="POST">
                <input className="component" onChange={handleChange} type="text" name="name" placeholder="Name" />
                <input className="component" onChange={handleChange} type="email" name="email" placeholder="E-Mail" />
                <input
                    className="component"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <input
                    className="component"
                    type="password"
                    name="Confirmpassword"
                    onChange={handleChange}
                    placeholder="Confirm password"
                />
            </form>
            <button onClick={onSubmit}>Create Account</button>
            <p>
                Already have an account? <a onClick={handleAuthType}>Login</a>
            </p>
        </div>
    );
}
