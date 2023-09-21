import axios from "axios";

const api = axios.create({
  baseURL: "https://papyrus-server.cyclic.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
