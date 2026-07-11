import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Note: Ensure your import stays correct if alias exists or standard 'axios'
import axiosInstance from 'axios'; // Fallback standard instance usage 
import { ArrowLeft, Calendar, User, Clock, Sprout, Leaf } from 'lucide-react';
import { assets } from '../assets/assets';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        // Pointing to your specific single blog endpoint route
        const response = await axios.get(`${backendUrl}/api/blog/single/${id}`);
        if (response.data.success) {
          // Direct assignment since backend structure payload returns an object: response.data.blog
          setBlog(response.data.blog);
        }
      } catch (error) {
        console.error("Error rendering blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#fcfdfa] min-h-screen flex items-center justify-center font-sans text-emerald-800 font-medium">
        Loading article details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#fcfdfa] min-h-screen flex flex-col items-center justify-center font-sans gap-4">
        <p className="text-[#556b5c]">Article not found or has been removed.</p>
        <button onClick={() => navigate(-1)} className="text-sm font-bold text-[#2d6a36] flex items-center gap-1">
          <ArrowLeft size={16} /> Return to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans min-h-screen py-8 px-4 relative overflow-hidden">
      
      {/* Structural Corner Background Assets */}
      <img src={assets.topleft} alt="" className="absolute top-0 left-0 w-32 md:w-44 h-auto pointer-events-none z-0 object-contain opacity-60" />
      <img src={assets.topright} alt="" className="absolute top-0 right-0 w-32 md:w-44 h-auto pointer-events-none z-0 object-contain opacity-60" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-emerald-800 hover:text-black transition-colors duration-300 font-medium text-sm mb-6"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Articles
        </button>

        {/* Category Tag */}
        <div className="mb-3">
          <span className="bg-[#2d6a36] text-white text-[10px] font-bold tracking-widest px-2.5 py-1 rounded uppercase inline-flex items-center gap-1">
            <Sprout size={10} /> {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#14261c] leading-tight mb-4">
          {blog.title}
        </h1>

        {/* Metadata Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#627768] mb-6 pb-4 border-b border-[#e2e8f0]">
          <span className="flex items-center gap-1.5 font-medium text-black">
            <Calendar size={14} className="text-[#326e36]/80" /> {blog.date}
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-black">
            <User size={14} className="text-[#326e36]/80" /> {blog.author}
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium text-black">
            <Clock size={14} className="text-[#326e36]/80" /> {blog.readTime}
          </span>
        </div>

        {/* Display Image Cover */}
        <div className="w-full h-64 md:h-[400px] rounded-[16px] overflow-hidden mb-6 shadow-sm border border-[#f0f4f1]">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Summary Blockquote */}
        {blog.summary && (
          <blockquote className="border-l-4 border-[#2d6a36] bg-[#f4f7f4] p-4 text-[#4a5e51] text-sm italic rounded-r-lg mb-6 leading-relaxed">
            {blog.summary}
          </blockquote>
        )}

        {/* Body Paragraph Content */}
        <div className="text-[#1c2e24] text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
          {blog.paragraph || "No content provided."}
        </div>

        {/* Post Footer Accent */}
        <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-[#f0f4f1]">
          <Leaf size={14} className="text-[#2d6a36] opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;