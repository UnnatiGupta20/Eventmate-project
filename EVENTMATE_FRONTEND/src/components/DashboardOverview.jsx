import React, { useEffect, useState } from "react";
import Chatbot from "./Chatbot";

import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const [user, setUser] = useState({ name: "Guest", profilePic: "/default-profile.png" });
  const [showChatbot, setShowChatbot] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [hallName, setHallName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setUser(JSON.parse(storedProfile));
    }
  }, []);

  const stats = { upcoming: 2 };

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
          src={user.profilePic || "/default-profile.png"}
          alt="Profile"
          className="profile-pic"
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

      {/* ✅ Chatbot Dialog */}
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

      {/* ✅ Rating Dialog Box */}
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
