import axios from "axios"; // Import thư viện axios để thực hiện các yêu cầu HTTP

// Tạo một instance của axios với cấu hình mặc định
export const axiosInstance = axios.create({
  // Thiết lập baseURL dựa trên development hay production
  baseURL: import.meta.env.MODE === "development" ? "http://zalo-phake-alb-1855637264.ap-southeast-1.elb.amazonaws.com/api" : "/api",
  withCredentials: true, // Cho phép gửi cookie trong các yêu cầu
});