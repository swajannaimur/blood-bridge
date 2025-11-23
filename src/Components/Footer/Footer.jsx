import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className="bg-white text-[#6c7381] shadow-sm border-t border-gray-200">
  <footer className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

    {/* Left */}
    <p className="text-sm font-medium tracking-wide">
      © {new Date().getFullYear()} — All Rights Reserved
    </p>

    {/* Right - Social Icons */}
    <div className="flex gap-5">
      <Link
        to="https://www.facebook.com/"
        target="_blank"
        aria-label="Facebook"
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
      >
        <FaFacebookF size={18} className="text-[#3b5998]" />
      </Link>

      <Link
        to="https://www.instagram.com/"
        target="_blank"
        aria-label="Instagram"
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
      >
        <FaInstagram size={18} className="text-[#E1306C]" />
      </Link>

      <Link
        to="https://www.github.com/"
        target="_blank"
        aria-label="GitHub"
        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
      >
        <IoLogoGithub size={18} className="text-black" />
      </Link>
    </div>

  </footer>
</div>

    );
};

export default Footer;
