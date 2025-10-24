import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Calendar, User, Mail, Tag } from "lucide-react";

function ReadBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );
      setBlog(response.data.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "dark");
    fetchBlog();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-[#19183B] to-[#19183B]">
      <div className="fixed inset-0 bg-gradient-to-b from-[#19183B] via-[#19183B]/95 to-[#19183B]/90 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        
        <div className="container max-w-4xl mx-auto px-4 py-8 mt-20">
          {/* Back Button and Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-[#E7F2EF]/10 hover:bg-[#E7F2EF]/20 transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6 text-[#E7F2EF]" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#19183B] to-[#708993] rounded-full border border-[#E7F2EF]/20"
            >
              <Tag className="w-4 h-4 text-[#E7F2EF]" />
              <span className="text-[#E7F2EF]">{blog.category}</span>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#E7F2EF] mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-6 mb-8 text-[#E7F2EF]/70"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#A1C2BD]" />
              <span>{new Date(blog.publishedAt || blog.updatedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#A1C2BD]" />
              <span>{blog.viewCount} views</span>
            </div>
          </motion.div>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8 p-4 bg-[#E7F2EF]/5 rounded-lg border border-[#E7F2EF]/10"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#708993] to-[#A1C2BD] text-[#19183B] font-bold text-xl">
              {blog?.author?.name?.substring(0, 1)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 text-[#E7F2EF]">
                <User className="w-4 h-4 text-[#A1C2BD]" />
                <span className="font-medium">{blog?.author?.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#E7F2EF]/70">
                <Mail className="w-4 h-4 text-[#A1C2BD]" />
                <span>{blog?.author?.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="rounded-lg overflow-hidden border border-[#E7F2EF]/10 bg-[#E7F2EF]/5 p-6">
              <MDEditor.Markdown 
                source={blog.content}
                style={{ background: 'transparent' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ReadBlog;