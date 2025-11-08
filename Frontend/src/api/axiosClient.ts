import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor request
axiosClient.interceptors.request.use(
  (config) => {
    // ví dụ: thêm token nếu có
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor response
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("❌ API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
