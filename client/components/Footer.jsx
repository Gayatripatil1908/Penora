import React from "react";
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-[#19183B]/95 text-[#E7F2EF]/90 py-16 mt-20">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#19183B] via-[#A1C2BD] to-[#19183B]" />
      
      <motion.div 
        className="max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <motion.h2 
              className="text-3xl font-bold text-[#E7F2EF] mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Penora
            </motion.h2>
            <p className="text-base leading-relaxed mb-6 text-[#E7F2EF]/80">
              Penora is a space where ideas flow freely.
              Share your thoughts, read inspiring stories,
              and grow with the power of words.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[#A1C2BD]" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#A1C2BD]" />
                <span>contact@penora.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#A1C2BD]" />
                <span>+91 123-456-7890</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-[#E7F2EF] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-[#A1C2BD] transition-colors duration-300 flex items-center space-x-2"
                >
                  <span className="w-2 h-2 bg-[#708993] rounded-full" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/new" 
                  className="hover:text-[#A1C2BD] transition-colors duration-300 flex items-center space-x-2"
                >
                  <span className="w-2 h-2 bg-[#708993] rounded-full" />
                  <span>Write Blog</span>
                </Link>
              </li>

              <li>
                <Link 
                  to="/blogs" 
                  className="hover:text-[#A1C2BD] transition-colors duration-300 flex items-center space-x-2"
                >
                  <span className="w-2 h-2 bg-[#708993] rounded-full" />
                  <span>Read Blogs</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/login" 
                  className="hover:text-[#A1C2BD] transition-colors duration-300 flex items-center space-x-2"
                >
                  <span className="w-2 h-2 bg-[#708993] rounded-full" />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-[#E7F2EF] mb-6">Connect With Us</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#19183B]/40 hover:bg-[#708993]/20 border border-[#E7F2EF]/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={20} className="text-[#A1C2BD]" />
                <span>Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#19183B]/40 hover:bg-[#708993]/20 border border-[#E7F2EF]/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} className="text-[#A1C2BD]" />
                <span>Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#19183B]/40 hover:bg-[#708993]/20 border border-[#E7F2EF]/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} className="text-[#A1C2BD]" />
                <span>Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-[#19183B]/40 hover:bg-[#708993]/20 border border-[#E7F2EF]/10 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} className="text-[#A1C2BD]" />
                <span>GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Line */}
      <div className="relative mt-16">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#19183B] via-[#A1C2BD]/20 to-[#19183B]" />
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <motion.p 
            className="text-center text-[#E7F2EF]/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} <span className="text-[#A1C2BD] font-semibold">Penora</span>. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
