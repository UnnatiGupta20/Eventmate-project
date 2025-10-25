import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/getSessionUser", {
        method: "GET",
        credentials: "include", // ensures cookies/session are sent
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Invalid JSON from server:", err);
        setUser(null);
        return;
      }

      setUser(data && data.username ? data : null);
    } catch (err) {
      console.error("Network error:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession();

    // Listen to login/logout events
    const authListener = () => checkSession();
    window.addEventListener("authChange", authListener);
    return () => window.removeEventListener("authChange", authListener);
  }, []);

  return (
    <nav>
      <div className="logo">EventMate</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          {user && <span style={{ marginRight: "1rem", fontWeight: "bold" }}>Hi: {user.username}</span>}
          <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          <Link to="/services" onClick={() => setShow(false)}>SCHEDULE-AN-EVENT</Link>
          <Link to="/about" onClick={() => setShow(false)}>ABOUT</Link>
          <Link to="/contact" onClick={() => setShow(false)}>CONTACT</Link>

          {!user && (
            <>
              <Link to="/login" onClick={() => setShow(false)}>LOGIN</Link>
              <Link to="/signup" onClick={() => setShow(false)}>SIGNUP</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/logout" onClick={() => setShow(false)}>LOUOUT</Link>
            </>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;

