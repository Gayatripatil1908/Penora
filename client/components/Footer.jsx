import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Penora</h2>
          <p className="text-sm leading-relaxed">
            Penora is a space where ideas flow freely.  
            Share your thoughts, read inspiring stories,  
            and grow with the power of words.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/new-blog" className="hover:text-blue-400 transition">
                Write Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5">
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <Twitter size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">Penora</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
