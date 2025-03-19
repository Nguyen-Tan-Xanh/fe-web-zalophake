import axios from "axios"; // Import thư viện axios để thực hiện các yêu cầu HTTP

// Tạo một instance của axios với cấu hình mặc định
export const axiosInstance = axios.create({
  // Thiết lập baseURL dựa trên chế độ phát triển hay sản xuất
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true, // Cho phép gửi cookie trong các yêu cầu
});