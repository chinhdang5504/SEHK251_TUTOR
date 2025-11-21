// src/pages/hcmutLibrary/LibraryPage.tsx

import React, { useState } from 'react';

// Import Layout
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

// Import Components con
import LibraryTable from './component/LibraryTable';
import ShareDocumentBox from './component/ShareDocumentBox';

import { useLibrary } from '@/hooks/useLibrary'; 

const LibraryPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [fileName, setFileName] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const itemsPerPage = 6;

  // 🔥 3. GỌI HOOK: 
  // - useApi = false: Dùng Mock Data thông qua Hook
  // - useApi = true:  Dùng API thật
  const { 
    documents,      
    totalPages,     
    isLoading,      
    uploadDoc,      
    isUploading     
  } = useLibrary(currentPage, itemsPerPage, false); 

  // --- Logic xử lý sự kiện chọn file ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);
    } else {
      setFileName('');
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    uploadDoc(formData);
    setFileName('');
    setSelectedFile(null);
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-24 p-8 flex flex-col">
          
          <div className="flex justify-between items-center p-6 w-3/4">
            <h1 className="text-3xl font-bold text-[#B3261E]">Library</h1>
          </div>
          
          {/* Box 1: Danh sách tài liệu */}
          {/* Hiển thị Loading nếu đang tải */}
          {isLoading ? (
            <div className="p-6">Loading documents...</div>
          ) : (
            <LibraryTable
              documents={documents}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <div className="flex-grow"></div>

          {/* Box 2: Chia sẻ tài liệu (Upload) */}
          <div className="mt-8 w-4/5">
            <ShareDocumentBox
              fileName={fileName}
              onFileChange={handleFileChange}
              className="w-full" 
            />
            
            {/* Nút xác nhận Upload */}
            {selectedFile && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
                    isUploading ? 'bg-gray-400' : 'bg-[#B3261E] hover:bg-red-700'
                  }`}
                >
                  {isUploading ? 'Uploading...' : 'Confirm Upload'}
                </button>
              </div>
            )}
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}; 

export default LibraryPage;