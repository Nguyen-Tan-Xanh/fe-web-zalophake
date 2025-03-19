import { Users } from "lucide-react"; // Import biểu tượng người dùng từ lucide-react

const SidebarSkeleton = () => {
  // Tạo 8 phần tử skeleton cho danh bạ
  const skeletonContacts = Array(8).fill(null); // Mảng này sẽ được sử dụng để hiển thị các skeleton

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200" // Thiết lập kiểu dáng cho sidebar
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5"> {/* Header cho sidebar */}
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" /> {/* Biểu tượng danh bạ */}
          <span className="font-medium hidden lg:block">Contacts</span> {/* Tiêu đề danh bạ, chỉ hiển thị trên màn hình lớn */}
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3"> {/* Container cho danh sách skeleton */}
        {skeletonContacts.map((_, idx) => ( // Lặp qua mảng skeletonContacts
          <div key={idx} className="w-full p-3 flex items-center gap-3"> {/* Container cho mỗi skeleton contact */}
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0"> {/* Vùng hiển thị avatar */}
              <div className="skeleton size-12 rounded-full" /> {/* Skeleton cho avatar */}
            </div>

            {/* User info skeleton - chỉ hiển thị trên màn hình lớn */}
            <div className="hidden lg:block text-left min-w-0 flex-1"> {/* Vùng hiển thị thông tin người dùng */}
              <div className="skeleton h-4 w-32 mb-2" /> {/* Skeleton cho tên người dùng */}
              <div className="skeleton h-3 w-16" /> {/* Skeleton cho thông tin bổ sung */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton; // Xuất thành phần SidebarSkeleton