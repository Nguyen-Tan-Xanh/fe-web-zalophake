import { useState } from "react"; // Import hook useState từ React
import { useAuthStore } from "../store/useAuthStore"; // Import hook để quản lý trạng thái xác thực
import { Camera, Mail, User } from "lucide-react"; // Import các biểu tượng từ lucide-react

// Component ProfilePage - hiển thị thông tin người dùng
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore(); // Lấy thông tin người dùng và hàm cập nhật từ store
  const [selectedImg, setSelectedImg] = useState(null); // Trạng thái cho hình ảnh đã chọn

  // Hàm xử lý tải lên hình ảnh
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Lấy file hình ảnh
    if (!file) return; // Nếu không có file, thoát hàm

    const reader = new FileReader(); // Tạo đối tượng FileReader

    reader.readAsDataURL(file); // Đọc file dưới dạng URL

    reader.onload = async () => {
      const base64Image = reader.result; // Lấy kết quả đọc file
      setSelectedImg(base64Image); // Cập nhật hình ảnh đã chọn
      await updateProfile({ profilePic: base64Image }); // Cập nhật hình ảnh đại diện
    };
  };

  return (
    <div className="h-screen pt-20"> {/* Container chính cho trang profile */}
      <div className="max-w-2xl mx-auto p-4 py-8"> {/* Container cho nội dung, căn giữa */}
        <div className="bg-base-300 rounded-xl p-6 space-y-8"> {/* Container cho thông tin profile */}
          <div className="text-center"> {/* Phần tiêu đề */}
            <h1 className="text-2xl font-semibold ">Profile</h1> {/* Tiêu đề trang */}
            <p className="mt-2">Your profile information</p> {/* Mô tả */}
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4"> {/* Container cho phần tải lên avatar */}
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"} // Hình ảnh avatar
                alt="Profile" // Mô tả cho hình ảnh
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload" // Liên kết đến input file
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" /> {/* Biểu tượng camera */}
                <input
                  type="file"
                  id="avatar-upload" // ID cho input file
                  className="hidden" // Ẩn input file
                  accept="image/*" // Chỉ chấp nhận file hình ảnh
                  onChange={handleImageUpload} // Gọi hàm xử lý khi có thay đổi
                  disabled={isUpdatingProfile} // Vô hiệu hóa input khi đang cập nhật
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"} {/* Thông báo trạng thái */}
            </p>
          </div>

          <div className="space-y-6"> {/* Container cho thông tin người dùng */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2"> {/* Nhãn cho tên người dùng */}
                <User className="w-4 h-4" /> {/* Biểu tượng người dùng */}
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p> {/* Tên người dùng */}
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2"> {/* Nhãn cho email */}
                <Mail className="w-4 h-4" /> {/* Biểu tượng email */}
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p> {/* Địa chỉ email */}
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6"> {/* Container cho thông tin tài khoản */}
            <h2 className="text-lg font-medium  mb-4">Account Information</h2> {/* Tiêu đề cho thông tin tài khoản */}
            <div className="space-y-3 text-sm"> {/* Container cho thông tin tài khoản */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700"> {/* Thông tin ngày tham gia */}
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Ngày tham gia */}
              </div>
              <div className="flex items-center justify-between py-2"> {/* Thông tin trạng thái tài khoản */}
                <span>Account Status</span>
                <span className="text-green-500">Active</span> {/* Trạng thái tài khoản */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; // Xuất thành phần ProfilePage