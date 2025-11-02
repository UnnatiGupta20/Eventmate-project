import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/admin", // give backend team this base; change later
  // optional: timeout: 5000
});

// attach token automatically if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem("admin_token"); // backend should return this on login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;