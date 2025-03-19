import { X } from "lucide-react"; // Import biểu tượng đóng từ lucide-react
import { useAuthStore } from "../store/useAuthStore"; // Import hook để quản lý trạng thái xác thực
import { useChatStore } from "../store/useChatStore"; // Import hook để quản lý trạng thái chat

// Component ChatHeader - hiển thị header của giao diện chat
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore(); // Lấy thông tin người dùng đã chọn và hàm để thiết lập người dùng
  const { onlineUsers } = useAuthStore(); // Lấy danh sách người dùng trực tuyến

  return (
    <div className="p-2.5 border-b border-base-300"> {/* Container cho header */}
      <div className="flex items-center justify-between"> {/* Căn giữa các phần tử trong header */}
        <div className="flex items-center gap-3"> {/* Container cho avatar và thông tin người dùng */}
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative"> {/* Avatar của người dùng đã chọn */}
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} /> {/* Hình ảnh avatar */}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3> {/* Tên người dùng */}
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"} {/* Trạng thái trực tuyến của người dùng */}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}> {/* Nút để đóng chat */}
          <X /> {/* Biểu tượng đóng */}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; // Xuất thành phần ChatHeader