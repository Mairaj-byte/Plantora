import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  User, 
  Clock, 
  Sprout, 
  Spade, 
  Leaf 
} from 'lucide-react';
import { assets } from '../assets/assets';

const categories = [
  { id: 'all', name: 'All News', icon: null },
  { id: 'plant', name: 'Plant Care', icon: Sprout },
  { id: 'gardening-tips', name: 'Gardening Tips', icon: Spade },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'new-arrivals', name: 'New Arrivals', icon: Leaf },
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blog/list'); 
        if (response.data.success) {
          setBlogPosts(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#fcfdfa] text-[#1c2e24] font-sans min-h-screen py-6 px-4 relative overflow-hidden">
      
      {/* Decorative Viewport-touching Corner Leaves */}
      <img 
        src={assets.topleft} 
        alt="Decorative leaf left" 
        className="absolute top-0 left-0 w-32 md:w-44 h-auto pointer-events-none z-0 object-contain select-none"
      />
      <img 
        src={assets.topright} 
        alt="Decorative leaf right" 
        className="absolute top-0 right-0 w-32 md:w-44 h-auto pointer-events-none z-0 object-contain select-none"
      />

      {/* Navigation Back Header */}
      <div className="max-w-5xl mx-auto mb-4 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-2 cursor-pointer text-emerald-800 hover:text-black transition-colors duration-300 font-medium text-sm"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </button>
      </div>

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-2 text-[#326e36] font-medium tracking-widest text-xs uppercase mb-2">
          <Sprout size={14} /> — OUR NEWS — <Sprout size={14} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#14261c] mb-3">
          Latest <span className="text-[#326e36]">News</span> & <span className="text-[#326e36]">Garden</span> Updates
        </h1>
        
        <div className="flex items-center justify-center gap-2 my-2">
          <div className="w-12 h-[1px] bg-[#326e36]/30"></div>
          <Leaf size={10} className="text-[#326e36]" />
          <div className="w-12 h-[1px] bg-[#326e36]/30"></div>
        </div>

        <p className="text-[#556b5c] max-w-lg mx-auto text-sm leading-relaxed">
          Stay updated with the latest gardening tips, plant care guides, and exciting news from Plantora Nursery.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-8 max-w-5xl mx-auto relative z-10">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#2d6a36] text-white border-[#2d6a36] shadow-sm'
                  : 'bg-white text-[#4a5e51] border-[#e2e8f0] hover:border-[#2d6a36]/50'
              }`}
            >
              {IconComponent && <IconComponent size={14} />}
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Dynamic Blog Grid */}
      {loading ? (
        <div className="text-center py-12 font-medium text-emerald-800">Loading your green feeds...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-[#556b5c]">No articles found in this category.</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 relative z-10">
          {filteredPosts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#f0f4f1] flex flex-col group hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-all duration-300 min-h-[400px]"
            >
              <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => navigate(`/blog/${post._id}`)}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#2d6a36] text-white text-[9px] font-bold tracking-wider px-2 py-1 rounded uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-[11px] text-[#758a7c] mb-2 font-medium">
                  <span className="flex items-center gap-1 text-black">
                    <Calendar size={12} className="text-[#326e36]/80 mb-1" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-black">
                    <User size={12} className="text-[#326e36]/80 mb-1" /> {post.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-black">
                    <Clock size={12} className="text-[#326e36]/80 mb-1" /> {post.readTime}
                  </span>
                </div>

                <h3 
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="text-base font-bold font-sans text-[#14261c] leading-snug mb-2 hover:text-[#2d6a36] cursor-pointer transition-colors line-clamp-2"
                >
                  {post.title}
                </h3>

                <p className="text-[#627768] text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex items-center justify-between mt-auto pt-1">
                  <button 
                    onClick={() => navigate(`/blog/${post._id}`)}
                    className="text-[#2d6a36] font-bold text-xs tracking-wide flex items-center gap-1 group/btn clean-btn"
                  >
                    Read More 
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  
                  <Leaf size={18} className="opacity-10 text-[#2d6a36] pointer-events-none transform translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10 relative z-10">
        <button 
          onClick={() => setActiveCategory('all')} 
          className="bg-[#2d6a36] hover:bg-[#23532a] text-white font-semibold text-xs px-6 py-3 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all duration-300"
        >
          <Sprout size={14} /> View All Articles
        </button>
      </div>
    </div>
  );
};

export default Blog;