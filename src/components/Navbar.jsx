import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);

  // Get logged-in user from localStorage
  

  return (
    <nav>
      <div className="logo">
        EventMate
        
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          <Link to="/services" onClick={() => setShow(false)}>SERVICES</Link>
          <Link to="/about" onClick={() => setShow(false)}>ABOUT</Link>
          <Link to="/contact" onClick={() => setShow(false)}>CONTACT</Link>
          <Link to="/login" onClick={() => setShow(false)}>Login</Link>
          <Link to="/signup" onClick={() => setShow(false)}>Signup</Link>
          <Link to="/logout" onClick={() => setShow(false)}>Logout</Link>
        </div>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
