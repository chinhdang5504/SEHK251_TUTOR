// src/pages/Tutor/components/RegisteredStudentsTable.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import StudentStatusBadge from './StudentStatusBadge';
import type { Student } from '../sessiondetail.types';

interface StudentsTableProps {
  students: Student[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RegisteredStudentsTable = ({ students, currentPage, totalPages, onPageChange }: StudentsTableProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-500 uppercase border-b border-gray-200">
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
                  {/* Nút xem hồ sơ */}
                  <NavLink 
                    to={`/student/profile`} 
                    className="text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-50"
                  >
                    View Profile
                  </NavLink>
                  
                  {/* Nút Feedback */}
                  <button className="text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-50">
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
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

export default RegisteredStudentsTable;