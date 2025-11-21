// src/pages/TestPage/components/SessionCard.tsx
import type { SessionData } from '../homepage.types';

// Kế thừa type từ SessionData và thêm className nếu cần
interface SessionCardProps extends SessionData {
  className?: string;
}

const SessionCard = ({
  imgSrc,
  title,
  author,
  description,
  date,
  slots,
  className,
}: SessionCardProps) => {
  return (
    <div className={`bg-gray-100 rounded-lg shadow-md border border-gray-200 overflow-hidden h-full flex flex-col relative w-full ${className}`}>
      {/* 1. Phần hình ảnh */}
      <img src={imgSrc} alt={title} className="p-6 w-full h-80 object-cover rounded-xl" />

      {/* 2. Phần nội dung */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Hàng trên cùng */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <div className="flex gap-2">
            <span className="bg-white text-gray-900 text-s px-3.5 py-1.5 rounded-md">{date}</span>
            <span className="bg-white text-gray-900 text-s px-3.5 py-1.5 rounded-md">{slots}</span>
          </div>
          <span className="text-[#262626] text-s font-semibold">{author}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 h-16">{description}</p>
        
        <div className="mt-auto py-3"> 
          <button className="w-full border border-[#B3261E] text-[#B3261E] px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors">
            Get it now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;