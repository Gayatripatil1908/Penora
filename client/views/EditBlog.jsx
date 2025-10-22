import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { BLOG_CATEGORIES } from "../src/constants";
import { getCurrentUser } from "../src/util";
import toast, { Toaster } from "react-hot-toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({ title: "", category: "", content: "", image: "" });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/id/${id}`);
      const data = res.data.data;
      // map populated author to author id or name if needed
      setBlog({
        title: data.title || "",
        category: data.category || "",
        content: data.content || "",
        image: data.image || "",
        author: data.author?._id || null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((b) => ({ ...b, [name]: value }));
  };

  const handleContentChange = (value) => {
    setBlog((b) => ({ ...b, content: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      toast.error("You must be logged in to edit this blog");
      return;
    }

    try {
      const payload = {
        title: blog.title,
        category: blog.category,
        content: blog.content,
        image: blog.image,
        userId: user._id,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/id/${id}`,
        payload,
        { headers: { api_token: "admin" } }
      );

      if (res.data?.success) {
        toast.success("Blog updated successfully");
        setTimeout(() => navigate(`/blogs/${id}`), 700);
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to update blog";
      toast.error(msg);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-10 px-5 flex justify-center">
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
            <input name="title" value={blog.title} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={blog.category} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border">
              <option value="">Select Category</option>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input name="image" value={blog.image} onChange={handleChange} placeholder="Image URL (optional)" className="w-full px-4 py-2 rounded-lg border" />
            {blog.image && <img src={blog.image} alt="preview" className="mt-3 w-full h-48 object-cover rounded-lg" />}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsPreviewMode(!isPreviewMode)} className="text-sm text-purple-600">{isPreviewMode ? '✏️ Edit' : '👁️ Preview'}</button>
              </div>
            </div>

            {isPreviewMode ? (
              <div className="prose max-w-none p-4 rounded-lg border bg-white min-h-[200px]" dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <MDEditor value={blog.content} onChange={handleContentChange} preview="edit" />
            )}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Save Changes</button>
            <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}