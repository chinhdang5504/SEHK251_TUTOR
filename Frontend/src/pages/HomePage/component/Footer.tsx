// src/pages/TestPage/components/Footer.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12">
      <div className="container mx-auto px-4">
        {/* Phần trên: 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mb-8">
          
          {/* Cột 1: Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>hcmuttutor@hcmut.edu.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} />
                <span>+91 91813 23 2309</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1" />
                <div>
                  <span>Cơ sở 1: 268 Lý Thường Kiệt, Phường Diên Hồng, TP HCM</span>
                  {/* Link Cơ sở 1 giữ nguyên hoặc cập nhật nếu cần */}
                  <a href="https://maps.app.goo.gl/PqHZDoWCxapEeV6r5" className="text-blue-400 hover:underline ml-1">(Bản đồ)</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1" />
                <div>
                  <span>Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP HCM</span>
                  {/* ✅ ĐÃ CẬP NHẬT LINK CƠ SỞ 2 TẠI ĐÂY */}
                  <a href="https://maps.app.goo.gl/YLape9XuvCGhc27Q8" className="text-blue-400 hover:underline ml-1">(Bản đồ)</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Cột 2: About us */}
          <div className="pl-55">
            <h3 className="text-xl font-bold text-white mb-4">About us</h3>
            <ul className="space-y-3 text-lg">
              <li><a href="#" className="hover:text-white transition-colors">Achievements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Goals</a></li>
            </ul>
          </div>

          {/* Cột 3: Visitors */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold text-white mb-4">Number of visitors: 5,000</h3>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Social Icons */}
        <div className="flex justify-center gap-7 mb-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors"><FontAwesomeIcon icon={faFacebookF} size="2xl" /></a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors"><FontAwesomeIcon icon={faInstagram} size="2xl" /></a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors"><FontAwesomeIcon icon={faTwitter} size="2xl" /></a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors"><FontAwesomeIcon icon={faLinkedinIn} size="2xl" /></a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-white pb-8">
          Copyright © 2025 – HCMUT TUTOR
        </div>

      </div>
    </footer>
  );
};

export default Footer;