// src/api/apiClient.js
import axios from "axios";

// Vite lee variables que empiezan con VITE_
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir token automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
