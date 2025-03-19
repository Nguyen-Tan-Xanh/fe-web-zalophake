import Navbar from "./components/Navbar"; // Import thành phần Navbar

import HomePage from "./pages/HomePage"; // Import trang chính
import SignUpPage from "./pages/SignUpPage"; // Import trang đăng ký
import LoginPage from "./pages/LoginPage"; // Import trang đăng nhập
import SettingsPage from "./pages/SettingsPage"; // Import trang cài đặt
import ProfilePage from "./pages/ProfilePage"; // Import trang hồ sơ

import { Routes, Route, Navigate } from "react-router-dom"; // Import các thành phần từ react-router-dom để quản lý điều hướng
import { useAuthStore } from "./store/useAuthStore"; // Import hook tùy chỉnh để quản lý xác thực
import { useThemeStore } from "./store/useThemeStore"; // Import hook tùy chỉnh để quản lý chủ đề
import { useEffect } from "react"; // Import hook useEffect từ React

import { Loader } from "lucide-react"; // Import biểu tượng Loader từ lucide-react
import { Toaster } from "react-hot-toast"; // Import Toaster để hiển thị thông báo

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore(); // Lấy thông tin người dùng và các hàm từ store
  const { theme } = useThemeStore(); // Lấy chủ đề từ store

  console.log({ onlineUsers }); // Ghi lại danh sách người dùng trực tuyến

  useEffect(() => {
    checkAuth(); // Kiểm tra trạng thái xác thực khi component được mount
  }, [checkAuth]);

  console.log({ authUser }); // Ghi lại thông tin người dùng

  if (isCheckingAuth && !authUser) // Nếu đang kiểm tra xác thực và không có người dùng
    return (
      <div className="flex items-center justify-center h-screen"> {/* Hiển thị loader trong khi kiểm tra */}
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}> {/* Thiết lập chủ đề cho ứng dụng */}
      <Navbar /> {/* Hiển thị Navbar */}

      <Routes> {/* Định nghĩa các route cho ứng dụng */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> {/* Route cho trang chính */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} /> {/* Route cho trang đăng ký */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} /> {/* Route cho trang đăng nhập */}
        <Route path="/settings" element={<SettingsPage />} /> {/* Route cho trang cài đặt */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> {/* Route cho trang hồ sơ */}
      </Routes>

      <Toaster /> {/* Hiển thị thông báo */}
    </div>
  );
};

export default App; // Xuất thành phần App