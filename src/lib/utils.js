// Hàm formatMessageTime để định dạng thời gian từ một đối tượng Date
export function formatMessageTime(date) {
  // Chuyển đổi đối tượng date thành chuỗi thời gian theo định dạng 24 giờ
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit", // Hiển thị giờ với 2 chữ số
    minute: "2-digit", // Hiển thị phút với 2 chữ số
    hour12: false, // Sử dụng định dạng 24 giờ
  });
}