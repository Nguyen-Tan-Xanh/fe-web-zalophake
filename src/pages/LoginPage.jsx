import { useState } from "react"; // Import hook useState từ React để quản lý trạng thái
import { useAuthStore } from "../store/useAuthStore"; // Import hook tùy chỉnh để quản lý xác thực
import AuthImagePattern from "../components/AuthImagePattern"; // Import thành phần hình ảnh/mẫu
import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang
import { Eye, EyeOff, Loader2, Lock, Phone, MessageSquare } from "lucide-react"; // Import các biểu tượng từ lucide-react

const LoginPage = () => {
  // Trạng thái để hiển thị/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // Trạng thái lưu trữ thông tin biểu mẫu
  const [formData, setFormData] = useState({
    phone: "", // Số điện thoại
    password: "", // Mật khẩu
  });

  // Lấy hàm login và trạng thái isLoggingIn từ store
  const { login, isLoggingIn } = useAuthStore();

  // Hàm xử lý sự kiện khi gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
    login(formData); // Gọi hàm login với dữ liệu biểu mẫu
  };

  return (
    <div className="h-screen grid lg:grid-cols-2"> {/* Chia giao diện thành hai cột */}
      {/* Bên trái - Biểu mẫu */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" /> {/* Biểu tượng tin nhắn */}
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1> {/* Tiêu đề */}
              <p className="text-base-content/60">Sign in to your account</p> {/* Mô tả */}
            </div>
          </div>

          {/* Biểu mẫu */}
          <form onSubmit={handleSubmit} className="space-y-6"> {/* Biểu mẫu đăng nhập */}
            
            {/* Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span> {/* Nhãn cho trường số điện thoại */}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-base-content/40" /> {/* Biểu tượng số điện thoại */}
                </div>
                <input
                  type="tel" // Thay đổi loại thành "tel" cho số điện thoại
                  className={`input input-bordered w-full pl-10`} // Trường nhập số điện thoại
                  placeholder="123-456-7890" // Placeholder cho trường số điện thoại
                  value={formData.phone} // Giá trị của trường
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} // Cập nhật giá trị khi thay đổi
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span> {/* Nhãn cho trường mật khẩu */}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" /> {/* Biểu tượng khóa */}
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Hiển thị mật khẩu hoặc ẩn
                  className={`input input-bordered w-full pl-10`} // Trường nhập mật khẩu
                  placeholder="••••••••" // Placeholder cho trường mật khẩu
                  value={formData.password} // Giá trị của trường
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Cập nhật giá trị khi thay đổi
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Chuyển đổi hiển thị mật khẩu
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" /> // Biểu tượng mắt khi ẩn
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" /> // Biểu tượng mắt khi hiện
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}> {/* Nút gửi biểu mẫu */}
              {isLoggingIn ? ( // Nếu đang trong quá trình đăng nhập
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> {/* Biểu tượng tải */}
                  Loading...
                </>
              ) : (
                "Sign In" // Văn bản nút khi không đang tải
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary"> {/* Liên kết đến trang đăng ký */}
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bên phải - Hình ảnh/Mẫu */}
      <AuthImagePattern
        title={"Welcome back!"} // Tiêu đề cho phần hình ảnh/mẫu
        subtitle={"Sign in to continue your conversations and catch up with your messages."} // Mô tả cho phần hình ảnh/mẫu
      />
    </div>
  );
};

export default LoginPage; // Xuất thành phần LoginPage