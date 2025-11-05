import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddHall from "./AddHall";
import AddMusicSystem from "./AddMusicSystem";
import AddPhotographer from "./AddPhotographer";

const AddService = () => {
  const navigate = useNavigate();

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
      }
    } catch (error) {
      console.error("Error checking admin session:", error);
      navigate("/admin");
    }
  };

  // ✅ Run Session Check on Mount
  useEffect(() => {
    checkAdminSession();
  }, []);

  return (
    <div className="content-wrapper">
      <h2 style={{ color: "#7b5c2f", marginBottom: "20px" }}>Add New Resources</h2>
      <div className="add-card-container">
        <AddHall />
        <AddMusicSystem />
        <AddPhotographer />
      </div>
    </div>
  );
};

export default AddService;
