import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaPinterest } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 text-center mt-auto border-t border-gray-800">

      {/* Heading */}
      <p className="text-sm mb-4 tracking-wide text-gray-400">
        Connect with the developer
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-4">

        <a href="https://www.instagram.com/kshitishaa" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
          <FaInstagram className="text-gray-400 text-2xl hover:text-white" />
        </a>

        <a href="https://pin.it/5tqmNY1cj" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
          <FaPinterest className="text-gray-400 text-2xl hover:text-white" />
        </a>

        <a href="https://github.com/kshitisha" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
          <FaGithub className="text-gray-400 text-2xl hover:text-white" />
        </a>

        <a href="https://www.linkedin.com/in/kshitisha3333/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
          <FaLinkedin className="text-gray-400 text-2xl hover:text-white" />
        </a>

      </div>

      {/* Brand */}
      <p className="text-sm tracking-wide">
        © {new Date().getFullYear()} <span className="font-semibold text-white">HireHub</span>. All rights reserved.
      </p>

      {/* Signature */}
      <p className="text-xs mt-2 text-gray-500 italic">
        Product Vision & Development — Kshitisha Negi
      </p>

    </footer>
  );
}

export default Footer;