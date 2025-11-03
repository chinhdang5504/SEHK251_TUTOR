import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import avatar from "@/assets/image/avatar.png";
import logo from "@/assets/image/logo.png";

// 🔹 Cờ tổng: true = gọi API profile + notification status khi header load
const USE_HEADER_API = false;

interface User {
  userName: string;
  avatar: string;
}

const Header = () => {
  const [notiOn, setNotiOn] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [user, setUser] = useState<User>({ userName: "Tuong", avatar: avatar });
  const boardRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Gọi API profile + notification status khi header load
  useEffect(() => {
    if (!USE_HEADER_API) return;

    const fetchHeaderData = async () => {
      try {
        const token = localStorage.getItem("sso_token");

        // 🔹 Fetch profile
        const profileRes = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const profileData = await profileRes.json();
        if (profileData.success) {
          setUser(profileData.data);
        }

        // 🔹 Fetch notification status
        const notiRes = await fetch("/api/notifications/status", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        const notiData = await notiRes.json();
        if (notiData.success) {
          setNotiOn(notiData.data.notificationsEnabled);
        }
      } catch (error) {
        console.error("Header API error:", error);
      }
    };

    fetchHeaderData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setShowBoard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationToggle = async () => {
    setNotiOn(!notiOn);
    // TODO: gọi PUT /api/notifications/settings
  };

  const handleLogout = async () => {
    // TODO: gọi POST /api/auth/logout
    // localStorage.removeItem("sso_token");
    // window.location.href = "/sso/login";
  };

  return (
    <>
      {/* Logo */}
      <div className="fixed z-50" style={{ top: "20px", left: "20px" }}>
        <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Notification + Avatar */}
      <div className="fixed z-50 flex items-center gap-4" style={{ top: "20px", right: "20px" }}>
        <button
          onClick={handleNotificationToggle}
          className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition p-[10px]"
        >
          <FontAwesomeIcon
            icon={notiOn ? faBell : faBellSlash}
            className={notiOn ? "text-red-500" : "text-gray-700"}
          />
        </button>

        <div className="relative" ref={boardRef}>
          <button
            onClick={() => setShowBoard(!showBoard)}
            className="bg-gray-100 inline-flex items-center gap-2 hover:bg-gray-200 transition rounded-[12px] p-[10px] px-[20px] w-auto"
          >
            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-gray-800 text-sm font-medium">{user.userName}</span>
            <FontAwesomeIcon icon={faAngleDown} className="text-gray-600" />
          </button>

          {/* Dropdown */}
          {showBoard && (
            <div className="absolute w-30 right-0 mt-2 bg-white border border-gray-200 rounded-[12px] shadow-lg flex flex-col text-sm">
              <button
                className="px-4 py-3 text-left hover:bg-gray-100"
                onClick={() => (window.location.href = "/profile")}
              >
                View Profile
              </button>
              <button className="px-4 py-3 text-left hover:bg-gray-100" onClick={handleLogout}>
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
