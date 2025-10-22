import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide transition link-brand hover:text-accent">
          Penora
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="transition hover:text-accent link-brand">
            Home
          </Link>
          <Link to="/new" className="transition hover:text-accent link-brand">
            Write Blog
          </Link>
          
          <Link to="/about" className="transition hover:text-accent link-brand">
            About
          </Link>
          <Link to="/login" className="btn-brand">
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
            <Link to="/" onClick={toggleMenu} className="link-brand hover:text-accent">
              Home
            </Link>
            <Link
              to="/new-blog"
              onClick={toggleMenu}
              className="link-brand hover:text-accent"
            >
              Write Blog
            </Link>
            <Link to="/about" onClick={toggleMenu} className="link-brand hover:text-accent">
              About
            </Link>
            <Link to="/login" onClick={toggleMenu} className="btn-brand">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
