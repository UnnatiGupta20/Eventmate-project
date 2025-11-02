import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
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
        <NavLink to="/logout" className="logout-btn">
          Logout
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
