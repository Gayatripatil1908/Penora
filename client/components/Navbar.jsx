import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#19183B]/95 backdrop-blur-lg shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-wide text-[#E7F2EF] hover:text-[#A1C2BD] transition-colors duration-300"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Penora
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-[#E7F2EF]/90 hover:text-[#E7F2EF] transition-colors duration-300 ${
              isActive("/") && "text-[#A1C2BD]"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/new" 
            className={`text-[#E7F2EF]/90 hover:text-[#E7F2EF] transition-colors duration-300 ${
              isActive("/new") && "text-[#A1C2BD]"
            }`}
          >
            Write Blog
          </Link>

          <Link 
            to="/edit/:id" 
            className={`text-[#E7F2EF]/90 hover:text-[#E7F2EF] transition-colors duration-300 ${
              isActive("/new") && "text-[#A1C2BD]"
            }`}
          >
            Edit Blog
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-[#E7F2EF] hover:text-[#19183B] bg-[#19183B]/40 hover:bg-[#E7F2EF] border border-[#E7F2EF]/20 rounded-lg transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 text-[#E7F2EF] bg-gradient-to-r from-[#19183B] to-[#708993] hover:from-[#708993] hover:to-[#19183B] border border-[#E7F2EF]/20 rounded-lg transition-all duration-300"
            >
              Sign up
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 text-[#E7F2EF]/90 hover:text-[#E7F2EF] border border-[#E7F2EF]/20 rounded-lg transition-colors duration-300"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-[#E7F2EF] hover:text-[#A1C2BD] transition-colors duration-300"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#19183B]/95 backdrop-blur-lg border-t border-[#E7F2EF]/10 shadow-lg"
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              <Link 
                to="/" 
                onClick={toggleMenu} 
                className="text-[#E7F2EF]/90 hover:text-[#E7F2EF] transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/new"
                onClick={toggleMenu}
                className="text-[#E7F2EF]/90 hover:text-[#E7F2EF] transition-colors duration-300"
              >
                Write Blog
              </Link>
              
              <div className="flex flex-col space-y-3 w-full px-8">
                <Link 
                  to="/login" 
                  onClick={toggleMenu}
                  className="px-4 py-2 text-center text-[#E7F2EF] hover:text-[#19183B] bg-[#19183B]/40 hover:bg-[#E7F2EF] border border-[#E7F2EF]/20 rounded-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={toggleMenu}
                  className="px-4 py-2 text-center text-[#E7F2EF] bg-gradient-to-r from-[#19183B] to-[#708993] hover:from-[#708993] hover:to-[#19183B] border border-[#E7F2EF]/20 rounded-lg transition-all duration-300"
                >
                  Sign up
                </Link>
                <Link 
                  to="/" 
                  onClick={toggleMenu}
                  className="px-4 py-2 text-center text-[#E7F2EF]/90 hover:text-[#E7F2EF] border border-[#E7F2EF]/20 rounded-lg transition-colors duration-300"
                >
                  Logout
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Gradient Divider Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#19183B]/50 via-[#A1C2BD]/50 to-[#19183B]/50" />
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
