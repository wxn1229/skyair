import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://immensely-pumped-chimp.ngrok-free.app", // 替換為你的 API 基本 URL
  // baseURL: "http://localhost:3004", // 替換為你的 API 基本 URL
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;
