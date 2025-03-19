import { StrictMode } from "react"; // Import StrictMode từ React để phát hiện lỗi trong ứng dụng
import { createRoot } from "react-dom/client"; // Import createRoot để render ứng dụng React
import "./index.css"; // Import file CSS chính
import App from "./App.jsx"; // Import component App chính của ứng dụng

import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter để quản lý routing trong ứng dụng

// Render ứng dụng React vào phần tử có id "root"
createRoot(document.getElementById("root")).render(
  <StrictMode> {/* Bật chế độ StrictMode để phát hiện lỗi */}
    <BrowserRouter> {/* Cung cấp routing cho ứng dụng */}
      <App /> {/* Component chính của ứng dụng */}
    </BrowserRouter>
  </StrictMode>
);