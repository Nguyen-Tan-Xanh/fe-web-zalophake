import { create } from "zustand"; // Import thư viện zustand để tạo store

// Tạo store sử dụng zustand
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee", // Lấy theme từ localStorage hoặc mặc định là "coffee"
  
  // Hàm thiết lập theme
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme); // Lưu theme vào localStorage
    set({ theme }); // Cập nhật theme trong store
  },
}));