import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const MyAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/auth");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="account-page container">
      <div className="account-box">
        <h2>My Account</h2>

        {user ? (
          <>
            <div className="account-details">
              <div className="detail">
                <span>Name:</span> {user.name}
              </div>
              <div className="detail">
                <span>Email:</span> {user.email}
              </div>
              <div className="detail">
                <span>Password:</span> ********
              </div>
            </div>

            <div className="account-buttons">
              <button
                className="complete-profile"
                onClick={() => navigate("/complete-profile")}
              >
                Complete your profile
              </button>
              
            </div>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
