import React, { useEffect, useState } from "react";
import AdminCard from "../../components/admin/AdminCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    // Simulate loading / fetching (even though it’s dummy)
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 42,
        totalEvents: 18,
        upcomingEvents: 5,
      });
    }, 500);

    return () => clearTimeout(timer);
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
