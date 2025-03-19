import { THEMES } from "../constants"; // Import danh sách các theme từ constants
import { useThemeStore } from "../store/useThemeStore"; // Import hook để quản lý trạng thái theme
import { Send } from "lucide-react"; // Import biểu tượng gửi từ lucide-react

// Danh sách tin nhắn mẫu cho phần xem trước
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false }, // Tin nhắn chưa gửi
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true }, // Tin nhắn đã gửi
];

// Component SettingsPage - hiển thị trang cài đặt
const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore(); // Lấy theme hiện tại và hàm thiết lập theme từ store

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl"> {/* Container chính cho trang cài đặt */}
      <div className="space-y-6"> {/* Container cho các phần tử bên trong */}
        <div className="flex flex-col gap-1"> {/* Phần tiêu đề cho theme */}
          <h2 className="text-lg font-semibold">Theme</h2> {/* Tiêu đề cho phần chọn theme */}
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p> {/* Mô tả */}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"> {/* Lưới cho các theme */}
          {THEMES.map((t) => ( // Lặp qua từng theme
            <button
              key={t} // Khóa duy nhất cho mỗi nút
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"} // Thay đổi màu nền khi chọn
              `}
              onClick={() => setTheme(t)} // Gọi hàm thiết lập theme khi nhấn nút
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}> {/* Container cho theme */}
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1"> {/* Lưới cho màu sắc của theme */}
                  <div className="rounded bg-primary"></div> {/* Màu chính */}
                  <div className="rounded bg-secondary"></div> {/* Màu phụ */}
                  <div className="rounded bg-accent"></div> {/* Màu nhấn mạnh */}
                  <div className="rounded bg-neutral"></div> {/* Màu trung tính */}
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center"> {/* Tên theme */}
                {t.charAt(0).toUpperCase() + t.slice(1)} {/* Viết hoa chữ cái đầu tiên */}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3> {/* Tiêu đề cho phần xem trước */}
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg"> {/* Container cho phần xem trước */}
          <div className="p-4 bg-base-200"> {/* Phần nền cho xem trước */}
            <div className="max-w-lg mx-auto"> {/* Container cho giao diện chat mẫu */}
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden"> {/* Giao diện chat */}
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100"> {/* Header của chat */}
                  <div className="flex items-center gap-3"> {/* Container cho thông tin người dùng */}
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium"> {/* Avatar người dùng */}
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3> {/* Tên người dùng */}
                      <p className="text-xs text-base-content/70">Online</p> {/* Trạng thái trực tuyến */}
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100"> {/* Container cho tin nhắn */}
                  {PREVIEW_MESSAGES.map((message) => ( // Lặp qua từng tin nhắn mẫu
                    <div
                      key={message.id} // Khóa duy nhất cho mỗi tin nhắn
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`} // Căn giữa tin nhắn
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"} // Thay đổi màu nền dựa trên trạng thái tin nhắn
                        `}
                      >
                        <p className="text-sm">{message.content}</p> {/* Nội dung tin nhắn */}
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"} // Thay đổi màu thời gian dựa trên trạng thái tin nhắn
                          `}
                        >
                          12:00 PM {/* Thời gian gửi tin nhắn */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100"> {/* Container cho input gửi tin nhắn */}
                  <div className="flex gap-2"> {/* Container cho input và nút gửi */}
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10" // Input cho tin nhắn
                      placeholder="Type a message..."
                      value="This is a preview" // Nội dung xem trước
                      readOnly // Chỉ đọc
                    />
                    <button className="btn btn-primary h-10 min-h-0"> {/* Nút gửi */}
                      <Send size={18} /> {/* Biểu tượng gửi */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; // Xuất thành phần SettingsPage