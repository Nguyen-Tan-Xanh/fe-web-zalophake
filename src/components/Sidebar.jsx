import { useEffect, useState } from "react"; // Import các hook từ React
import { useChatStore } from "../store/useChatStore"; // Import hook để quản lý trạng thái chat
import { useAuthStore } from "../store/useAuthStore"; // Import hook để quản lý trạng thái xác thực
import SidebarSkeleton from "./skeletons/SidebarSkeleton"; // Import skeleton cho sidebar
import { Users } from "lucide-react"; // Import biểu tượng người dùng từ lucide-react

// Component Sidebar - hiển thị danh sách người dùng trong chat
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore(); // Lấy các giá trị từ store chat
  const { onlineUsers } = useAuthStore(); // Lấy danh sách người dùng trực tuyến
  const [showOnlineOnly, setShowOnlineOnly] = useState(false); // Trạng thái để hiển thị chỉ người dùng trực tuyến

  useEffect(() => {
    getUsers(); // Lấy danh sách người dùng khi component được mount
  }, [getUsers]);

  // Lọc người dùng dựa trên trạng thái trực tuyến
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />; // Hiển thị skeleton khi đang tải người dùng

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200"> {/* Container chính cho sidebar */}
      <div className="border-b border-base-300 w-full p-5"> {/* Header cho sidebar */}
        <div className="flex items-center gap-2">
          <Users className="size-6" /> {/* Biểu tượng người dùng */}
          <span className="font-medium hidden lg:block">Contacts</span> {/* Tiêu đề danh bạ, chỉ hiển thị trên màn hình lớn */}
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2"> {/* Nút chuyển đổi hiển thị người dùng trực tuyến */}
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly} // Trạng thái checkbox
              onChange={(e) => setShowOnlineOnly(e.target.checked)} // Cập nhật trạng thái khi thay đổi
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span> {/* Nhãn cho checkbox */}
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span> {/* Hiển thị số người dùng trực tuyến */}
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3"> {/* Container cho danh sách người dùng */}
        {filteredUsers.map((user) => ( // Lặp qua từng người dùng
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)} // Thiết lập người dùng đã chọn khi nhấn nút
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0"> {/* Container cho avatar */}
              <img
                src={user.profilePic || "/avatar.png"} // Hình ảnh avatar
                alt={user.name} // Mô tả cho hình ảnh
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && ( // Hiển thị chỉ báo trực tuyến nếu người dùng đang trực tuyến
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - chỉ hiển thị trên màn hình lớn */}
            <div className="hidden lg:block text-left min-w-0"> {/* Container cho thông tin người dùng */}
              <div className="font-medium truncate">{user.fullName}</div> {/* Tên người dùng */}
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"} {/* Trạng thái trực tuyến của người dùng */}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && ( // Hiển thị thông báo nếu không có người dùng nào
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; // Xuất thành phần Sidebar