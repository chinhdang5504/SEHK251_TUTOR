import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, X } from 'lucide-react';
import avatarImg from '@/assets/image/avatar.png';
import { toast } from 'sonner';
import type { StudentProfileApi } from '@/types/profile';
import { useStudentProfile } from "@/hooks/useStudentProfile";
import DetailHeader from '@/components/HeaderDetail';
import InternalHFooter from '@/components/InternalFooter';

// Mock data nếu BE lỗi
const mockStudent: StudentProfileApi = {
  id: 'S10001',
  fullName: 'Nguyen Van A',
  email: 'student@example.com',
  avatar: '',
  phone: '0123456789',
  address: '123 ABC Street, HCMC',
  dateOfBirth: '2000-01-01',
  sex: 'Male',
  faculty: 'Computer Science',
  improvementSubjects: ['Math', 'Physics']
};

const StudentProfileContent = () => {
  const navigate = useNavigate();

  const { data: studentData, isLoading, isError } = useStudentProfile();
  const [improvementSubjects, setImprovementSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState('');

  const student = isError || !studentData ? mockStudent : studentData;

  useEffect(() => {
    if (student.improvementSubjects) {
      setImprovementSubjects(student.improvementSubjects);
    }
  }, [student]);

  useEffect(() => {
    if (isError) toast.error('Failed to fetch student profile, using mock data');
  }, [isError]);

  if (isLoading && !isError) {
    return <p className='text-center mt-20 text-gray-500'>Loading profile...</p>;
  }

  const addSubject = () => {
    const trimmed = newSubject.trim();
    if (trimmed && !improvementSubjects.includes(trimmed)) {
      setImprovementSubjects([...improvementSubjects, trimmed]);
      setNewSubject('');
    }
  };

  const removeSubject = (subj: string) => {
    setImprovementSubjects(improvementSubjects.filter(s => s !== subj));
  };

  return (
    <main className='container mx-auto px-6 py-8 mt-[80px] bg-white rounded-lg flex flex-col md:flex-row gap-8'>
      {/* Left Sidebar */}
      <aside className='w-full md:w-[280px] flex-shrink-0 sticky top-[100px] self-start'>
        <div className='p-6 flex flex-col items-center border rounded relative bg-gray-50 shadow'>
          <Button
            variant='ghost'
            onClick={() => navigate(-1)}
            className='absolute left-3 top-3 text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='w-5 h-5' />
          </Button>

          <div className='flex justify-center mt-8'>
            <img
              src={student.avatar || avatarImg}
              alt='avatar'
              className='w-32 h-32 rounded-full object-cover'
            />
          </div>

          <h2 className='text-xl font-bold mt-4'>{student.fullName}</h2>
          <p className='text-sm text-gray-500 mt-1 text-center'>{student.email}</p>
        </div>
      </aside>

      {/* Right Content */}
      <section className='flex-1 overflow-y-auto pb-12 pr-4 space-y-6'>
        {/* Personal Info */}
        <div className='p-6 border rounded bg-gray-50 shadow-sm'>
          <h2 className='text-xl font-bold mb-4'>Personal Information</h2>
          <div className='bg-white rounded-lg p-6 shadow-sm border grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='text-sm font-semibold'>Full Name:</label>
              <p className='mt-1'>{student.fullName}</p>
            </div>
            <div>
              <label className='text-sm font-semibold'>Student ID:</label>
              <p className='mt-1'>{student.id}</p>
            </div>
            <div>
              <label className='text-sm font-semibold'>Faculty:</label>
              <p className='mt-1'>{student.faculty}</p>
            </div>
            <div>
              <label className='text-sm font-semibold'>Sex:</label>
              <p className='mt-1'>{student.sex}</p>
            </div>
            <div>
              <label className='text-sm font-semibold'>Date of Birth:</label>
              <p className='mt-1'>{student.dateOfBirth}</p>
            </div>
            <div>
              <label className='text-sm font-semibold'>Phone:</label>
              <p className='mt-1'>{student.phone}</p>
            </div>
            <div className='md:col-span-3'>
              <label className='text-sm font-semibold'>Address:</label>
              <p className='mt-1'>{student.address}</p>
            </div>
          </div>
        </div>

        {/* Improvement Subjects */}
        <div className='p-6 border rounded bg-gray-50 shadow-sm'>
          <h2 className='text-xl font-bold mb-4'>Improvement Subjects</h2>
          <div className='flex flex-wrap gap-2 mb-3'>
            {improvementSubjects.map(subj => (
              <div key={subj} className='flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full'>
                <span>{subj}</span>
                <X className='w-4 h-4 cursor-pointer hover:text-red-500' onClick={() => removeSubject(subj)} />
              </div>
            ))}
          </div>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newSubject}
              onChange={e => setNewSubject(e.target.value)}
              placeholder='Add new subject'
              className='flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200'
            />
            <Button onClick={addSubject} variant='outline'>
              <Plus className='w-4 h-4 mr-1' /> Add
            </Button>
          </div>
        </div>

        {/* Apply to be Tutor */}
        <div className='p-6 border rounded bg-gray-100 shadow-sm'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-bold'>Apply for tutoring</h3>
            <Button onClick={() => console.log('Apply')} variant='outline'>
              Get it now
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const StudentProfile = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <DetailHeader />
      <div className='flex flex-1'>
        <StudentProfileContent />
      </div>
      <InternalHFooter />
    </div>
  )
}

export default StudentProfile;
