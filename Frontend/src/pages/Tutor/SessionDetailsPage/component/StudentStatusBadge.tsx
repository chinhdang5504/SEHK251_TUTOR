// src/pages/Tutor/components/StudentStatusBadge.tsx

import type { StudentStatus } from '../sessiondetail.types';

interface StudentStatusProps {
  status: StudentStatus;
}

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

export default StudentStatusBadge;