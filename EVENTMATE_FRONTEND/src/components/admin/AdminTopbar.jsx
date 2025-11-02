import React from "react";

const AdminTopbar = ({ title }) => {
  return (
    <div className="admin-topbar">
      <h1>{title}</h1>
      <div className="admin-profile">
        <span className="admin-name">Admin</span>
      </div>
    </div>
  );
};

export default AdminTopbar;
