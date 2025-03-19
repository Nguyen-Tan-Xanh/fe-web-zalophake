import { MessageSquare } from "lucide-react"; // Import biểu tượng MessageSquare từ lucide-react

// Component NoChatSelected - hiển thị khi không có cuộc trò chuyện nào được chọn
const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50"> {/* Container chính cho thông báo */}
      <div className="max-w-md text-center space-y-6"> {/* Container cho nội dung, căn giữa */}
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4"> {/* Container cho biểu tượng */}
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce" // Hiệu ứng nhấp nháy cho biểu tượng
            >
              <MessageSquare className="w-8 h-8 text-primary " /> {/* Biểu tượng tin nhắn */}
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2> {/* Tiêu đề chào mừng */}
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting {/* Hướng dẫn người dùng chọn cuộc trò chuyện */}
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected; // Xuất thành phần NoChatSelected