import { create } from "zustand"; // Import thư viện zustand để tạo store
import toast from "react-hot-toast"; // Import thư viện thông báo
import { axiosInstance } from "../lib/axios"; // Import instance axios để thực hiện các yêu cầu HTTP
import { useAuthStore } from "./useAuthStore"; // Import store xác thực để sử dụng socket

// Tạo store sử dụng zustand
export const useChatStore = create((set, get) => ({
  messages: [], // Danh sách tin nhắn
  users: [], // Danh sách người dùng
  selectedUser: null, // Người dùng đã chọn
  isUsersLoading: false, // Trạng thái tải người dùng
  isMessagesLoading: false, // Trạng thái tải tin nhắn

  // Hàm lấy danh sách người dùng
  getUsers: async () => {
    set({ isUsersLoading: true }); // Đặt trạng thái tải người dùng
    try {
      const res = await axiosInstance.get("/messages/users"); // Gửi yêu cầu lấy người dùng
      set({ users: res.data }); // Cập nhật danh sách người dùng
    } catch (error) {
      toast.error(error.response.data.message); // Hiển thị thông báo lỗi
    } finally {
      set({ isUsersLoading: false }); // Đặt lại trạng thái tải người dùng
    }
  },

  // Hàm lấy tin nhắn của người dùng đã chọn
  getMessages: async (userId) => {
    set({ isMessagesLoading: true }); // Đặt trạng thái tải tin nhắn
    try {
      const res = await axiosInstance.get(`/messages/${userId}`); // Gửi yêu cầu lấy tin nhắn
      set({ messages: res.data }); // Cập nhật danh sách tin nhắn
    } catch (error) {
      toast.error(error.response.data.message); // Hiển thị thông báo lỗi
    } finally {
      set({ isMessagesLoading: false }); // Đặt lại trạng thái tải tin nhắn
    }
  },

  // Hàm gửi tin nhắn
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get(); // Lấy thông tin người dùng đã chọn và danh sách tin nhắn
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData); // Gửi yêu cầu gửi tin nhắn
      set({ messages: [...messages, res.data] }); // Cập nhật danh sách tin nhắn
    } catch (error) {
      toast.error(error.response.data.message); // Hiển thị thông báo lỗi
    }
  },

  // Hàm đăng ký lắng nghe tin nhắn mới
  subscribeToMessages: () => {
    const { selectedUser } = get(); // Lấy thông tin người dùng đã chọn
    if (!selectedUser) return; // Nếu không có người dùng đã chọn thì thoát

    const socket = useAuthStore.getState().socket; // Lấy socket từ store xác thực

    socket.on("newMessage", (newMessage) => { // Lắng nghe sự kiện nhận tin nhắn mới
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id; // Kiểm tra xem tin nhắn có phải từ người dùng đã chọn không
      if (!isMessageSentFromSelectedUser) return; // Nếu không phải thì thoát

      set({
        messages: [...get().messages, newMessage], // Cập nhật danh sách tin nhắn
      });
    });
  },

  // Hàm hủy đăng ký lắng nghe tin nhắn mới
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket; // Lấy socket từ store xác thực
    socket.off("newMessage"); // Hủy đăng ký lắng nghe sự kiện tin nhắn mới
  },

  // Hàm thiết lập người dùng đã chọn
  setSelectedUser: (selectedUser) => set({ selectedUser }), // Cập nhật người dùng đã chọn
}));