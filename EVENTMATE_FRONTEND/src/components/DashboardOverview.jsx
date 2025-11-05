


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Chatbot from "./Chatbot";
// import { useNavigate } from "react-router-dom";

// const DashboardOverview = () => {
//   const [user, setUser] = useState({
//     name: "Guest",
//     profilePic: "/default-profile.png",
//     id: null,
//   });
//   const [showChatbot, setShowChatbot] = useState(false);
//   const [showRatingDialog, setShowRatingDialog] = useState(false);
//   const [hallName, setHallName] = useState("");
//   const [rating, setRating] = useState(0);
//   const [message, setMessage] = useState("");
//   const [stats, setStats] = useState({ upcoming: 0 });
//   const navigate = useNavigate();

//   // ✅ Fetch user session from backend
//   useEffect(() => {
//     const fetchUserSession = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/user/getsession", {
//           withCredentials: true,
//         });

//         if (response.data && Object.keys(response.data).length > 0) {
//           const userData = response.data;
//           setUser({
//             name: userData.userFullName || "User",
//             profilePic: userData.userImageURL || "/default-profile.png",
//             id: userData.userId, // ✅ Store ID for next API call
//           });
//         } else {
//           navigate("/");
//         }
//       } catch (error) {
//         navigate("/");
//       }
//     };

//     fetchUserSession();
//   }, [navigate]);

//   // ✅ Fetch events using userId
//   useEffect(() => {
//     const fetchUserEvents = async () => {
//       if (user.id) {
//         try {
//           const response = await axios.get(`http://localhost:8080/event/get/${user.id}`);
//           const userEvents = response.data || [];
//            userEvents.forEach((event, index) => {
//           console.log(`Event ${index + 1}:`, event);
//         });

//           setStats({ upcoming: userEvents.length }); // count total events
//         } catch (error) {
//           console.error("Error fetching events:", error);
//         }
//       }
//     };

//     fetchUserEvents();
//   }, [user.id]);

//   // ✅ Handle Rating Submit
//   const handleRatingSubmit = (e) => {
//     e.preventDefault();
//     if (!hallName || rating === 0) {
//       alert("Please fill all fields before submitting!");
//       return;
//     }
//     setMessage(`✅ You rated "${hallName}" with ${rating} stars!`);
//     setShowRatingDialog(false);
//     setHallName("");
//     setRating(0);
//   };

//   return (
//     <div className="overview-container">
//       {/* Profile Section */}
//       <div className="profile-header">
//         <img
//           src={user.profilePic || "/default-profile.png"}
//           alt="Profile"
//           className="profile-pic"
//         />
//         <h2>Welcome, {user.name} 👋</h2>
//       </div>

//       {/* Overview Cards */}
//       <div className="overview-cards">
//         <div className="overview-card">
//           <h3>Upcoming Events</h3>
//           <p className="count">{stats.upcoming}</p>
//           <button className="view-btn" onClick={() => navigate("/mybookings")}>
//             View All
//           </button>
//         </div>

//         <div className="overview-card">
//           <h3>Use Chatbot</h3>
//           <p className="count">🤖</p>
//           <button className="view-btn" onClick={() => setShowChatbot(true)}>
//             Open Chat
//           </button>
//         </div>

//         <div className="overview-card">
//           <h3>Rate a Venue</h3>
//           <p className="count">⭐</p>
//           <button className="view-btn" onClick={() => setShowRatingDialog(true)}>
//             Rate Now
//           </button>
//         </div>
//       </div>

//       {/* Chatbot Dialog */}
//       {showChatbot && (
//         <div className="chatbot-dialog">
//           <div className="chatbot-dialog-content">
//             <div className="chatbot-dialog-header">
//               <span>EventMate Assistant</span>
//               <button className="close-btn" onClick={() => setShowChatbot(false)}>
//                 ✖
//               </button>
//             </div>
//             <Chatbot />
//           </div>
//         </div>
//       )}

//       {/* Rating Dialog */}
//       {showRatingDialog && (
//         <div className="chatbot-dialog">
//           <div className="chatbot-dialog-content">
//             <div className="chatbot-dialog-header">
//               <span>Rate a Venue</span>
//               <button className="close-btn" onClick={() => setShowRatingDialog(false)}>
//                 ✖
//               </button>
//             </div>

//             <div style={{ padding: "20px" }}>
//               <form onSubmit={handleRatingSubmit}>
//                 <label style={{ fontWeight: "600" }}>Hall Name:</label>
//                 <input
//                   type="text"
//                   value={hallName}
//                   onChange={(e) => setHallName(e.target.value)}
//                   placeholder="Enter hall name"
//                   style={{
//                     width: "100%",
//                     padding: "8px",
//                     margin: "8px 0 12px 0",
//                     borderRadius: "6px",
//                     border: "1px solid #a2783a",
//                   }}
//                 />

//                 <label style={{ fontWeight: "600" }}>Rating:</label>
//                 <div style={{ margin: "10px 0" }}>
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <span
//                       key={star}
//                       onClick={() => setRating(star)}
//                       style={{
//                         fontSize: "22px",
//                         cursor: "pointer",
//                         color: star <= rating ? "#a2783a" : "#ccc",
//                         marginRight: "5px",
//                       }}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>

//                 <button
//                   type="submit"
//                   className="view-btn"
//                   style={{ width: "100%", marginTop: "10px" }}
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {message && (
//         <p style={{ color: "green", marginTop: "15px", textAlign: "center" }}>{message}</p>
//       )}
//     </div>
//   );
// };

// export default DashboardOverview;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Chatbot from "./Chatbot";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const [user, setUser] = useState({
    name: "Guest",
    profilePic: "/default-profile.png",
    id: null,
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [hallName, setHallName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({ upcoming: 0 });
  const [imageError, setImageError] = useState(false); // ✅ Added for safe image rendering
  const navigate = useNavigate();

  // ✅ Fetch user session from backend
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getsession", {
          withCredentials: true,
        });

        const userData = response.data;

        if (userData && Object.keys(userData).length > 0) {
          setUser({
            name: userData.userFullName || "User",
            profilePic: userData.userImageURL || "/default-profile.png",
            id: userData.userId || null,
          });
          setImageError(false);
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        navigate("/auth");
      }
    };

    fetchUserSession();
  }, [navigate]);

  // ✅ Fetch events using userId
  useEffect(() => {
    const fetchUserEvents = async () => {
      if (user.id) {
        try {
          const response = await axios.get(`http://localhost:8080/event/get/${user.id}`);
          const userEvents = response.data || [];

          console.log("Fetched events:", userEvents);

          setStats({ upcoming: userEvents.length }); // count total events
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }
    };

    fetchUserEvents();
  }, [user.id]);

  // ✅ Handle Rating Submit
  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (!hallName || rating === 0) {
      alert("Please fill all fields before submitting!");
      return;
    }
    setMessage(`✅ You rated "${hallName}" with ${rating} stars!`);
    setShowRatingDialog(false);
    setHallName("");
    setRating(0);
  };

  return (
    <div className="overview-container">
      {/* Profile Section */}
      <div className="profile-header">
        <img
          src={imageError ? "/default-profile.png" : user.profilePic}
          alt="Profile"
          className="profile-pic"
          onError={() => setImageError(true)} // ✅ fallback for invalid URLs
        />
        <h2>Welcome, {user.name} 👋</h2>
      </div>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card">
          <h3>Upcoming Events</h3>
          <p className="count">{stats.upcoming}</p>
          <button className="view-btn" onClick={() => navigate("/mybookings")}>
            View All
          </button>
        </div>

        <div className="overview-card">
          <h3>Use Chatbot</h3>
          <p className="count">🤖</p>
          <button className="view-btn" onClick={() => setShowChatbot(true)}>
            Open Chat
          </button>
        </div>

        <div className="overview-card">
          <h3>Rate a Venue</h3>
          <p className="count">⭐</p>
          <button className="view-btn" onClick={() => setShowRatingDialog(true)}>
            Rate Now
          </button>
        </div>
      </div>

      {/* Chatbot Dialog */}
      {showChatbot && (
        <div className="chatbot-dialog">
          <div className="chatbot-dialog-content">
            <div className="chatbot-dialog-header">
              <span>EventMate Assistant</span>
              <button className="close-btn" onClick={() => setShowChatbot(false)}>
                ✖
              </button>
            </div>
            <Chatbot />
          </div>
        </div>
      )}

      {/* Rating Dialog */}
      {showRatingDialog && (
        <div className="chatbot-dialog">
          <div className="chatbot-dialog-content">
            <div className="chatbot-dialog-header">
              <span>Rate a Venue</span>
              <button className="close-btn" onClick={() => setShowRatingDialog(false)}>
                ✖
              </button>
            </div>

            <div style={{ padding: "20px" }}>
              <form onSubmit={handleRatingSubmit}>
                <label style={{ fontWeight: "600" }}>Hall Name:</label>
                <input
                  type="text"
                  value={hallName}
                  onChange={(e) => setHallName(e.target.value)}
                  placeholder="Enter hall name"
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "8px 0 12px 0",
                    borderRadius: "6px",
                    border: "1px solid #a2783a",
                  }}
                />

                <label style={{ fontWeight: "600" }}>Rating:</label>
                <div style={{ margin: "10px 0" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        color: star <= rating ? "#a2783a" : "#ccc",
                        marginRight: "5px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <button
                  type="submit"
                  className="view-btn"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {message && (
        <p style={{ color: "green", marginTop: "15px", textAlign: "center" }}>{message}</p>
      )}
    </div>
  );
};

export default DashboardOverview;

