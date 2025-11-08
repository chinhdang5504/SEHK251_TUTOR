import { useNavigate } from "react-router-dom";
import Header from "@/components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile"; // hook đã có
import { mockUser } from "@/mocks/user.mock";

// 🔹 Custom UI Components
const Avatar = ({ className, children }: any) => (
  <div
    className={`relative rounded-full overflow-hidden aspect-square ${className}`}
    style={{ flexShrink: 0 }}
  >
    {children}
  </div>
);

const AvatarImage = ({ src }: { src: string }) =>
  src ? <img src={src} alt="avatar" className="w-full h-full object-cover rounded-full" /> : null;

const AvatarFallback = ({ children, className }: any) => (
  <div className={`flex items-center justify-center w-full h-full rounded-full ${className}`}>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder }: any) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
  />
);

const Textarea = ({ value, onChange, placeholder, rows }: any) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
  />
);

const Select = ({ value, onValueChange, children }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {children.find((child: any) => child.props.value === value)?.props.children || "Select..."}
      </div>
      {open && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full shadow-md">
          {children.map((child: any, idx: number) => (
            <div
              key={idx}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onValueChange(child.props.value);
                setOpen(false);
              }}
            >
              {child.props.children}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ children }: any) => children;

// ============================================================
// 🔹 Tutor Profile Content
// ============================================================
const TutorProfileContent = ({ useApi = false }) => {
  const navigate = useNavigate();
  const { user, loading } = useUserProfile(useApi);

  const [tutorData, setTutorData] = useState<any>(null);
  const [preferences, setPreferences] = useState<any>({
    subject: "",
    tutor: "",
    preferredFaculty: "",
    description: "",
  });

  useEffect(() => {
    if (user) {
      setTutorData({ ...mockUser, ...user }); // merge mock + api
      setPreferences(mockUser.supportPreferences);
    }
  }, [user]);

  const handleSaveChanges = () => console.log("💾 Mock save:", preferences);
  const handleApplyForTutoring = () => console.log("💡 Mock apply for tutoring");

  if (loading || !tutorData)
    return <p className="text-center mt-20 text-gray-500">Loading tutor information...</p>;

  return (
    <main className="container mx-auto px-6 py-8 mt-[80px] bg-white rounded-lg flex gap-8">
      {/* 🔹 Left Sidebar */}
      <aside className="w-[280px] flex-shrink-0 sticky top-[100px] self-start">
        <div className="p-6 flex flex-col items-center border rounded relative">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="absolute left-3 top-3 text-gray-600 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>

          <div className="flex justify-center mt-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={tutorData.avatarUrl} />
              {!tutorData.avatarUrl && (
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-600 text-white text-3xl">
                  {tutorData.fullname
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <h2 className="text-xl font-bold mt-4">{tutorData.fullname}</h2>
          <p className="text-sm text-gray-500 mt-1 text-center">{tutorData.email}</p>
        </div>
      </aside>

      {/* 🔹 Right Content */}
      <section className="flex-1 overflow-y-auto pb-12 pr-4">
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="p-6 border rounded bg-gray-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Personal Information</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  "Fullname",
                  "Student ID",
                  "Faculty",
                  "Sex",
                  "Identification number",
                  "Day of birth",
                ].map((label, idx) => (
                  <div key={idx}>
                    <label className="text-sm font-semibold">{label}:</label>
                    <p className="mt-1">
                      {
                        {
                          Fullname: tutorData.fullname,
                          "Student ID": tutorData.studentId,
                          Faculty: tutorData.faculty,
                          Sex: tutorData.sex,
                          "Identification number": tutorData.identificationNumber,
                          "Day of birth": tutorData.dateOfBirth,
                        }[label]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Support Preferences */}
          <div className="p-6 border rounded bg-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Support Preferences</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input
                    value={preferences.subject}
                    onChange={(e: any) =>
                      setPreferences({ ...preferences, subject: e.target.value })
                    }
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tutor</label>
                  <Input
                    value={preferences.tutor}
                    onChange={(e: any) =>
                      setPreferences({ ...preferences, tutor: e.target.value })
                    }
                    placeholder="Enter tutor name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Faculty</label>
                <Select
                  value={preferences.preferredFaculty}
                  onValueChange={(value: string) =>
                    setPreferences({ ...preferences, preferredFaculty: value })
                  }
                >
                  <SelectItem value="cse">Computer Science and Engineering</SelectItem>
                  <SelectItem value="ee">Electrical and Electronics Engineering</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                  <SelectItem value="ce">Civil Engineering</SelectItem>
                  <SelectItem value="che">Chemical Engineering</SelectItem>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={preferences.description}
                  onChange={(e: any) =>
                    setPreferences({ ...preferences, description: e.target.value })
                  }
                  placeholder="Enter description"
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Apply for Tutoring */}
          <div className="p-6 border rounded bg-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Apply for tutoring</h3>
              <Button onClick={handleApplyForTutoring} variant="outline">
                Get it now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// 🔹 Profile page
const Profile = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <Header />
    <div className="flex flex-1">
      <TutorProfileContent useApi={false} /> {/* đổi true nếu muốn call API */}
    </div>
    <Footer />
  </div>
);

export default Profile;
