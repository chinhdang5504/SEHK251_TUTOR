// src/pages/hcmutLibrary/LibraryPage.tsx

import React, { useState } from 'react';

// Import Layout
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

// Import Components con
import LibraryTable from '@/pages/hcmutLibrary/component/LibraryTable';

// Import Mock Data
import { allDocuments } from '@/mocks/library.mock'; 

const LibraryStudentPage = () => {

  // --- State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [fileName, setFileName] = useState('');

  // --- Logic xử lý sự kiện Upload ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };
  
  // --- Logic Phân trang ---
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(allDocuments.length / itemsPerPage);
  
  const currentDocuments = allDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        {/* Nội dung chính */}
        <main className="flex-1 ml-0 xl:ml-[282px] pt-24 p-8 flex flex-col">
          
          <div className="flex justify-between items-center p-6 w-3/4">
            <h1 className="text-3xl font-bold text-[#B3261E]">Library</h1>
          </div>
          
          {/* Box 1: Danh sách tài liệu */}
          <LibraryTable
            documents={currentDocuments}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </main>
      </div>
      <Footer />
    </div>
  );
}; 

export default LibraryStudentPage;