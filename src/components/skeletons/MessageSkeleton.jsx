const MessageSkeleton = () => {
  // Tạo một mảng gồm 6 phần tử cho các tin nhắn skeleton
  const skeletonMessages = Array(6).fill(null); // Mảng này sẽ được sử dụng để hiển thị các skeleton

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4"> {/* Container cho các tin nhắn skeleton */}
      {skeletonMessages.map((_, idx) => ( // Lặp qua mảng skeletonMessages
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}> {/* Định dạng chat theo vị trí */}
          <div className="chat-image avatar"> {/* Vùng hiển thị ảnh đại diện */}
            <div className="size-10 rounded-full"> {/* Kích thước và kiểu dáng cho ảnh đại diện */}
              <div className="skeleton w-full h-full rounded-full" /> {/* Skeleton cho ảnh đại diện */}
            </div>
          </div>

          <div className="chat-header mb-1"> {/* Vùng hiển thị tiêu đề chat */}
            <div className="skeleton h-4 w-16" /> {/* Skeleton cho tiêu đề chat */}
          </div>

          <div className="chat-bubble bg-transparent p-0"> {/* Vùng hiển thị nội dung chat */}
            <div className="skeleton h-16 w-[200px]" /> {/* Skeleton cho nội dung tin nhắn */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton; // Xuất thành phần MessageSkeleton