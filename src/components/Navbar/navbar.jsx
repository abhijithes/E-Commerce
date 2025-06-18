import React, { useState } from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState();

  return (
    <nav className="main">
      <div className="eluxo-logo">
        <h2 id="eluxo-logo">Eluxo</h2>
      </div>
      <div className="links">
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/" className="links">
          Category
        </Link>
        <Link to="/" className="links">
          About Us
        </Link>
        <Link to="/" className="links">
          Blog
        </Link>
      </div>
      <div className="icons">
        <div className="user" onClick={()=> setShowDropdown(!showDropdown)}>
          <PersonIcon style={{ fontSize: "30px", cursor: "pointer" }} /><KeyboardArrowDownIcon style={{ fontSize: "28px", cursor: "pointer", fontWeight:"100" }}/>
         { showDropdown && <div className="dropdown-menu">
            <Link to="/auth" state={{ mode : 'login'}} className="authbtn">Login</Link>
            <Link to="/auth" state={{ mode : 'signup'}} className="authbtn">Sign-Up</Link>
          </div>}
        </div>
        <ShoppingBagIcon />
      </div>
    </nav>
  );
}
