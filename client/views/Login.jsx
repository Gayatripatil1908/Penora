import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    const response =axios.post('http://localhost:8080/login',formData)
    console.log("Login Data:", formData)
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back to <span className="text-purple-600">Penora</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...FormData, email: e.target.value})}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...FormData, password: e.target.value})}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Log In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-3">
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-5 h-5"
            />
            LinkedIn
          </button>
        </div>

        {/* Signup Redirect */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
