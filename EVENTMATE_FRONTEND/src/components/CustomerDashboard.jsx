


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import DashboardOverview from "./DashboardOverview";
import MyBookings from "./MyBookings";
import EditProfile from "./EditProfile";
import Recommended from "./Recommended";
import Settings from "./Settings";
import AddEvent from "./AddEvent";
import CompleteProfile from "./CompleteProfile";

const CustomerDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  // ✅ Verify session on component load
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/getsession", {
          withCredentials: true,
        });

        if (!response.data || Object.keys(response.data).length === 0) {
          navigate("/"); // redirect if session invalid or empty
        }
      } catch (error) {
        navigate("/"); // redirect if request fails or 401 error
      }
    };

    verifySession();
  }, [navigate]);

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "bookings":
        return <MyBookings />;
      case "edit":
        return <CompleteProfile />;
      case "settings":
        return <Settings />;
      case "addevent":
        return <AddEvent />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">My Dashboard</div>

        <ul className="menu">
          <li
            className={activeSection === "overview" ? "active" : ""}
            onClick={() => setActiveSection("overview")}
          >
            <FaUser /> Overview
          </li>

          <li
            className={activeSection === "bookings" ? "active" : ""}
            onClick={() => setActiveSection("bookings")}
          >
            <FaCalendarAlt /> My Bookings
          </li>

          <li
            className={activeSection === "edit" ? "active" : ""}
            onClick={() => setActiveSection("edit")}
          >
            <FaEdit /> Edit Profile
          </li>

          <li
            className={activeSection === "settings" ? "active" : ""}
            onClick={() => setActiveSection("settings")}
          >
            <FaCog /> Settings
          </li>

          <li onClick={() => (window.location.href = "/")}>
            <FaSignOutAlt /> Back to Home
          </li>
        </ul>
      </aside>

      {/* Main Section */}
      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default CustomerDashboard;
