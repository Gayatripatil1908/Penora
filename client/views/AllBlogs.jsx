import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch blogs from backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiox.get(`${import.meta.env.VITE_API_URL}/blogs`); // Replace with your backend URL if needed
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-6">
      <Navbar user={user} setUser={setUser} />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 mt-10"
        >
          Welcome to <span className="text-purple-600">Penora</span> 🖋️
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                {/* Blog Image */}
                <img
                  src={
                    blog.image ||
                    "https://cdn.pixabay.com/photo/2016/11/19/14/00/notebook-1835799_960_720.jpg"
                  }
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                {/* Blog Content */}
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    {blog.category} • {new Date(blog.createdAt).toDateString()}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {blog.content.slice(0, 120)}...
                  </p>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-600 text-lg">
              No blogs yet. Be the first to{" "}
              <Link
                to="/new"
                className="text-purple-600 font-medium hover:underline"
              >
                write one!
              </Link>
            </p>
          )
        )}
      </div>
    </div>
  );
}
