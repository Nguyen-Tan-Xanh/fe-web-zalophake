import { useChatStore } from "../store/useChatStore"; // Import hook để quản lý trạng thái chat
import { useEffect, useRef } from "react"; // Import các hook từ React

import ChatHeader from "./ChatHeader"; // Import component header của chat
import MessageInput from "./MessageInput"; // Import component nhập tin nhắn
import MessageSkeleton from "./skeletons/MessageSkeleton"; // Import skeleton cho tin nhắn
import { useAuthStore } from "../store/useAuthStore"; // Import hook để quản lý trạng thái xác thực
import { formatMessageTime } from "../lib/utils"; // Import hàm định dạng thời gian tin nhắn

// Component ChatContainer - hiển thị giao diện chat
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore(); // Lấy các giá trị từ store chat
  const { authUser } = useAuthStore(); // Lấy thông tin người dùng xác thực
  const messageEndRef = useRef(null); // Tham chiếu đến cuối danh sách tin nhắn

  useEffect(() => {
    getMessages(selectedUser._id); // Lấy tin nhắn cho người dùng đã chọn

    subscribeToMessages(); // Đăng ký nhận tin nhắn mới

    return () => unsubscribeFromMessages(); // Hủy đăng ký khi component bị hủy
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" }); // Cuộn đến cuối danh sách tin nhắn
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto"> {/* Container chính cho giao diện chat */}
        <ChatHeader /> {/* Hiển thị header của chat */}
        <MessageSkeleton /> {/* Hiển thị skeleton khi đang tải tin nhắn */}
        <MessageInput /> {/* Hiển thị input để nhập tin nhắn */}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto"> {/* Container chính cho giao diện chat */}
      <ChatHeader /> {/* Hiển thị header của chat */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4"> {/* Container cho danh sách tin nhắn */}
        {messages.map((message) => ( // Lặp qua từng tin nhắn
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} // Xác định vị trí tin nhắn
            ref={messageEndRef} // Tham chiếu đến cuối danh sách tin nhắn
          >
            <div className=" chat-image avatar"> {/* Hiển thị avatar của người gửi */}
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png" // Avatar của người gửi
                      : selectedUser.profilePic || "/avatar.png" // Avatar của người nhận
                  }
                  alt="profile pic" // Mô tả cho hình ảnh
                />
              </div>
            </div>
            <div className="chat-header mb-1"> {/* Hiển thị thời gian tin nhắn */}
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)} {/* Định dạng thời gian tin nhắn */}
              </time>
            </div>
            <div className="chat-bubble flex flex-col"> {/* Hiển thị nội dung tin nhắn */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment" // Mô tả cho hình ảnh đính kèm
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>} {/* Hiển thị văn bản tin nhắn */}
            </div>
          </div>
        ))}
      </div>

      <MessageInput /> {/* Hiển thị input để nhập tin nhắn */}
    </div>
  );
};

export default ChatContainer; // Xuất thành phần ChatContainer