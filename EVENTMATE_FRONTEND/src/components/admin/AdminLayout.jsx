import React, { useEffect,useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import axios from "axios";
// import AdminDashboard from "./AdminDashboard";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const verifySession=async()=>{
      try{
        const res=await axios.get("http://localhost:8080/admin/getsession",{
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data!=="null"){
          setTimeout(()=>setReady(true),100);
        }else{
          navigate("/admin");
        }
      }catch(error){
        console.log("AdminLayout file",error);
         navigate("/admin");
      }
    };
    // const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    // if (!isLoggedIn) {
    //   navigate("/admin/login");
    // } else {
    //   // Force reflow fix
    //   setTimeout(() => setReady(true), 100);
    // }
    verifySession();
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
          {/* <AdminDashboard/> */}
        </div>
      </main>
    </div>
  );
};




export default AdminLayout;

// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import "./Admin.css";
// import AdminSidebar from "./AdminSidebar";
// import AdminTopbar from "./AdminTopbar";
// import axios from "axios";

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const verifySession = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/admin/getsession", {
//           withCredentials: true,
//         });
//         console.log("Session Active:", res.data);

//         // ✅ if response is OK, mark ready
//         setTimeout(() => setReady(true), 100);
//       } catch (error) {
//         // 🔥 if session expired or unauthorized, redirect to login
//         if (error.response && error.response.status === 401) {
//           console.log("Session expired. Redirecting to login...");
//         } else {
//           console.log("Error verifying session:", error);
//         }
//         navigate("/admin");
//       }
//     };

//     verifySession();
//   }, [navigate]);

//   const getTitle = () => {
//     if (location.pathname.includes("dashboard")) return "Dashboard Overview";
//     if (location.pathname.includes("users")) return "Manage Users";
//     if (location.pathname.includes("events")) return "Manage Events";
//     if (location.pathname.includes("feedbacks")) return "User Feedbacks";
//     if (location.pathname.includes("addservice")) return "Add New Hall";
//     return "Admin Panel";
//   };

//   if (!ready) return null; // prevents flicker

//   return (
//     <div className="admin-layout">
//       <AdminSidebar />
//       <main className="admin-main">
//         <AdminTopbar title={getTitle()} />
//         <div className="admin-content">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;
