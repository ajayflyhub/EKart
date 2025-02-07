import React from "react";
import ekartLogo from "../assets/logo/logoekart.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-[#8fb7e7] text-[#183161] py-8 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-between sm:flex-row">
        {/* Left Section */}
        <Link to="/" className="mb-4 sm:mb-0 text-center sm:text-left">
        <img src={ekartLogo} alt="EKART" className="self-start w-[75px] h-[55px]" />
          <p className="text-sm font-bold">EKART BY AJAY</p>
          <p className="text-sm font-semibold">Your one-stop solution for all your shopping needs.</p>
        </Link>

        {/* Middle Section (Social Media Links or Icons) */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a
            href="/"
            className="text-[#364d79] hover:text-blue-700 hover:font-bold"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="/"
            className="text-[#364d79] hover:text-blue-700 hover:font-bold"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="/"
            className="text-[#364d79] hover:text-blue-700 hover:font-bold"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>

        {/* Right Section */}
        <div className="text-center sm:text-right">
          <p className="text-sm">
            © {new Date().getFullYear()} E-kart by Ajay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
