import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Load user only when logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "null") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

    const authListener = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser && updatedUser !== "null" ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("authChange", authListener);
    return () => window.removeEventListener("authChange", authListener);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <nav>
      <div className="logo">EventMate</div>

      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="/" onClick={() => setShow(false)}>Home</Link>
          <Link to="/services" onClick={() => setShow(false)}>Services</Link>
          <Link to="/about" onClick={() => setShow(false)}>About</Link>
          <Link to="/contact" onClick={() => setShow(false)}>Contact</Link>

          {user ? (
            <div className="user-dropdown">
              <div
                className="user-info"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Hello, <strong>{user.name}</strong> <FaChevronDown className="down-icon" />
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => { setDropdownOpen(false); navigate("/myaccount"); }}>My Account</button>
                  <button onClick={() => { setDropdownOpen(false); navigate("/dashboard"); }}>Dashboard</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" onClick={() => setShow(false)} className="login-btn">
              Login
            </Link>
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
