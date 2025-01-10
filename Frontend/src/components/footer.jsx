import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#364d79] text-white py-8 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-between sm:flex-row">
        {/* Left Section */}
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h2 className="text-xl font-bold">E-kart by Ajay</h2>
          <p className="text-sm">Your one-stop solution for all your shopping needs.</p>
        </div>

        {/* Middle Section (Social Media Links or Icons) */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a
            href="/"
            className="text-white hover:text-gray-300"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300"
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
