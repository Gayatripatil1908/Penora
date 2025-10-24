import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { BLOG_CATEGORIES } from "../src/constants.js";
import { motion } from "framer-motion";
import { Save, Send, ArrowLeft, FileText, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const loadBlog = async () => {
    if (!slug) return;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );

    const blogData = response?.data?.data;

    setTitle(blogData?.title);
    setContent(blogData?.content);
    setCategory(blogData?.category);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlog();
  }, []);

  const updateBlog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        {
          title,
          content,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved as draft", {
          icon: '📝',
          duration: 3000,
        });
        setTimeout(() => {
          navigate('/my-blogs');
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating blog");
    } finally {
      setIsLoading(false);
    }
  };

  const publishBlog = async () => {
    if (!title || !content) {
      toast.error("Title and content are required to publish");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog published successfully! 🎉", {
          icon: '🚀',
          duration: 3000,
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error publishing blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent via-[#19183B] to-[#19183B]">
      <div className="fixed inset-0 bg-gradient-to-b from-[#19183B] via-[#19183B]/95 to-[#19183B]/90 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 mt-20">
          {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-[#E7F2EF]/10 hover:bg-[#E7F2EF]/20 transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6 text-[#E7F2EF]" />
            </motion.button>
            <h1 className="text-3xl font-bold text-[#E7F2EF]">Edit Blog</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateBlog}
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-[#19183B]/40 hover:bg-[#708993]/20 text-[#E7F2EF] rounded-lg border border-[#E7F2EF]/20 transition-colors duration-300"
            >
              <Save className="w-5 h-5" />
              <span>Save Draft</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={publishBlog}
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#19183B] to-[#708993] hover:from-[#708993] hover:to-[#19183B] text-[#E7F2EF] rounded-lg border border-[#E7F2EF]/20 transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              <span>Publish</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Title Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FileText className="w-5 h-5 text-[#A1C2BD]" />
            </div>
            <input
              type="text"
              placeholder="Enter your blog title..."
              className="w-full pl-12 pr-4 py-4 bg-[#E7F2EF]/5 border border-[#E7F2EF]/10 rounded-lg text-[#E7F2EF] placeholder-[#E7F2EF]/50 focus:outline-none focus:border-[#A1C2BD]/30 transition-colors duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Select */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Tag className="w-5 h-5 text-[#A1C2BD]" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#E7F2EF]/5 border border-[#E7F2EF]/10 rounded-lg text-[#E7F2EF] focus:outline-none focus:border-[#A1C2BD]/30 transition-colors duration-300"
            >
              {BLOG_CATEGORIES.map((cate) => (
                <option 
                  key={cate} 
                  value={cate}
                  className="bg-[#19183B] text-[#E7F2EF]"
                >
                  {cate}
                </option>
              ))}
            </select>
          </div>

          {/* Markdown Editor */}
          <div className="rounded-lg overflow-hidden border border-[#E7F2EF]/10">
            <MDEditor
              value={content}
              onChange={setContent}
              height={500}
              preview="edit"
              className="bg-[#E7F2EF]/5"
              textareaProps={{
                placeholder: "Write your blog content here...",
              }}
            />
          </div>
        </motion.div>
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#19183B',
            color: '#E7F2EF',
            border: '1px solid rgba(231, 242, 239, 0.1)',
          },
        }}
      />
    </div>
  );
}

export default EditBlog;