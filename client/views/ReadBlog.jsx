import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );
      setBlog(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Loading blog...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <article className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        <p className="text-gray-500 text-sm mb-6">
          By <span className="font-semibold text-gray-700">{blog.author}</span> •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full rounded-xl mb-6"
          />
        )}

        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </article>
    </div>
  );
}

export default ReadBlog;
