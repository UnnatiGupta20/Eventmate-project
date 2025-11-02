import React from "react";

const AdminCard = ({ title, value }) => (
  <div className="admin-card">
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default AdminCard;
