// src/pages/SessionDetailsPage.tsx

// =================================================================
// 1. IMPORTS
// =================================================================
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

import {
  sessionDetails,
  registeredStudents,
} from '@/mocks/sessiontutor.mock';

export type StudentStatus = 'Absent' | 'Attended';

export type Student = {
  id: number;
  name: string;
  status: StudentStatus;
};


// =================================================================
// 3. COMPONENT CHÍNH: SessionDetailsPage
// =================================================================
const SessionDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fileName, setFileName] = useState('');

  // --- Logic xử lý sự kiện ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // --- Logic phân trang ---
  const itemsPerPage = 6;
  const totalPages = Math.ceil(registeredStudents.length / itemsPerPage);
  const currentStudents = registeredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Giao diện (JSX) ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-24 p-8 space-y-8">

          {/* Box 1: Session Details */}
          <h2 className="text-2xl font-bold text-[#B3261E] mb-4">Session Details</h2>
          <SessionDetailsInfo details={sessionDetails} />
          
          {/* Box 2: Registered Students */}
          <h2 className="text-2xl font-bold text-[#B3261E] mb-4">Registered Students</h2>
          <RegisteredStudentsTable
            students={currentStudents}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* Box 3: Progress Report */}
          <ProgressReportBox
            fileName={fileName}
            onFileChange={handleFileChange}
          />

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SessionDetailsPage;

// =================================================================
// 4. CÁC COMPONENT CON 
// =================================================================

// --- Component 1: StudentStatusBadge ---
type StudentStatusProps = {
  status: StudentStatus;
};
const StudentStatusBadge = ({ status }: StudentStatusProps) => {
  const colorClasses =
    status === 'Absent'
      ? 'bg-red-100 text-red-700'
      : 'bg-green-100 text-green-700';
  
  return (
    <span className={`px-5 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
      {status}
    </span>
  );
};

// --- Component 2: SessionDetailsInfo ---
type SessionInfoProps = {
  details: typeof sessionDetails;
};
const SessionDetailsInfo = ({ details }: SessionInfoProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-7xl font-bold text-[#B3261E]">{details.day}</div>
          <div className="text-base font-semibold text-[#B3261E] mt-1">{details.monthYear}</div>
        </div>
        
        <div className="w-px bg-gray-300 h-24"></div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
          <div>
            <label className="text-xs text-[#B3261E] font-bold uppercase">SUBJECT</label>
            <p className="text-sm font-semibold text-gray-800">{details.subject}</p>
          </div>
          <div>
            <label className="text-xs text-[#B3261E] font-bold uppercase">TUTOR</label>
            <p className="text-sm font-semibold text-gray-800">{details.tutor}</p>
          </div>
          <div></div>
          
          <div>
            <label className="text-xs text-[#B3261E] font-bold uppercase">TIME</label>
            <p className="text-sm font-semibold text-gray-800">{details.time}</p>
          </div>
          <div>
            <label className="text-xs text-[#B3261E] font-bold uppercase">ROOM</label>
            <p className="text-sm font-semibold text-gray-800">{details.room}</p>
          </div>
          <div>
            <label className="text-xs text-[#B3261E] font-bold uppercase">NUMBER OF STUDENTS</label>
            <p className="text-sm font-semibold text-gray-800">{details.studentCount}</p>
          </div>
          <div>
            <label className="text-xs text-[#B3261E] font-bold uppercase">STATUS</label>
            <p className="text-sm font-semibold text-yellow-600">{details.status}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Component 3: RegisteredStudentsTable ---
type StudentsTableProps = {
  students: Student[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const RegisteredStudentsTable = ({ students, currentPage, totalPages, onPageChange }: StudentsTableProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-gray-500 uppercase border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 ">Student Name</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <StudentStatusBadge status={student.status} />
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-3 justify-center">
                  
                  <NavLink 
                    to={`/profile`} // Giả sử bạn muốn xem profile của student đó
                    // Hoặc '/profile' nếu bạn chỉ muốn đến trang profile chung
                    className="text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-50"
                  >
                    View Profile
                  </NavLink>
                  
                  <button className="text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-50">
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang (Pagination) */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-50">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
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
                  : 'hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Component 4: ProgressReportBox ---
type ProgressReportProps = {
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ProgressReportBox = ({ fileName, onFileChange }: ProgressReportProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-[#B3261E] mb-1 ">Progress Report</h2>
      <div className="h-0.5 w-1/4 bg-gradient-to-r from-[#B3261E] to-transparent mb-4"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Upload
          </label>
          <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, Docx. Max file size: 10MB</p>
        </div>
        
        <div>
          <input 
            type="file" 
            id="report-upload" 
            className="hidden"
            onChange={onFileChange}
          />
          <label 
            htmlFor="report-upload"
            className="cursor-pointer text-sm text-[#B3261E] font-semibold bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors"
          >
            Update
          </label>
          <span className="ml-4 text-sm text-gray-500">
            {fileName ? fileName : "Không tệp ... được chọn"}
          </span>
        </div>

      </div>
    </section>
  );
};