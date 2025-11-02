import React, { useEffect,useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    } else {
      // Force reflow fix
      setTimeout(() => setReady(true), 100);
    }
  }, [navigate]);

  const getTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard Overview";
    if (location.pathname.includes("users")) return "Manage Users";
    if (location.pathname.includes("events")) return "Manage Events";
    if (location.pathname.includes("feedbacks")) return "User Feedbacks";
    if (location.pathname.includes("addservice")) return "Add New Hall";
    return "Admin Panel";
  };

  if (!ready) return null; // prevents flicker

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <AdminTopbar title={getTitle()} />
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};




export default AdminLayout;
