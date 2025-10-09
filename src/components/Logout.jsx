import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/logout", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          // Notify Navbar
          window.dispatchEvent(new Event("authChange"));
          navigate("/login");
        } else {
          alert("Logout failed");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    };

    logoutUser();
  }, [navigate]);

  return null;
};

export default Logout;
