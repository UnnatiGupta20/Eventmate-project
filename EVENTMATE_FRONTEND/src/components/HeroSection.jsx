import React, { useState, useEffect } from "react";
import TimelineSection from "./TimelineSection";
import Chatbot from "./Chatbot";
import Rating from "./Rating"

const HeroSection = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [user, setUser] = useState({ id: null, email: "", password: "", username: "" });
  const [hovered, setHovered] = useState(null);

  // ✅ Fetch logged-in user from session
  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/getSessionUser", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setUser({ id: null, email: "", password: "", username: "" });
        return;
      }

      const data = await res.json();
      if (data && data.username) {
        setUser({
          id: data.id,
          email: data.email || "",
          password: data.password || "",
          username: data.username || "",
        });
      }
    } catch (err) {
      console.error("Error checking session:", err);
    }
  };

  // Fetch session user when Edit Profile is clicked
  useEffect(() => {
    if (activeView === "editProfile") {
      checkSession();
    }
  }, [activeView]);

  // ✅ Save changes (calls /users/signup)
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user), // include id for update
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Error: " + text);
        return;
      }

      const updatedUser = await res.json();
      setUser(updatedUser); // update frontend state
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // Styles (omitted here for brevity, same as before)
  const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: '"Nunito Sans", sans-serif',
    backgroundColor: "#fff7ea",
  },
  sidebar: {
    width: "220px",
    minWidth: "220px",
    backgroundColor: "#a2783a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    borderRight: "3px solid #fff",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
  },
  sidebarHeader: { marginBottom: "30px", fontSize: "22px" },
  sidebarList: { listStyle: "none", padding: 0, margin: 0, flex: 1 },
  sidebarListItem: {
    margin: "15px 0",
    cursor: "pointer",
    fontSize: "16px",
    padding: "8px",
    borderRadius: "5px",
    transition: "0.3s",
  },
  mainContent: {
    marginLeft: "220px",
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    width: "calc(100% - 220px)",
    position: "relative",
  },
  formContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },
  formGroup: { marginBottom: "15px" },
  label: { display: "block", fontWeight: 600, marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    background: "#a2783a",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: 600,
    fontSize: "14px",
  },
  dashboardText: { fontSize: "14px", opacity: 0.8 },
};


  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarHeader}>EventMate</h2>
        <ul style={styles.sidebarList}>
          {[
            // { id: "dashboard", label: "Dashboard" },
            { id: "timeline", label: "View Timeline" },
            { id: "rateVenues", label: "Rate Venues" },
            { id: "editProfile", label: "Edit Profile" },
          ].map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveView(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...styles.sidebarListItem,
                backgroundColor:
                  hovered === item.id || activeView === item.id ? "#8a642f" : "transparent",
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {activeView === "dashboard" && (
          <div>
            <h3>Welcome to EventMate Dashboard</h3>
            <p style={styles.dashboardText}>
              Choose an option from the left to manage events.
            </p>
          </div>
        )}

        {activeView === "timeline" && <TimelineSection />}
        {activeView === "rateVenues" && <Rating />}

        {/* {activeView === "rateVenues" && (
          <div>
            <h3>Rate Venues</h3>
            <p style={styles.dashboardText}>
              Here you can rate and review venues you’ve attended.
            </p>
            <button style={styles.button}>⭐ Rate Now</button>
          </div>
        )} */}

        {activeView === "editProfile" && (
          <div style={styles.formContainer}>
            <h3>Edit Profile</h3>
            {user && user.email ? (
              <form onSubmit={handleSaveChanges}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="text"
                    value={user.password}
                    onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Username</label>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
                    style={styles.input}
                  />
                </div>
                <button type="submit" style={styles.button}>💾 Save Changes</button>
              </form>
            ) : (
              <p style={styles.dashboardText}>
                ⚠️ No active session. Please log in to edit your profile.
              </p>
            )}
          </div>
        )}

        {/* Floating Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
};

export default HeroSection;
