// Component AuthImagePattern - hiển thị hình ảnh và thông tin xác thực
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12"> {/* Container chính cho hình ảnh, chỉ hiển thị trên màn hình lớn */}
      <div className="max-w-md text-center"> {/* Container cho nội dung, căn giữa */}
        <div className="grid grid-cols-3 gap-3 mb-8"> {/* Lưới cho các hình ảnh mẫu */}
          {[...Array(9)].map((_, i) => ( // Tạo 9 hình ảnh mẫu
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse scale-300" : "" // Thêm hiệu ứng nhấp nháy cho các hình ảnh chẵn
              }`}
            />
          ))}
        </div>
        {/* <h2 className="text-2xl font-bold mb-4">{title}</h2> Tiêu đề */}
        <p className="text-base-content/60">{subtitle}</p> {/* Phụ đề */}
      </div>
    </div>
  );
};

export default AuthImagePattern; // Xuất thành phần AuthImagePattern