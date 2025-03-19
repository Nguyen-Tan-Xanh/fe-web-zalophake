import { useChatStore } from "../store/useChatStore"; // Import hook tùy chỉnh để quản lý trạng thái chat

import Sidebar from "../components/Sidebar"; // Import thành phần Sidebar
import NoChatSelected from "../components/NoChatSelected"; // Import thành phần hiển thị khi không có cuộc trò chuyện nào được chọn
import ChatContainer from "../components/ChatContainer"; // Import thành phần hiển thị nội dung cuộc trò chuyện

const HomePage = () => {
  const { selectedUser } = useChatStore(); // Lấy thông tin người dùng đã chọn từ store

  return (
    <div className="h-screen bg-base-200"> {/* Thiết lập chiều cao toàn màn hình và màu nền */}
      <div className="flex items-center justify-center pt-20 px-4"> {/* Căn giữa nội dung */}
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]"> {/* Container cho nội dung chính */}
          <div className="flex h-full rounded-lg overflow-hidden"> {/* Flexbox để chia layout */}
            <Sidebar /> {/* Hiển thị Sidebar */}

            {/* Nếu không có người dùng nào được chọn, hiển thị NoChatSelected, ngược lại hiển thị ChatContainer */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; // Xuất thành phần HomePage