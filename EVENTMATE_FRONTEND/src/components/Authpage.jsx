// import React, { useState } from "react";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     userFullName: "",
//     userEmail: "",
//     userPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isLogin) {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (
//         storedUser &&
//         storedUser.email === formData.email &&
//         storedUser.password === formData.password
//       ) {
//         alert("Login successful!");
//         window.dispatchEvent(new Event("authChange"));
//         window.location.href = "/";
//       } else {
//         alert("Invalid credentials or user not found!");
//       }
//     } else {
//       // Save new user data
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         })
//       );
//       alert("Signup successful! Please login.");
//       setIsLogin(true);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h2>{isLogin ? "Login" : "Signup"}</h2>

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           )}

//           <input
//             type="email"
//             name="userEmail"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">{isLogin ? "Login" : "Signup"}</button>
//         </form>

//         <div className="link">
//           {isLogin ? (
//             <p>
//               Don’t have an account?{" "}
//               <span
//                 onClick={() => setIsLogin(false)}
//                 style={{ color: "#a2783a", cursor: "pointer" }}
//               >
//                 Signup
//               </span>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{" "}
//               <span
//                 onClick={() => setIsLogin(true)}
//                 style={{ color: "#a2783a", cursor: "pointer" }}
//               >
//                 Login
//               </span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userFullName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN logic (for later if needed)
      try {
        const res = await axios.post("http://localhost:8080/user/login", formData, {
          withCredentials: true,
        });
        alert("Login Successful!");
        console.log("Response:", res.data);
        window.location.href = "/";
      } catch (error) {
        alert("Invalid credentials!");
        console.error(error);
      }
    } else {
      // ✅ SIGNUP logic
      try {
        const res = await axios.post("http://localhost:8080/user/save", formData, {
          withCredentials: true,
        });
        alert("Signup successful! Please login now.");
        console.log("Response:", res.data);
        setIsLogin(true);
      } catch (error) {
        alert("Signup failed. Try again!");
        console.error(error);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="userFullName"
              placeholder="Full Name"
              value={formData.userFullName}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>

        <div className="link">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                style={{ color: "#a2783a", cursor: "pointer" }}
              >
                Signup
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                style={{ color: "#a2783a", cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
