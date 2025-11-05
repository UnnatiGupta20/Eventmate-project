import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ adminEmail: "", adminPassword: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          adminEmail: formData.adminEmail,
          adminPassword: formData.adminPassword,
        }),
      });

      const result = await response.text();

      if (result === "Login Successful") {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="adminEmail"
            placeholder="Admin Email"
            value={formData.adminEmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="adminPassword"
            placeholder="Admin Password"
            value={formData.adminPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>

          {/* ✅ Home Button (Same Style, Below Login) */}
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ marginTop: "10px" }}
          >
            Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
