import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";
import avatar from "@/assets/image/avatar.png";
import logo from "@/assets/image/logo.png";

const USE_HEADER_API = false;

interface User {
  userName: string;
  avatar: string;
}

const Header = () => {
  // 🔹 State cơ bản
  const [notiOn, setNotiOn] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [user, setUser] = useState<User>({ userName: "Tuong", avatar });

  // 🔹 Dropdown state
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  // 🔹 Input text
  const [subjectText, setSubjectText] = useState("");
  const [departmentText, setDepartmentText] = useState("");
  const [timeText, setTimeText] = useState("");

  // 🔹 Mock data dropdown
  const mockDepartment = ["Khoa CNTT", "Khoa Kinh tế", "Khoa Ngôn ngữ"];
  const mockSubject = ["Cấu trúc dữ liệu", "Kinh tế vi mô", "Ngữ pháp tiếng Anh"];
  const mockTime = ["Sáng Thứ 2", "Chiều Thứ 3", "Sáng Thứ 6"];

  // 🔹 Ref xử lý click outside
  const boardRef = useRef<HTMLDivElement | null>(null);
  const subjectRef = useRef<HTMLDivElement | null>(null);
  const departmentRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !boardRef.current?.contains(e.target as Node) &&
        !subjectRef.current?.contains(e.target as Node) &&
        !departmentRef.current?.contains(e.target as Node) &&
        !timeRef.current?.contains(e.target as Node)
      ) {
        setShowBoard(false);
        setSubjectOpen(false);
        setDepartmentOpen(false);
        setTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Gọi API Search (tạm mock)
  const handleSearch = async () => {
    // 🔸 Request body giả lập
    const body = {
      department: departmentText || null,
      subject: subjectText || null,
      time: timeText || null,
    };

    console.log("📡 Sending search request...", body);

    if (!USE_HEADER_API) {
      // Mock tạm (chưa có API thật)
      console.log("✅ Search success (mock):", body);
      return;
    }

    // 🔸 API thật sau này (comment mẫu)
    /*
      POST /api/search
      body: { department, subject, time }
      response: { success: true, data: [...] }
    */
    try {
      const token = localStorage.getItem("sso_token");
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) console.log("✅ Search success:", data.data);
      else console.error("❌ Search failed:", data.error);
    } catch (err) {
      console.error("⚠️ Search API error:", err);
    }
  };

  // 🔹 Class input
  const inputClass = (open: boolean) =>
    `w-full py-2 pr-8 text-sm outline-none overflow-hidden text-ellipsis transition-all ${
      open ? "border-b-2 border-red-500" : ""
    }`;

  return (
    <>
      {/* 🔹 Logo */}
      <div className="fixed z-50 flex items-center" style={{ top: 20, left: 20 }}>
        <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
      </div>

      {/* 🔹 Search bar */}
      <div className="fixed z-50 left-[350px] right-[400px] top-5 flex items-start gap-5">
        <div className="flex-1 flex gap-2 bg-white rounded-lg border border-gray-300 shadow-sm ">
          {/* Search icon */}
          <div
            className="flex items-center px-3 text-gray-400 cursor-pointer hover:text-red-500 transition"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          {/* Department */}
          <div className="relative flex-1" ref={departmentRef}>
            <input
              type="text"
              value={departmentText}
              onChange={(e) => setDepartmentText(e.target.value)}
              placeholder="Department"
              className={inputClass(departmentOpen)}
            />
            <button
              onClick={() => {
                setDepartmentOpen(!departmentOpen);
                setSubjectOpen(false);
                setTimeOpen(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {departmentOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                {mockDepartment.map((opt, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDepartmentText(opt);
                      setDepartmentOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="relative flex-1" ref={subjectRef}>
            <input
              type="text"
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              placeholder="Subject"
              className={inputClass(subjectOpen)}
            />
            <button
              onClick={() => {
                setSubjectOpen(!subjectOpen);
                setDepartmentOpen(false);
                setTimeOpen(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {subjectOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                {mockSubject.map((opt, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSubjectText(opt);
                      setSubjectOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Time */}
          <div className="relative flex-1" ref={timeRef}>
            <input
              type="text"
              value={timeText}
              onChange={(e) => setTimeText(e.target.value)}
              placeholder="Time"
              className={inputClass(timeOpen)}
            />
            <button
              onClick={() => {
                setTimeOpen(!timeOpen);
                setSubjectOpen(false);
                setDepartmentOpen(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {timeOpen && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                {mockTime.map((opt, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setTimeText(opt);
                      setTimeOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sort icon */}
        <FontAwesomeIcon
          icon={faArrowDownWideShort}
          className="text-gray-500 text-lg cursor-pointer active:text-red-500 transition-colors mt-2"
        />
      </div>

      {/* 🔹 Notification + Avatar */}
      <div className="fixed z-50 flex items-center gap-4" style={{ top: 20, right: 20 }}>
        {/* Notification */}
        <button
          onClick={() => setNotiOn(!notiOn)}
          className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition p-[10px]"
        >
          <FontAwesomeIcon
            icon={notiOn ? faBell : faBellSlash}
            className={notiOn ? "text-red-500" : "text-gray-700"}
          />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={boardRef}>
          <button
            onClick={() => setShowBoard(!showBoard)}
            className="bg-gray-100 inline-flex items-center gap-2 hover:bg-gray-200 transition rounded-[12px] p-[10px] px-[20px] w-auto"
          >
            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-gray-800 text-sm font-medium">{user.userName}</span>
            <FontAwesomeIcon icon={faAngleDown} className="text-gray-600" />
          </button>

          {showBoard && (
            <div className="absolute w-36 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col text-sm">
              <button
                className="px-4 py-3 text-left hover:bg-gray-100"
                onClick={() => (window.location.href = "/profile")}
              >
                View Profile
              </button>
              <button
                className="px-4 py-3 text-left hover:bg-gray-100"
                onClick={() => console.log("Logout clicked")}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
