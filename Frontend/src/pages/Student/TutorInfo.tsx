import { useParams } from "react-router-dom";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import TutorCalendar from "@/components/TutorCalendar";
import { Button } from "@/components/ui/button";
import { useTutorInfo } from "@/hooks/useTutorInfo";

const TutorInfo = () => {
  const { id } = useParams<{ id: string }>();
  const {
    tutor,
    classes,
    isAvailable,
    availableHours,
    handleEnroll,
    handleDateSelect,
  } = useTutorInfo(id, false); // false = mock, true = call API

  if (!tutor) return <div className="text-center mt-10">Tutor not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 relative">
        <Sidebar />

        <main className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col gap-6 mt-[50px] ml-0 xl:ml-[282px] mr-72">
          {/* Tutor Info */}
          <div className="border p-4 rounded-[12px]">
            <h2 className="font-semibold text-gray-700 mb-2 text-lg">Tutor Information</h2>
            <div className="flex items-start gap-12">
              <img src={tutor.avatarUrl} alt={tutor.fullName} className="w-35 h-35 rounded-[2px] object-cover" />
              <div className="flex-1 space-y-2 text-sm">
                <p><strong>Tutor:</strong> {tutor.fullName}</p>
                <p><strong>Faculty:</strong> {tutor.faculty}</p>
                <p><strong>Email:</strong> {tutor.email}</p>
                <p><strong>Phone:</strong> {tutor.phone}</p>
                <p><strong>Available Classes:</strong> {tutor.availableClasses}</p>
              </div>
            </div>
          </div>

          {/* Current Sessions */}
          <div className="border p-4 rounded-[12px]">
            <h2 className="font-semibold text-gray-700 text-lg mb-2">Current Sessions</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(cls => (
                  <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{cls.date}</td>
                    <td className="px-4 py-3">{cls.time}</td>
                    <td className="px-4 py-3">{cls.subject}</td>
                    <td className="px-4 py-3">{cls.room}</td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant={cls.status === "Full" || cls.status === "Enrolled" ? "secondary" : "destructive"}
                        disabled={cls.status !== "Enroll"}
                        onClick={() => handleEnroll(cls)}
                      >
                        {cls.status}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="w-72 flex-shrink-0 fixed right-0 top-[64px] h-[calc(100vh-50px)] p-4 flex flex-col gap-6">
          <div className="bg-white rounded-[12px] border border-gray-300 p-4">
            <TutorCalendar onSelectDate={handleDateSelect} />
          </div>
          {isAvailable !== null && (
            <div className={`p-4 rounded-[12px] text-center ${isAvailable ? "bg-red-600 text-white" : "bg-gray-200 text-black"}`}>
              {isAvailable ? (
                <>
                  <p className="font-semibold mb-1">Available to contact</p>
                  <p className="text-sm">Hours: {availableHours}</p>
                </>
              ) : (
                <p className="text-sm">Not available to contact</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorInfo;
