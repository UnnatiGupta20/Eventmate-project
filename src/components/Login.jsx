import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include", // required for sessions
      });

      if (!response.ok) {
        // if backend returned 401 or 500
        const errorText = await response.text();
        alert(errorText || "Login failed");
        return;
      }

      const data = await response.json(); // ✅ backend user object
      alert(`Welcome ${data.username}!`); // ✅ accessing object property

      // Save full object to localStorage
      localStorage.setItem("user", JSON.stringify(data));

      console.log("User ID:", data.id);
      console.log("User Email:", data.email);
      console.log("Full User Object:", data);

      navigate("/"); // go to homepage
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
