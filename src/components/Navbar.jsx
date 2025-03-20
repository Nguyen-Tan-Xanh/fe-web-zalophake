import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang
import { useAuthStore } from "../store/useAuthStore"; // Import hook tùy chỉnh để quản lý xác thực
import { LogOut, Twitter, SlidersHorizontal, CircleUserRound } from "lucide-react"; // Import các biểu tượng từ lucide-react

const Navbar = () => {
  const { logout, authUser } = useAuthStore(); // Lấy hàm logout và thông tin người dùng từ store

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 h-12" // Thiết lập kiểu dáng cho header
    >
      <div className="container mx-auto px-4 h-12"> {/* Container cho navbar */}
        <div className="flex items-center justify-between h-full"> {/* Flexbox để căn chỉnh nội dung */}

          {/* Phần bên trái navbar */}
          <div className="flex items-center gap-8"> 
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all"> {/* Liên kết đến trang chính */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center"> {/* Biểu tượng tin nhắn */}
                <Twitter className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Zalo Phake</h1> {/* Tên ứng dụng */}
            </Link>
          </div>

          {/* Phần bên phải navbar */}
          <div className="flex items-center gap-2">
            {/* Nút Settings */}
            <Link
              to={"/settings"} // Liên kết đến trang cài đặt
              className={`
              btn btn-sm gap-2 transition-colors
              `}
            >
              <SlidersHorizontal className="w-4 h-4" /> {/* Biểu tượng cài đặt */}
              <span className="hidden sm:inline">Settings</span> {/* Văn bản cho nút cài đặt */}
            </Link>

            {authUser && ( // Nếu người dùng đã đăng nhập
              <>
                {/* Nút Profile */}
                <Link to={"/profile"} className={`btn btn-sm gap-2`}> {/* Liên kết đến trang hồ sơ */}
                  <CircleUserRound className="size-5" /> {/* Biểu tượng người dùng */}
                  <span className="hidden sm:inline">Profile</span> {/* Văn bản cho nút hồ sơ */}
                </Link>

                {/* Nút Sign out */}
                <button className="flex gap-2 items-center" onClick={logout}> {/* Nút đăng xuất */}
                  <LogOut className="size-5" /> {/* Biểu tượng đăng xuất */}
                  <span className="hidden sm:inline">Sign out</span> {/* Văn bản cho nút đăng xuất */}
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