import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang
import { useAuthStore } from "../store/useAuthStore"; // Import hook tùy chỉnh để quản lý xác thực
import { LogOut, MessageSquare, Settings, User } from "lucide-react"; // Import các biểu tượng từ lucide-react

const Navbar = () => {
  const { logout, authUser } = useAuthStore(); // Lấy hàm logout và thông tin người dùng từ store

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80" // Thiết lập kiểu dáng cho header
    >
      <div className="container mx-auto px-4 h-16"> {/* Container cho navbar */}
        <div className="flex items-center justify-between h-full"> {/* Flexbox để căn chỉnh nội dung */}
          <div className="flex items-center gap-8"> {/* Phần bên trái navbar */}
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all"> {/* Liên kết đến trang chính */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center"> {/* Biểu tượng tin nhắn */}
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1> {/* Tên ứng dụng */}
            </Link>
          </div>

          <div className="flex items-center gap-2"> {/* Phần bên phải navbar */}
            <Link
              to={"/settings"} // Liên kết đến trang cài đặt
              className={`
              btn btn-sm gap-2 transition-colors
              `}
            >
              <Settings className="w-4 h-4" /> {/* Biểu tượng cài đặt */}
              <span className="hidden sm:inline">Settings</span> {/* Văn bản cho nút cài đặt */}
            </Link>

            {authUser && ( // Nếu người dùng đã đăng nhập
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}> {/* Liên kết đến trang hồ sơ */}
                  <User className="size-5" /> {/* Biểu tượng người dùng */}
                  <span className="hidden sm:inline">Profile</span> {/* Văn bản cho nút hồ sơ */}
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}> {/* Nút đăng xuất */}
                  <LogOut className="size-5" /> {/* Biểu tượng đăng xuất */}
                  <span className="hidden sm:inline">Logout</span> {/* Văn bản cho nút đăng xuất */}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; // Xuất thành phần Navbar