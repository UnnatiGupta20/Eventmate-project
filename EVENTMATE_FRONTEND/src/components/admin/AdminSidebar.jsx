import axios from "axios";
import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";

const AdminSidebar = () => {
  const navigate= useNavigate();
   const handleLogout = async () => {
    await axios.get("http://localhost:8080/admin/logout"); // call backend logout
    navigate("/admin"); // redirect after logout
  };
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">Admin Panel</h2>
      <nav className="admin-nav">
        <NavLink to="/admin/dashboard" className="admin-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/events" className="admin-link">
          Events
        </NavLink>
        <NavLink to="/admin/users" className="admin-link">
          Users
        </NavLink>
        <NavLink to="/admin/feedbacks" className="admin-link">
          Feedbacks
        </NavLink>
        <NavLink to="/admin/addservice" className="admin-link">
          Add Services
        </NavLink>
      </nav>
      <div className="admin-logout">
        <NavLink to="/admin" className="logout-btn" onClick={handleLogout}>
          
          Logout
        
        </NavLink>
        
      </div>
    </aside>
  );
};

export default AdminSidebar;
