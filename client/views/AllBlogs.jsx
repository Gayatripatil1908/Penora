import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiTrendingUp } from "react-icons/fi";
import { BLOG_CATEGORIES } from "../src/constants.js";
import { getCurrentUser } from "../src/util.js";


function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`
      );
      setBlogs(response.data.data);
      
      // Get trending blogs (top 5 by view count)
      const trending = [...response.data.data]
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 5);
      setTrendingBlogs(trending);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  const filteredAndSortedBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      } else if (sortBy === "trending") {
        return b.viewCount - a.viewCount;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#19183B] via-[#708993] to-[#A1C2BD]">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-[90px] pb-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#E7F2EF] mb-4">
            Welcome to Penora
          </h1>
          <p className="text-[#E7F2EF]/80 text-lg md:text-xl max-w-2xl mx-auto">
            Discover amazing stories, insights, and knowledge shared by our community
          </p>
        </motion.div>

        {/* Trending Section */}
        {trendingBlogs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 bg-[#E7F2EF]/10 backdrop-blur-xl rounded-xl p-6 border border-[#E7F2EF]/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="text-[#E7F2EF] text-xl" />
              <h2 className="text-2xl font-semibold text-[#E7F2EF]">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingBlogs.slice(0, 3).map((blog) => (
                <BlogCard key={blog._id} {...blog} highlighted={true} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#E7F2EF]/10 backdrop-blur-xl rounded-xl p-4 border border-[#E7F2EF]/20"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E7F2EF]/70" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#19183B]/20 border border-[#E7F2EF]/30 rounded-lg text-[#E7F2EF] placeholder-[#E7F2EF]/50 focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-[#19183B]/20 border border-[#E7F2EF]/30 rounded-lg text-[#E7F2EF] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50"
            >
              <option value="All">All Categories</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#19183B]">{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#19183B]/20 border border-[#E7F2EF]/30 rounded-lg text-[#E7F2EF] focus:outline-none focus:ring-2 focus:ring-[#A1C2BD]/50"
            >
              <option value="latest" className="bg-[#19183B]">Latest</option>
              <option value="trending" className="bg-[#19183B]">Most Viewed</option>
            </select>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            // Loading skeletons
            [...Array(6)].map((_, index) => (
              <div key={index} className="bg-[#E7F2EF]/10 animate-pulse rounded-xl h-64"></div>
            ))
          ) : filteredAndSortedBlogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[#E7F2EF]/80 text-lg">No blogs found matching your criteria</p>
            </div>
          ) : (
            filteredAndSortedBlogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default AllBlogs;
