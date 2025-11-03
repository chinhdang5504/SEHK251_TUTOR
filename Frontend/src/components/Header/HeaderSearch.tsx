import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";
import avatar from "@/assets/image/avatar.png";
import logo from "@/assets/image/logo.png";
import axios from "axios";

// 🔹 Cờ tổng: true = gọi API toàn bộ header (profile + search), false = dùng mock data
const USE_HEADER_API = false;
// 🔹 Cờ search riêng lẻ: true = gọi API search, false = dùng mock data search
const USE_SEARCH_API = true;

interface User {
  userName: string;
  avatar: string;
}

interface SearchResult {
  id: number;
  name: string;
}

const Header = () => {
  const [notiOn, setNotiOn] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [user, setUser] = useState<User>({ userName: "Tuong", avatar: avatar });
  const boardRef = useRef<HTMLDivElement | null>(null);

  const mockResults: SearchResult[] = [
    { id: 1, name: "Mock Result 1" },
    { id: 2, name: "Mock Result 2" },
    { id: 3, name: "Mock Result 3" },
  ];

  // 🔹 Fetch user info (profile) nếu USE_HEADER_API = true
  const fetchProfile = async () => {
    if (USE_HEADER_API) {
      try {
        // 🔹 Request: GET /api/profile
        // 🔹 Expected Response: { userName: "Tuong", avatar: "url_avatar" }
        const res = await axios.get("/api/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Profile API error:", error);
      }
    }
  };

  const fetchSearch = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    if (USE_SEARCH_API) {
      try {
        // 🔹 Request: GET /api/search?query=${query}
        // 🔹 Expected Response: [{ id: 1, name: "Result 1" }, ...]
        const res = await axios.get("/api/search", { params: { query } });
        setResults(res.data);
      } catch (error) {
        console.error("Search API error:", error);
        setResults([]);
      }
    } else {
      setResults(mockResults.filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
    }
  };

  useEffect(() => {
    fetchProfile(); // 🔹 Gọi API profile khi header load
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

  return (
    <>
      {/* Logo */}
      <div className="fixed z-50 flex items-center" style={{ top: "20px", left: "20px" }}>
        <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Search bar */}
      <div className="fixed z-50 left-[350px] right-[400px] top-5 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchSearch(searchText); // 🔹 Chỉ gọi search khi nhấn Enter
              }
            }}
            placeholder="Search"
            className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:font-semibold transition-all"
          />
          {/* Icon search */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
              searchText || document.activeElement === document.querySelector('input')
                ? "text-red-500"
                : "text-gray-400"
            }`}
          />

          {/* Search results dropdown */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-[12px] shadow-lg z-10">
              {results.map(r => (
                <div key={r.id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  {r.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icon sort */}
        <FontAwesomeIcon
          icon={faArrowDownWideShort}
          className="text-gray-500 ml-5 text-lg cursor-pointer active:text-red-500 transition-colors"
        />
      </div>

      {/* Right side: Notification + Avatar */}
      <div className="fixed z-50 flex items-center gap-4" style={{ top: "20px", right: "20px" }}>
        {/* Notification button */}
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
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-800 text-sm font-medium">{user.userName}</span>
            <FontAwesomeIcon icon={faAngleDown} className="text-gray-600" />
          </button>

          {/* Dropdown */}
          {showBoard && (
            <div className="absolute w-30 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col text-sm">
              <button className="px-4 py-3 text-left hover:bg-gray-100">View Profile</button>
              <button className="px-4 py-3 text-left hover:bg-gray-100">Log out</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
