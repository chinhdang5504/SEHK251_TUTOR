// src/pages/hcmutLibrary/components/LibraryTable.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Import Type
import type { Document } from '../library.types';

interface LibraryTableProps {
  documents: Document[];                  // Danh sách tài liệu
  currentPage: number;                    // Trang hiện tại
  totalPages: number;                     // Tổng số trang
  onPageChange: (page: number) => void;   // Hàm chuyển trang
}

const LibraryTable = ({ documents, currentPage, totalPages, onPageChange }: LibraryTableProps) => {

  // --- Hàm xử lý khi bấm nút Read ---
  const handleRead = (url: string | undefined) => {
    if (url) {
      // Mở đường dẫn file trong tab mới
      window.open(url, '_blank');
    } else {
      // Thông báo nếu dữ liệu chưa có link
      alert("Tài liệu này chưa có file để đọc!");
    }
  };

  return (
    <section className="bg-white shadow-md rounded-lg overflow-hidden w-4/5">

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-gray-200 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Document Title</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4">{doc.Author}</td>
                <td className="px-6 py-4 font-medium">{doc.DocumentTitle}</td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  
                  {/* Nút Read: Đã gắn sự kiện click */}
                  <button 
                    onClick={() => handleRead(doc.fileUrl)}
                    className="text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-100"
                  >
                    Read
                  </button>
                  
                  {/* Nút Download: Có thể gắn logic tương tự hoặc gọi API download */}
                  <button className="text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-100">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang (Pagination) */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-100 border-t">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="xs" />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 
                  ? 'bg-red-600 text-white font-bold' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </button>
        </div>
      </div>
    </section> 
  );
};

export default LibraryTable;