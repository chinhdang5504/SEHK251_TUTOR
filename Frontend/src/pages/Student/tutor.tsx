
// import Header from "@/components/Header/Header";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

// interface Tutor {
//   id: number;
//   avatarUrl: string;
//   fullName: string;
//   subject: string;
//   department: { id: number; name: string };
//   bio: string;
// }

// const SearchTutor = () => {
//   // 🔹 Toggle này để chuyển giữa dữ liệu mock và dữ liệu thực từ API backend
//   const USE_API = false;

//   const [tutors, setTutors] = useState<Tutor[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   // 🔹 Mock data hiển thị khi chưa kết nối API
//   const mockTutors: Tutor[] = [
//     {
//       id: 1,
//       avatarUrl: "https://i.pravatar.cc/100?img=1",
//       fullName: "Nguyễn Văn A",
//       subject: "Math, Physics",
//       department: { id: 1, name: "Science" },
//       bio: "Tận tâm, nhiệt tình, giúp học sinh đạt kết quả tốt nhất.",
//     },
//     {
//       id: 2,
//       avatarUrl: "https://i.pravatar.cc/100?img=2",
//       fullName: "Trần Thị B",
//       subject: "English, Literature",
//       department: { id: 2, name: "Languages" },
//       bio: "Kinh nghiệm dạy luyện thi THPT, yêu thích giảng dạy và học hỏi.",
//     },
//   ];

//   // 🔹 Hàm tìm kiếm (tạm mock, sau có thể gọi API thực tế)
//   const fetchTutors = async (query: string) => {
//     setLoading(true);
//     setNotFound(false);

//     try {
//       if (USE_API) {
//         // ✅ TODO: Gọi API thật ở đây, ví dụ:
//         // const res = await fetch(`/api/tutors?search=${query}`);
//         // const data = await res.json();
//         // setTutors(data);
//       } else {
//         // ✅ Dữ liệu mock - lọc theo tên, môn học hoặc khoa
//         const filtered = mockTutors.filter(
//           (t) =>
//             t.fullName.toLowerCase().includes(query.toLowerCase()) ||
//             t.subject.toLowerCase().includes(query.toLowerCase()) ||
//             t.department.name.toLowerCase().includes(query.toLowerCase())
//         );
//         setTutors(filtered);
//         setNotFound(filtered.length === 0);
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       setNotFound(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       {/* 🔹 Header tìm kiếm, có placeholder tùy chỉnh */}
//       <Header
//         onSearch={fetchTutors}
//         loading={loading}
//         notFound={notFound}
//         placeholder="Search tutor by name, subject or department"
//       />

//       <div className="flex flex-1">
//         {/* 🔹 Sidebar trái */}
//         <Sidebar />

//         {/* 🔹 Nội dung chính */}
//         <main className="flex-1 ml-0 xl:ml-[282px] pt-8 px-8 mt-[80px] flex flex-col overflow-y-auto hide-scrollbar h-[calc(100vh-80px)]">
//           {/* Trạng thái loading */}
//           {loading ? (
//             <div className="text-center text-gray-500 mt-10">
//               Đang tải danh sách tutor...
//             </div>
//           ) : notFound ? (
//             // Không tìm thấy
//             <div className="text-center text-gray-600 text-lg font-medium mt-20">
//               Tutor not found
//             </div>
//           ) : (
//             // Danh sách tutor
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {tutors.map((tutor) => (
//                 <div
//                   key={tutor.id}
//                   className="bg-white h-[300px] p-5 shadow-lg relative flex flex-col justify-between rounded-xl transition hover:shadow-xl"
//                 >
//                   {/* Nút yêu thích */}
//                   <Button
//                     variant="ghost"
//                     className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full"
//                   >
//                     <FontAwesomeIcon icon={faHeart} />
//                   </Button>

//                   {/* Thông tin tutor */}
//                   <div className="flex flex-col items-center flex-grow mt-4">
//                     <img
//                       src={tutor.avatarUrl}
//                       alt={tutor.fullName}
//                       className="w-16 h-16 object-cover rounded-full mb-3"
//                     />
//                     <h2 className="text-base font-semibold text-center text-gray-800">
//                       {tutor.fullName}
//                     </h2>
//                     <p className="text-sm text-gray-600 mb-1 text-center line-clamp-1">
//                       {tutor.subject} | {tutor.department.name}
//                     </p>
//                     <p className="text-sm text-center mb-3 line-clamp-3 text-gray-700">
//                       {tutor.bio}
//                     </p>
//                   </div>

//                   {/* Nút xem chi tiết */}
//                   <div className="mt-auto flex justify-center">
//                     <Link to={`/student/tutor-info/${tutor.id}`}>
//                       <Button variant="outline" className="w-[130px]">
//                         View Profile
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* 🔹 Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default SearchTutor;
import Header from "@/components/Header/HeaderSearch"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTutorSearch } from "@/hooks/useTutorSearch"

const SearchTutor = () => {
  const { tutors, loading, notFound, fetchTutors } = useTutorSearch()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onSearch={fetchTutors}
        loading={loading}
        notFound={notFound}
        placeholder="Search tutor by name, subject or department"
      />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-8 px-8 mt-[80px] flex flex-col overflow-y-auto hide-scrollbar h-[calc(100vh-80px)]">
          {loading ? (
            <div className="text-center text-gray-500 mt-10">
              Đang tải danh sách tutor...
            </div>
          ) : notFound ? (
            <div className="text-center text-gray-600 text-lg font-medium mt-20">
              Tutor not found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white h-[300px] p-5 shadow-lg relative flex flex-col justify-between rounded-xl transition hover:shadow-xl"
                >
                  <Button
                    variant="ghost"
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>

                  <div className="flex flex-col items-center flex-grow mt-4">
                    <img
                      src={tutor.avatarUrl}
                      alt={tutor.fullName}
                      className="w-16 h-16 object-cover rounded-full mb-3"
                    />
                    <h2 className="text-base font-semibold text-center text-gray-800">
                      {tutor.fullName}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1 text-center line-clamp-1">
                      {tutor.subject} | {tutor.department.name}
                    </p>
                    <p className="text-sm text-center mb-3 line-clamp-3 text-gray-700">
                      {tutor.bio}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-center">
                    <Link to={`/student/tutor-info/${tutor.id}`}>
                      <Button variant="outline" className="w-[130px]">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default SearchTutor
