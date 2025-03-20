import { useState } from "react"; // Import hook useState từ React để quản lý trạng thái
import { useAuthStore } from "../store/useAuthStore"; // Import hook tùy chỉnh để quản lý xác thực
import { Eye, EyeOff, Loader2, Lock, Phone, MessageSquare, User } from "lucide-react"; // Import các biểu tượng từ lucide-react
import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang

import AuthImagePattern from "../components/AuthImagePattern"; // Import thành phần hình ảnh/mẫu
import toast from "react-hot-toast"; // Import thư viện để hiển thị thông báo

const SignUpPage = () => {
  // Trạng thái để hiển thị/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false); 

  // Trạng thái lưu trữ thông tin biểu mẫu
  const [formData, setFormData] = useState({
    fullName: "", // Tên đầy đủ
    phone: "", // Số điện thoại
    password: "", // Mật khẩu
  });

  // Lấy hàm signup và trạng thái isSigningUp từ store
  const { signup, isSigningUp } = useAuthStore(); 

  // Hàm kiểm tra tính hợp lệ của biểu mẫu
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required"); // Kiểm tra tên đầy đủ
    if (!formData.phone.trim()) return toast.error("Phone number is required"); // Kiểm tra số điện thoại
    if (!/^\d{10}$/.test(formData.phone)) return toast.error("Invalid phone number format"); // Kiểm tra định dạng số điện thoại
    if (!formData.password) return toast.error("Password is required"); // Kiểm tra mật khẩu
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters"); // Kiểm tra độ dài mật khẩu

    return true; // Nếu tất cả đều hợp lệ
  };

  // Hàm xử lý sự kiện khi gửi biểu mẫu
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu

    const success = validateForm(); // Kiểm tra tính hợp lệ của biểu mẫu

    if (success === true) signup(formData); // Nếu hợp lệ, gọi hàm signup
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2"> {/* Chia giao diện thành hai cột */}
      {/* Bên trái */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" /> {/* Biểu tượng tin nhắn */}
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1> {/* Tiêu đề */}
              <p className="text-base-content/60">Get started with your free account</p> {/* Mô tả */}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6"> {/* Biểu mẫu đăng ký */}
            
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span> {/* Nhãn cho trường tên đầy đủ */}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" /> {/* Biểu tượng người dùng */}
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe" // Placeholder cho trường tên đầy đủ
                  value={formData.fullName} // Giá trị của trường
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} // Cập nhật giá trị khi thay đổi
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span> {/* Nhãn cho trường số điện thoại */}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="size-5 text-base-content/40" /> {/* Biểu tượng số điện thoại */}
                </div>
                <input
                  type="tel" // Thay đổi loại thành "tel" cho số điện thoại
                  className={`input input-bordered w-full pl-10`}
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
                  <Lock className="size-5 text-base-content/40" /> {/* Biểu tượng khóa */}
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Hiển thị mật khẩu hoặc ẩn
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••" // Placeholder cho trường mật khẩu
                  value={formData.password} // Giá trị của trường
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Cập nhật giá trị khi thay đổi
                />

                {/* Trạng thái để hiển thị/ẩn mật khẩu */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Chuyển đổi hiển thị mật khẩu
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" /> // Biểu tượng mắt khi ẩn
                  ) : (
                    <Eye className="size-5 text-base-content/40" /> // Biểu tượng mắt khi hiện
                  )}
                </button>
              </div>
            </div>

            {/* Nút Create Account */}
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}> {/* Nút gửi biểu mẫu */}
              {isSigningUp ? ( // Nếu đang trong quá trình đăng ký
                <>
                  <Loader2 className="size-5 animate-spin" /> {/* Biểu tượng tải */}
                  Loading...
                </>
              ) : (
                "Create Account" // Văn bản nút khi không đang tải
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary"> {/* Liên kết đến trang đăng nhập */}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bên phải */}
      <AuthImagePattern
        title="Join our community" // Tiêu đề cho phần hình ảnh/mẫu
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones." // Mô tả cho phần hình ảnh/mẫu
      />
    </div>
  );
};

export default SignUpPage; // Xuất thành phần SignUpPage