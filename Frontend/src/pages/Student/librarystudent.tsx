// src/pages/LibraryPage.tsx

// =================================================================
// 1. IMPORTS
// =================================================================
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

// =================================================================
// 2. MOCK DATA
// =================================================================
import { allDocuments } from '@/mocks/library.mock'; 

type Document = {
  id: number;
  Author: string;
  DocumentTitle: string;
};

// =================================================================
// 3. COMPONENT CHÍNH: LibraryPage
// =================================================================
const LibraryStudentPage = () => {

  // --- State ---
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // --- Logic Phân trang ---
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
          
          {/* Box 1: Library */}
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

// =================================================================
// 4. CÁC COMPONENT CON
// =================================================================

// --- Component con 1: LibraryTable (Bảng và Phân trang) ---
type LibraryTableProps = {
  documents: Document[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const LibraryTable = ({ documents, currentPage, totalPages, onPageChange }: LibraryTableProps) => {
  return (
    <section className="bg-white shadow-md rounded-lg overflow-hidden w-4/5">

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
                  <button className="text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-100">
                    Read
                  </button>
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


