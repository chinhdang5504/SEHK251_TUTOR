import type { Tutor } from '@/types/tutor'

export const mockTutors: Tutor[] = [
  {
    id: '1',
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://i.pravatar.cc/100?img=10',
    subject: 'Math, Physics',
    bio: 'Tận tâm, nhiệt tình, giúp học sinh đạt kết quả tốt nhất.',
    faculty: 'Science',
    teachingSubjects: ['Math', 'Physics'],
    rating: 4.8
  },
  {
    id: '2',
    fullName: 'Trần Thị B',
    email: 'tranthib@example.com',
    avatar: 'https://i.pravatar.cc/100?img=2',
    subject: 'English, Literature',
    bio: 'Kinh nghiệm dạy luyện thi THPT, yêu thích giảng dạy và học hỏi.',
    faculty: 'Languages',
    teachingSubjects: ['English', 'Literature'],
    rating: 4.5
  },
  {
    id: '3',
    fullName: 'Lê Văn C',
    email: 'levanc@example.com',
    avatar: 'https://i.pravatar.cc/100?img=3',
    subject: 'Chemistry, Biology',
    bio: 'Giảng viên Hóa Sinh với hơn 5 năm kinh nghiệm hướng dẫn nghiên cứu.',
    faculty: 'Natural Science',
    teachingSubjects: ['Chemistry', 'Biology'],
    rating: 4.7
  },
  {
    id: '4',
    fullName: 'Phạm Thị D',
    email: 'phamthid@example.com',
    avatar: 'https://i.pravatar.cc/100?img=4',
    subject: 'Computer Science, Programming',
    bio: 'Đam mê lập trình và giảng dạy, giúp sinh viên nắm vững tư duy thuật toán.',
    faculty: 'Information Technology',
    teachingSubjects: ['Computer Science', 'Programming'],
    rating: 4.9
  },
  {
    id: '5',
    fullName: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    avatar: 'https://i.pravatar.cc/100?img=5',
    subject: 'Economics, Finance',
    bio: 'Giúp sinh viên hiểu rõ kinh tế học thực tiễn, ứng dụng tài chính vào đời sống.',
    faculty: 'Business',
    teachingSubjects: ['Economics', 'Finance'],
    rating: 4.6
  }
]
