
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminCard from "./AdminCard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
  });

  // ✅ Check Admin Session
  const checkAdminSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/getsession", {
        method: "GET",
        credentials: "include", // include cookies
      });

      const data = await res.text();
      if (data !== "adminActive") {
        navigate("/admin"); // redirect to admin login if session not found
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking admin session:", error);
      navigate("/admin");
      return false;
    }
  };

  // ✅ Fetch Dashboard Stats
  const fetchStats = async () => {
    try {
      // Fetch total users count
      const userCount = await fetch("http://localhost:8080/user/count", {
        method: "GET",
        credentials: "include",
      });
      const totalUsers = await userCount.json();

      // Fetch total events count
      const eventsCount = await fetch("http://localhost:8080/event/count", {
        method: "GET",
        credentials: "include",
      });
      const totalEvents = await eventsCount.json();

      // Fetch upcoming events count
      const upcomingEventsCount = await fetch(
        "http://localhost:8080/event/upcomingcount",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const upcomingEvents = await upcomingEventsCount.json();

      setStats({ totalUsers, totalEvents, upcomingEvents });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  // ✅ Initialize Dashboard
  useEffect(() => {
    const initializeDashboard = async () => {
      const sessionValid = await checkAdminSession();
      if (sessionValid) {
        fetchStats();
      }
    };

    initializeDashboard();
  }, []);

  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>Dashboard</h2>

      <div className="cards" style={styles.cardsContainer}>
        <AdminCard title="Total Users" value={stats.totalUsers} />
        <AdminCard title="Total Events" value={stats.totalEvents} />
        <AdminCard title="Upcoming Events" value={stats.upcomingEvents} />
      </div>
    </div>
  );
};

const styles = {
  cardsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
};

export default AdminDashboard;
