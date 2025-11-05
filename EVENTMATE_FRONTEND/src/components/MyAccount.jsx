// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// const MyAccount = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) {
//       navigate("/myaccount");
//     } else {
//       setUser(storedUser);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="account-page container">
//       <div className="account-box">
//         <h2>My Account</h2>

//         {user ? (
//           <>
//             <div className="account-details">
//               <div className="detail">
//                 <span>Name:</span> {user.name}
//               </div>
//               <div className="detail">
//                 <span>Email:</span> {user.email}
//               </div>
//               <div className="detail">
//                 <span>Password:</span> ********
//               </div>
//             </div>

//             <div className="account-buttons">
//               <button
//                 className="complete-profile"
//                 onClick={() => navigate("/complete-profile")}
//               >
//                 Complete your profile
//               </button>
              
//             </div>
//           </>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAccount;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch session data when page loads
  useEffect(() => {
    fetch("http://localhost:8080/user/getsession", {
      method: "GET",
      credentials: "include", // important for session cookies
    })
      .then((res) => {
        if (res.status === 401) {
          // No active session
          navigate("/auth");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .catch(() => navigate("/auth"));
  }, [navigate]);

  // Logout function (clears session)
  const handleLogout = () => {
    fetch("http://localhost:8080/user/logout", {
      method: "Get",
      credentials: "include",
    })
      .then(() => {
        setUser(null);
        navigate("/auth");
      })
      .catch((err) => console.error("Logout error:", err));
  };

  return (
    <div className="account-page container">
      <div className="account-box">
        <h2>My Account</h2>

        {user ? (
          <>
            <div className="account-details">
              <div className="detail">
                <span>UserId:</span> {user.userId}
              </div>
              <div className="detail">
                <span>Name:</span> {user.userFullName}
              </div>
              <div className="detail">
                <span>Email:</span> {user.userEmail}
              </div>
              {/* <div className="detail">
                <span>Password:</span> {user.userPassword}
              </div> */}
            </div>

            <div className="account-buttons">
              <button
                className="complete-profile"
                onClick={() => navigate("/complete-profile")}
              >
                Complete your profile
              </button>

              <button
                className="logout-btn"
                onClick={handleLogout}
                style={{
                  backgroundColor: "#d9534f",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                Logout
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
