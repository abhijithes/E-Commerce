import React, { useEffect, useState } from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState();
  const [loggined, setLoggined] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 620);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 620);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[])

  const isLoggined =()=>{
    let user = '';
    if(localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"))
    }
    if(user) setLoggined(true);
    console.log(user)
  }

  const logout =()=>{
    setLoggined(false);
    localStorage.removeItem("user");
  }
  useEffect(()=>{
    isLoggined();
  },[loggined])

  return (
    <nav className="main">
      <div className="eluxo-logo">
        <h2 id="eluxo-logo">Eluxo</h2>
      </div>
      <div className="links">
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/products" className="links">
          Products
        </Link>
        <Link to="/about" className="links">
          About Us
        </Link>
        { !isMobile && <Link to="/blog" className="links">
          Blog
        </Link> }
      </div>
      <div className="icons">
        { !loggined ? (<div className="user" onClick={()=> setShowDropdown(!showDropdown)}>
          <PersonIcon style={{ fontSize: "30px", cursor: "pointer"  }} className="person-icon" /><KeyboardArrowDownIcon style={{ fontSize: "28px", cursor: "pointer", fontWeight:"100" }}/>
         { showDropdown && <div className="dropdown-menu">
            <Link to="/auth" state={{ mode : 'login'}} className="authbtn">Login</Link>
            <Link to="/auth" state={{ mode : 'signup'}} className="authbtn">Sign-Up</Link>
          </div>}
        </div>) : (<LogoutIcon onClick={logout} className="nav-icon"/>)}
        <Link to="/cart"> <ShoppingBagIcon className="nav-icon"/></Link>
      </div>
    </nav>
  );
}
