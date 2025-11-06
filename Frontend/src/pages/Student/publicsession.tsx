// import { useState, useEffect } from "react";
// import Header from "@/components/Header/Header";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";

// interface Session {
//   id: string;
//   title: string;
//   subtitle?: string;
//   date: string;
//   slots: number;
//   tutorName: string;
//   department: string;
//   coverUrl?: string;
// }

// // 🔹 Mock data (demo)
// const mockSessions: Session[] = [
//   {
//     id: "1",
//     title: "Advanced Programming",
//     subtitle:
//       "This session focuses on advanced programming paradigms and design patterns.",
//     date: "30.11.2025",
//     slots: 40,
//     tutorName: "Le Dinh Thuan",
//     department: "Computer Science and Engineering",
//     coverUrl:
//       "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "2",
//     title: "Machine Learning",
//     subtitle:
//       "An introductory yet comprehensive overview of machine learning algorithms, data preprocessing, and model evaluation.",
//     date: "30.11.2025",
//     slots: 40,
//     tutorName: "Duong Huy Tuong",
//     department: "Artificial Intelligence Department of Computational Research",
//     coverUrl:
//       "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: "3",
//     title: "Web Programming",
//     subtitle:
//       "Students will be guided through the complete process of building modern web applications using React, Node.js, and REST APIs.",
//     date: "30.11.2025",
//     slots: 40,
//     tutorName: "Le Thi Nga",
//     department: "Software Engineering",
//     coverUrl:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// // 🔹 API or mock fetch
// const fetchPublicSessions = async (
//   query: string,
//   useApi: boolean
// ): Promise<Session[]> => {
//   if (!useApi) {
//     const q = query.trim().toLowerCase();
//     const filtered = q
//       ? mockSessions.filter(
//           (s) =>
//             s.title.toLowerCase().includes(q) ||
//             (s.subtitle ?? "").toLowerCase().includes(q) ||
//             s.tutorName.toLowerCase().includes(q) ||
//             s.department.toLowerCase().includes(q)
//         )
//       : mockSessions;
//     return new Promise((resolve) => setTimeout(() => resolve(filtered), 300));
//   }

//   const res = await fetch(
//     `/api/public-sessions?query=${encodeURIComponent(query)}`
//   );
//   if (!res.ok) throw new Error("Failed to fetch sessions");
//   const json = await res.json();
//   return json.items;
// };

// // 🔹 Main component
// const PublicSessions = () => {
//   const USE_API = false;
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const fetchData = async (query: string) => {
//     setLoading(true);
//     setNotFound(false);
//     try {
//       const data = await fetchPublicSessions(query, USE_API);
//       setSessions(data);
//       setNotFound(data.length === 0);
//     } catch {
//       setNotFound(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData("");
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header
//         onSearch={fetchData}
//         loading={loading}
//         notFound={notFound}
//         placeholder="Search public sessions by title, tutor, or department"
//       />

//       <div className="flex flex-1">
//         <Sidebar />

//         <main className="flex-1 ml-0 xl:ml-[282px] mt-[80px] flex flex-col overflow-y-auto hide-scrollbar h-[calc(100vh-80px)]">
//           {/* ✅ Padding responsive, max 100px */}
//           <div className="px-5 sm:px-10 lg:px-[100px] pb-10">
//             <h1 className="text-lg font-semibold mb-6">Public sessions</h1>

//             {loading ? (
//               <div className="text-center text-gray-500 mt-10">Đang tải...</div>
//             ) : notFound ? (
//               <div className="text-center text-gray-600 text-lg font-medium mt-20">
//                 No public sessions found
//               </div>
//             ) : (
//               <div className="flex flex-col gap-6">
//                 {sessions.map((s) => (
//                   <div
//                     key={s.id}
//                     className="flex flex-col sm:flex-row bg-gray-100 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
//                   >
//                     {/* ✅ Ảnh full height */}
//                     <div className="sm:w-[260px] flex justify-center items-center bg-gray-200">
//                       <img
//                         src={s.coverUrl ?? "/images/sessions/placeholder.jpg"}
//                         alt={s.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* ✅ Nội dung có padding riêng */}
//                     <div className="flex-1 bg-white px-6 py-5 flex flex-col justify-center">
//                       {/* --- TAGS --- */}
//                       <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
//                         <div className="flex items-center flex-wrap gap-2">
//                           <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg">
//                             {s.date}
//                           </span>
//                           <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg">
//                             {s.slots} slots
//                           </span>

//                           {/* ✅ Department tag (truncate nếu quá dài) */}
//                           <span
//                             className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg truncate max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
//                             title={s.department}
//                           >
//                             {s.department}
//                           </span>
//                         </div>

//                         <span className="text-sm text-gray-600 font-medium">
//                           By {s.tutorName}
//                         </span>
//                       </div>

//                       {/* --- TITLE --- */}
//                       <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
//                         {s.title}
//                       </h2>

//                       {/* --- DESCRIPTION --- */}
//                       <p className="text-sm text-gray-700 line-clamp-3 mb-3">
//                         {s.subtitle}
//                       </p>

//                       {/* --- BUTTONS --- */}
//                       <div className="flex justify-end gap-3">
//                         <Button
//                           variant="outline"
//                           className="w-[100px] h-[36px] text-sm"
//                         >
//                           Details
//                         </Button>
//                         <Button
//                           variant="outline"
//                           className="w-[100px] h-[36px] text-sm"
//                         >
//                           Register
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default PublicSessions;
import Header from "@/components/Header/HeaderSearch";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { usePublicSessions } from "@/hooks/usePublicSessions";

const PublicSessions = () => {
  const { sessions, loading, notFound, fetchData } = usePublicSessions();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onSearch={fetchData}
        loading={loading}
        notFound={notFound}
        placeholder="Search public sessions by title, tutor, or department"
      />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] mt-[80px] flex flex-col overflow-y-auto hide-scrollbar h-[calc(100vh-80px)]">
          <div className="px-5 sm:px-10 lg:px-[100px] pb-10">
            <h1 className="text-lg font-semibold mb-6">Public sessions</h1>

            {loading ? (
              <div className="text-center text-gray-500 mt-10">Đang tải...</div>
            ) : notFound ? (
              <div className="text-center text-gray-600 text-lg font-medium mt-20">
                No public sessions found
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col sm:flex-row bg-gray-100 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <div className="sm:w-[260px] flex justify-center items-center bg-gray-200">
                      <img
                        src={s.coverUrl ?? "/images/sessions/placeholder.jpg"}
                        alt={s.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 bg-white px-6 py-5 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg">
                            {s.date}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg">
                            {s.slots} slots
                          </span>
                          <span
                            className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg truncate max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
                            title={s.department}
                          >
                            {s.department}
                          </span>
                        </div>

                        <span className="text-sm text-gray-600 font-medium">
                          By {s.tutorName}
                        </span>
                      </div>

                      <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
                        {s.title}
                      </h2>

                      <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                        {s.subtitle}
                      </p>

                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          className="w-[100px] h-[36px] text-sm"
                        >
                          Details
                        </Button>
                        <Button
                          variant="outline"
                          className="w-[100px] h-[36px] text-sm"
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PublicSessions;
