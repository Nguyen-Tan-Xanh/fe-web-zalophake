import { create } from "zustand"; // Import thư viện zustand để tạo store
import { axiosInstance } from "../lib/axios.js"; // Import instance axios để thực hiện các yêu cầu HTTP
import toast from "react-hot-toast"; // Import thư viện thông báo
import { io } from "socket.io-client"; // Import thư viện socket.io để kết nối WebSocket

const BASE_URL = import.meta.env.MODE === "development" ? "http://zalo-phake-alb-1855637264.ap-southeast-1.elb.amazonaws.com/api" : "/"; // Địa chỉ cơ sở cho socket

// Tạo store sử dụng zustand
export const useAuthStore = create((set, get) => ({
  authUser: null, // Thông tin người dùng đã xác thực
  isSigningUp: false, // Trạng thái đăng ký
  isLoggingIn: false, // Trạng thái đăng nhập
  isUpdatingProfile: false, // Trạng thái cập nhật profile
  isCheckingAuth: true, // Trạng thái kiểm tra xác thực
  onlineUsers: [], // Danh sách người dùng trực tuyến
  socket: null, // Kết nối socket

  // Hàm kiểm tra xác thực người dùng
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); // Gửi yêu cầu kiểm tra xác thực
      set({ authUser: res.data }); // Cập nhật thông tin người dùng
      get().connectSocket(); // Kết nối socket
    } catch (error) {
      console.log("Error in checkAuth:", error); // Ghi log lỗi
      set({ authUser: null }); // Đặt lại thông tin người dùng
    } finally {
      set({ isCheckingAuth: false }); // Cập nhật trạng thái kiểm tra xác thực
    }
  },

  // Hàm đăng ký người dùng
  signup: async (data) => {
    set({ isSigningUp: true }); // Đặt trạng thái đăng ký
    try {
      const res = await axiosInstance.post("/auth/signup", data); // Gửi yêu cầu đăng ký
      set({ authUser: res.data }); // Cập nhật thông tin người dùng
      toast.success("Account created successfully"); // Hiển thị thông báo thành công
      get().connectSocket(); // Kết nối socket
    } catch (error) {
      toast.error(error.response.data.message); // Hiển thị thông báo lỗi
    } finally {
      set({ isSigningUp: false }); // Đặt lại trạng thái đăng ký
    }
  },

  // Hàm đăng nhập người dùng
  login: async (data) => {
    set({ isLoggingIn: true }); // Đặt trạng thái đăng nhập
    try {
      const res = await axiosInstance.post("/auth/login", data); // Gửi yêu cầu đăng nhập
      set({ authUser: res.data }); // Cập nhật thông tin người dùng
      toast.success("Logged in successfully"); // Hiển thị thông báo thành công
      get().connectSocket(); // Kết nối socket
    } catch (error) {
      toast.error("Login failed. Please try again."); // Hiển thị thông báo lỗi
    } finally {
      set({ isLoggingIn: false }); // Đặt lại trạng thái đăng nhập
    }
  },

  // Hàm đăng xuất người dùng
  logout: async () => {
    try {
      //await axiosInstance.post("/auth/logout"); // Gửi yêu cầu đăng xuất
      set({ authUser: null }); // Đặt lại thông tin người dùng
      toast.success("Logged out successfully"); // Hiển thị thông báo thành công
      get().disconnectSocket(); // Ngắt kết nối socket
    } catch (error) {
      toast.error(error.response.data.message); // Hiển thị thông báo lỗi
    }
  },

  // Hàm cập nhật thông tin profile người dùng
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true }); // Đặt trạng thái cập nhật profile
    try {
      const res = await axiosInstance.put("/auth/update-profile", data); // Gửi yêu cầu cập nhật profile
      set({ authUser: res.data }); // Cập nhật thông tin người dùng
      toast.success("Profile updated successfully"); // Hiển thị thông báo thành công
    } catch (error) {
      console.log("error in update profile:", error); // Ghi log lỗi
      toast.error(error.response.data.message); // Hiển thị thông báo lỗi
    } finally {
      set({ isUpdatingProfile: false }); // Đặt lại trạng thái cập nhật profile
    }
  },

  // Hàm kết nối socket
  connectSocket: () => {
    const { authUser } = get(); // Lấy thông tin người dùng
    if (!authUser || get().socket?.connected) return; // Nếu không có người dùng hoặc socket đã kết nối thì thoát

    const socket = io(BASE_URL, { // Tạo kết nối socket
      query: {
        userId: authUser._id, // Gửi ID người dùng
      },
    });
    socket.connect(); // Kết nối socket

    set({ socket: socket }); // Cập nhật socket vào store

    socket.on("getOnlineUsers", (userIds) => { // Lắng nghe sự kiện nhận danh sách người dùng trực tuyến
      set({ onlineUsers: userIds }); // Cập nhật danh sách người dùng trực tuyến
    });
  },

  // Hàm ngắt kết nối socket
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect(); // Ngắt kết nối nếu socket đang kết nối
  },
}));