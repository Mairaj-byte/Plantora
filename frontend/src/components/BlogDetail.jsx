import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Clock, Sprout, Leaf, Bookmark } from 'lucide-react';
import { assets } from '../assets/assets';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/blog/single/${id}`);
        
        if (response.data.success) {
          const currentPost = response.data.blog;
          setBlog(currentPost);

          try {
            const listResponse = await axios.get(`${backendUrl}/api/blog/list`);
            if (listResponse.data.success && Array.isArray(listResponse.data.blogs)) {
              const matchedItems = listResponse.data.blogs
                .filter(item => (item._id !== currentPost._id && item.id !== currentPost.id))
                .filter(item => item.category?.toLowerCase() === currentPost.category?.toLowerCase())
                .slice(0, 3);
              
              setRelatedBlogs(matchedItems);
            }
          } catch (err) {
            console.error("Could not fetch related items context:", err);
          }
        }
      } catch (error) {
        console.error("Error rendering blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogAndRelated();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#fcfdfa] min-h-screen flex flex-col gap-3 items-center justify-center font-sans text-[#4a6549] font-medium p-4">
        <span className="w-6 h-6 border-2 border-[#4a6549]/30 border-t-[#4a6549] rounded-full animate-spin"></span>
        <p className="text-xs tracking-wider text-[#434843]/70 uppercase font-bold">Synchronizing Narrative...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#fcfdfa] min-h-screen flex flex-col items-center justify-center font-sans gap-4 px-4 text-center">
        <p className="text-[#434843] font-medium text-sm sm:text-base">Article data cannot be located or it might have been unlisted from the index.</p>
        <button 
          onClick={() => navigate('/blogs')} 
          className="text-xs font-bold uppercase tracking-wider text-[#4a6549] bg-[#f3f4f1] border border-[#c3c8c1]/30 px-4 py-2 rounded-xl hover:bg-[#c3c8c1]/20 transition-all flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft size={14} /> Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfa] text-[#061b0e] font-sans min-h-screen py-6 sm:py-10 px-4 relative overflow-hidden">
      
      {/* Dynamic SEO Meta Content Engine Injection */}
      <Helmet>
        <title>{`${blog.title} — Editorial Publications`}</title>
        <meta name="description" content={blog.summary || blog.paragraph?.substring(0, 155)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.summary || blog.paragraph?.substring(0, 155)} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Structural Decoration Corner Accents - Hidden or shrunken on small mobile to avoid text overlap layout failures */}
      {assets?.topleft && <img src={assets.topleft} alt="" className="absolute top-0 left-0 w-24 sm:w-32 md:w-44 h-auto pointer-events-none z-0 object-contain opacity-30 select-none" />}
      {assets?.topright && <img src={assets.topright} alt="" className="absolute top-0 right-0 w-24 sm:w-32 md:w-44 h-auto pointer-events-none z-0 object-contain opacity-30 select-none" />}

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Navigation Action Trigger header tracking */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-[#434843] hover:text-[#4a6549] transition-colors font-semibold text-xs uppercase tracking-wider mb-5 sm:mb-6"
        >
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Articles
        </button>

        {/* Semantic Article Tag Content Container */}
        <article>
          <div className="mb-3 sm:mb-4">
            <span className="bg-[#4a6549] text-white text-[9px] sm:text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md uppercase inline-flex items-center gap-1.5 shadow-sm">
              <Sprout size={11} /> {blog.category || 'General'}
            </span>
          </div>

          {/* Core Editorial Title Headliner */}
          <h1 className="text-2xl sm:text-3xl md:text-[44px] font-['EB_Garamond'] font-medium text-[#061b0e] leading-[1.2] sm:leading-[1.15] mb-4 sm:mb-5 tracking-tight">
            {blog.title}
          </h1>

          {/* Meta Documentation Bar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] sm:text-xs text-[#434843] mb-6 sm:mb-8 pb-4 border-b border-[#c3c8c1]/30">
            <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
              <Calendar size={13} className="text-[#4a6549]/70" /> {blog.date}
            </span>
            <span className="text-[#c3c8c1] hidden xs:inline">•</span>
            <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
              <User size={13} className="text-[#4a6549]/70" /> {blog.author}
            </span>
            <span className="text-[#c3c8c1] hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
              <Clock size={13} className="text-[#4a6549]/70" /> {blog.readTime || '4 min read'}
            </span>
          </div>

          {/* Hero Banner Visual Layer */}
          <div className="w-full h-48 sm:h-80 md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-[0_12px_30px_-15px_rgba(74,101,73,0.15)] border border-[#c3c8c1]/20">
            <img 
              src={blog.image} 
              alt={`Cover illustration for article titled ${blog.title}`} 
              className="w-full h-full object-cover select-none" 
            />
          </div>

          {/* Synopses Statement Abstract Wrapper */}
          {blog.summary && (
            <div className="border-l-4 border-[#4a6549] bg-[#f3f4f1]/60 px-4 sm:px-5 py-3 sm:py-4 text-[#434843] text-sm md:text-base italic rounded-r-xl mb-6 sm:mb-8 leading-relaxed shadow-sm">
              {blog.summary}
            </div>
          )}

          {/* Document Content Output Block */}
          <div className="text-[#191c1b] text-sm sm:text-[15px] md:text-[17px] leading-[1.65] sm:leading-[1.75] space-y-4 sm:space-y-5 whitespace-pre-line font-normal tracking-wide antialiased">
            {blog.paragraph || "No article contents provided."}
          </div>
        </article>

        {/* Structural Footer Divider Indicator */}
        <div className="flex items-center justify-center gap-2 mt-12 sm:mt-16 mb-8 sm:mb-12">
          <div className="h-[1px] bg-[#c3c8c1]/30 w-12 sm:w-16"></div>
          <Leaf size={14} className="text-[#4a6549] opacity-40" />
          <div className="h-[1px] bg-[#c3c8c1]/30 w-12 sm:w-16"></div>
        </div>

        {/* Dynamic Contextual Related Publications Component Deck */}
        {relatedBlogs.length > 0 && (
          <section className="mt-10 sm:mt-12 pt-4 border-t border-[#c3c8c1]/20">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Bookmark className="w-4 h-4 text-[#4a6549]" />
              <h3 className="text-base sm:text-lg font-['EB_Garamond'] font-semibold tracking-wide text-[#061b0e]">
                Continue Reading in {blog.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {relatedBlogs.map((related) => (
                <Link
                  key={related._id || related.id}
                  to={`/blog/${related._id || related.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[#c3c8c1]/20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(74,101,73,0.08)] hover:border-[#4a6549]/30 transition-all duration-300 flex flex-col"
                >
                  <div className="w-full h-32 sm:h-36 overflow-hidden bg-[#f3f4f1]">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <span className="text-[9px] font-bold text-[#4a6549] tracking-wider uppercase mb-1 block">
                      {related.readTime || '3 min read'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-medium text-[#061b0e] line-clamp-2 group-hover:text-[#4a6549] transition-colors leading-snug">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default BlogDetail;