import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import { BLOG_CATEGORIES } from "../constants.js";
import { getCurrentUser } from "../util.js";
import { motion } from "framer-motion";
import { FiImage, FiX } from 'react-icons/fi';

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentUser());
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const saveBlog = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please add some content");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("author", user?._id);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs`,
        {
          title : title,
          content : content,
          category : category,
          author : user?._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog saved successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993] to-[#A1C2BD]">
      <Navbar />
      <div className="container mx-auto p-4 pt-[90px] relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-[#E7F2EF]/10 backdrop-blur-xl rounded-xl p-8 shadow-[0_8px_32px_0_rgba(25,24,59,0.37)] border border-[#E7F2EF]/20"
        >
          <h1 className="text-3xl font-bold text-[#E7F2EF] mb-8 text-center">Create New Blog</h1>

          {/* Cover Image Upload */}
          <div className="mb-8">
            <div className="relative">
              {imagePreview ? (
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={removeCoverImage}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-[300px] border-2 border-dashed border-[#E7F2EF]/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#A1C2BD] transition-colors"
                >
                  <FiImage size={40} className="text-[#E7F2EF]/70 mb-2" />
                  <p className="text-[#E7F2EF]/70">Click to upload cover image</p>
                  <p className="text-[#E7F2EF]/50 text-sm mt-1">Max size: 5MB</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter your blog title..."
            className="w-full px-4 py-3 rounded-lg bg-[#19183B]/20 border border-[#E7F2EF]/30 text-[#E7F2EF] placeholder-[#E7F2EF]/50 focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 mb-6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Category Select */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#19183B]/20 border border-[#E7F2EF]/30 text-[#E7F2EF] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 mb-6"
          >
            {BLOG_CATEGORIES.map((cate) => (
              <option key={cate} value={cate} className="bg-[#19183B]">
                {cate}
              </option>
            ))}
          </select>

          {/* Content Editor */}
          <div className="mb-6">
            <MDEditor
              value={content}
              onChange={setContent}
              height={500}
              preview="edit"
              className="bg-[#19183B]/20 border-[#E7F2EF]/30 rounded-lg overflow-hidden"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              className="px-8 py-3 bg-gradient-to-r from-[#19183B]/80 to-[#708993]/80 hover:from-[#19183B] hover:to-[#708993] text-[#E7F2EF] rounded-lg font-semibold backdrop-blur-md border border-[#E7F2EF]/20 focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              type="button"
              onClick={saveBlog}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Publish Blog"}
            </button>
          </div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}

export default NewBlog;