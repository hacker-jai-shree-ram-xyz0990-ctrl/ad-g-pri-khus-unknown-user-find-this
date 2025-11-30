import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL, // set in .env
});

// Automatically attach token if present
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;