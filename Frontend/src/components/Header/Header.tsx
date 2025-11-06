import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import avatarImg from "@/assets/image/avatar.png";
import HeaderNone from "./HeaderNone";

const USE_HEADER_API = false;

interface User {
  userName: string;
  avatar: string;
}

const Header: React.FC = () => {
  const [notiOn, setNotiOn] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [user, setUser] = useState<User>({
    userName: "Tuong",
    avatar: avatarImg,
  });

  // ✅ khai báo ref đúng chuẩn
  const boardRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isStudent = location.pathname.startsWith("/student");
  const isTutor = location.pathname.startsWith("/tutor");

  // ✅ Gọi API header (mock hoặc thật)
  useEffect(() => {
    if (!USE_HEADER_API) return;

    const fetchHeaderData = async () => {
      try {
        const token = localStorage.getItem("sso_token");

        const profileRes = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await profileRes.json();
        if (profileData.success) setUser(profileData.data);

        const notiRes = await fetch("/api/notifications/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const notiData = await notiRes.json();
        if (notiData.success) setNotiOn(notiData.data.notificationsEnabled);
      } catch (error) {
        console.error("Header API error:", error);
      }
    };

    fetchHeaderData();
  }, []);

  // ✅ Đóng menu khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setShowBoard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---
  const handleNotificationToggle = () => setNotiOn((prev) => !prev);
  const handleLogout = () => console.log("Logout clicked");

  const handleViewProfile = () => {
    if (isStudent) navigate("/student/profile");
    else if (isTutor) navigate("/tutor/profile");
    else navigate("/");
  };

  return (
    <HeaderNone
      userName={user.userName}
      avatar={user.avatar}
      notiOn={notiOn}
      showBoard={showBoard}
      onToggleNoti={handleNotificationToggle}
      onToggleBoard={() => setShowBoard((prev) => !prev)}
      onViewProfile={handleViewProfile}
      onLogout={handleLogout}
      boardRef={boardRef} // ✅ truyền đúng ref
    />
  );
};

export default Header;
