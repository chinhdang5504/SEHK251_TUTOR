// src/pages/TestPage/components/Header.tsx
import { NavLink } from 'react-router-dom';
import logoImg from '@/assets/image/logo.png';

const Header = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-gray-300 text-gray-900'
        : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-20 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <img 
            src={logoImg} 
            alt="HCMUT Tutor Logo" 
            className="h-15" 
          />
        </NavLink>

        <div className="hidden md:flex items-center gap-4 text-2xl font-medium ">
          <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
          <NavLink to="/session" className={getNavLinkClass}>Session</NavLink>
          <NavLink to="/tutor" className={getNavLinkClass}>Tutor</NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
        </div>

        <div className="flex items-center">
          <NavLink
            to="/login"
            className="bg-[#B3261E] text-white px-5 py-2 rounded-lg font-semibold text-2xl hover:bg-[#9e1f18] transition-colors"
          >
            Sign in
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;