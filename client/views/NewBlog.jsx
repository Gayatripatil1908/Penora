import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MDEditor from '@uiw/react-md-editor';
import { marked } from 'marked';
import toast, { Toaster } from 'react-hot-toast';
import { BLOG_CATEGORIES } from "../src/constants";
import axios from 'axios';
import { getCurrentUser } from "../src/util.js";

export default function NewBlogPage() {
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [user, setUser] = useState(null);
  
  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blogDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setBlogData(draft);
      toast.success('Draft loaded successfully');
    }
  }, []);

  // Auto-save feature
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (blogData.title || blogData.content) {
        localStorage.setItem('blogDraft', JSON.stringify(blogData));
        setLastSaved(new Date());
        toast.success('Draft auto-saved');
      }
    }, 60000); // Auto-save every minute

    return () => clearInterval(autoSaveTimer);
  }, [blogData]);

  // Update word and character count
  useEffect(() => {
    const text = blogData.content;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    setWordCount(words);
    setCharCount(chars);
  }, [blogData.content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleContentChange = (value) => {
    setBlogData({ ...blogData, content: value || '' });
  };

  const handleSaveDraft = () => {
    localStorage.setItem('blogDraft', JSON.stringify(blogData));
    setLastSaved(new Date());
    toast.success('Draft saved successfully');
  };

  const clearDraft = () => {
    localStorage.removeItem('blogDraft');
    setBlogData({
      title: "",
      category: "",
      content: "",
      image: null,
    });
    setLastSaved(null);
    toast.success('Draft cleared');
  };

  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light')
    setUser(getCurrentUser());
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, {
      title: blogData.title,
      category: blogData.category,
      content: blogData.content,
      author: user._id,


   });
    console.log("New Blog:", blogData);
    // TODO: Send formData to backend via POST /api/blogs
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-10 px-5 flex justify-center">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Write a New <span className="text-purple-600">Penora</span> Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter your blog title"
              value={blogData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Science">Science</option>
              <option value="Art">Art</option>
              <option value="History">History</option>
              <option value="Politics">Politics</option>
              <option value="Culture">Culture</option>
              <option value="Business">Business</option>
              <option value="Environment">Environment</option>
              <option value="Fashion">Fashion</option>
              <option value="Music">Music</option>
              <option value="Photography">Photography</option>
              <option value="Writing">Writing</option>
              <option value="DIY">DIY</option>
              <option value="Gaming">Gaming</option>
              <option value="Movies">Movies</option>
              <option value="Books">Books</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Parenting">Parenting</option>
              <option value="Relationships">Relationships</option>
              <option value="Career">Career</option>
              <option value="Productivity">Productivity</option>
              <option value="Self-Improvement">Self-Improvement</option>
              <option value="Travel & Adventure">Travel & Adventure</option>
              <option value="Technology & Gadgets">Technology & Gadgets</option>
              <option value="Food & Cooking">Food & Cooking</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="History & Culture">History & Culture</option>
              <option value="Entertainment & Pop Culture">Entertainment & Pop Culture</option>
              <option value="Other">Other</option>
              
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-purple-500 file:text-white hover:file:bg-purple-600"
            />
            {blogData.image && (
              <img
                src={URL.createObjectURL(blogData.image)}
                alt="Preview"
                className="mt-3 w-full h-60 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Blog Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Blog Content
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  {isPreviewMode ? '✏️ Edit' : '👁️ Preview'}
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={clearDraft}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  🗑️ Clear Draft
                </button>
              </div>
            </div>

            {isPreviewMode ? (
              <div className="prose max-w-none p-4 rounded-lg border border-gray-300 bg-white min-h-[300px]">
                <div dangerouslySetInnerHTML={{ __html: marked(blogData.content) }} />
              </div>
            ) : (
              <MDEditor
                value={blogData.content}
                onChange={handleContentChange}
                preview="edit"
                height={300}
                className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex gap-4">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>
              {lastSaved && (
                <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Publish Blog
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
