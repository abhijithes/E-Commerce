import React, { useEffect, useState } from "react";
import "./auth.css";
import SignUp from "../../components/auth/signUp";
import Login from "../../components/auth/login";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const [mode, setMode] = useState(location.state?.mode || "signup");
  useEffect(() => {
    setMode(location.state.mode);
  }, [location.state]);

  const handleAuthType = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <section className="auth-section">
      <div className="container">
        {mode === "login" ? 
          <Login handleAuthType={handleAuthType} /> : <SignUp handleAuthType={handleAuthType} />
        }
      </div>
    </section>
  );
}
