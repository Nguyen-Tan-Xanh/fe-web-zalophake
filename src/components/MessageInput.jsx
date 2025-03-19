import { useRef, useState } from "react"; // Import các hook từ React
import { useChatStore } from "../store/useChatStore"; // Import hook để quản lý trạng thái chat
import { Image, Send, X } from "lucide-react"; // Import các biểu tượng từ lucide-react
import toast from "react-hot-toast"; // Import thư viện thông báo

// Component MessageInput - hiển thị input để gửi tin nhắn
const MessageInput = () => {
  const [text, setText] = useState(""); // Trạng thái cho văn bản tin nhắn
  const [imagePreview, setImagePreview] = useState(null); // Trạng thái cho hình ảnh xem trước
  const fileInputRef = useRef(null); // Tham chiếu đến input file
  const { sendMessage } = useChatStore(); // Lấy hàm gửi tin nhắn từ store chat

  // Hàm xử lý thay đổi hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy file hình ảnh
    if (!file.type.startsWith("image/")) { // Kiểm tra loại file
      toast.error("Please select an image file"); // Hiển thị thông báo lỗi
      return;
    }

    const reader = new FileReader(); // Tạo đối tượng FileReader
    reader.onloadend = () => {
      setImagePreview(reader.result); // Cập nhật hình ảnh xem trước
    };
    reader.readAsDataURL(file); // Đọc file dưới dạng URL
  };

  // Hàm xóa hình ảnh xem trước
  const removeImage = () => {
    setImagePreview(null); // Đặt lại hình ảnh xem trước
    if (fileInputRef.current) fileInputRef.current.value = ""; // Xóa giá trị input file
  };

  // Hàm xử lý gửi tin nhắn
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (!text.trim() && !imagePreview) return; // Kiểm tra xem có nội dung để gửi không

    try {
      await sendMessage({ // Gửi tin nhắn
        text: text.trim(),
        image: imagePreview,
      });

      // Xóa form
      setText(""); // Đặt lại văn bản
      setImagePreview(null); // Đặt lại hình ảnh xem trước
      if (fileInputRef.current) fileInputRef.current.value = ""; // Xóa giá trị input file
    } catch (error) {
      console.error("Failed to send message:", error); // Xử lý lỗi
    }
  };

  return (
    <div className="p-4 w-full"> {/* Container cho input tin nhắn */}
      {imagePreview && ( // Hiển thị hình ảnh xem trước nếu có
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview" // Mô tả cho hình ảnh xem trước
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage} // Gọi hàm xóa hình ảnh khi nhấn nút
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" /> {/* Biểu tượng xóa */}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2"> {/* Form gửi tin nhắn */}
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..." // Placeholder cho input
            value={text} // Giá trị của input
            onChange={(e) => setText(e.target.value)} // Cập nhật trạng thái khi thay đổi
          />
          <input
            type="file"
            accept="image/*" // Chỉ chấp nhận file hình ảnh
            className="hidden" // Ẩn input file
            ref={fileInputRef} // Tham chiếu đến input file
            onChange={handleImageChange} // Gọi hàm xử lý khi có thay đổi
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} // Thay đổi màu nút dựa trên trạng thái hình ảnh
            onClick={() => fileInputRef.current?.click()} // Mở dialog chọn file khi nhấn nút
          >
            <Image size={20} /> {/* Biểu tượng hình ảnh */}
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview} // Vô hiệu hóa nút nếu không có nội dung
        >
          <Send size={22} /> {/* Biểu tượng gửi */}
        </button>
      </form>
    </div>
  );
};

export default MessageInput; // Xuất thành phần MessageInput