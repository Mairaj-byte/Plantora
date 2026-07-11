import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import BlogAdd from '../components/BlogAdd';
import BlogEdit from '../components/BlogEdit';
import { Search, Trash2, Edit3, Layers, FileText, Calendar, AlertCircle } from 'lucide-react';

const Blogs = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState('list');
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  // Filtering and Searching States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isDeleting, setIsDeleting] = useState(null);

  // Fetch live blogs from backend database
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/blog/list`);
      if (response.data.success) {
        // Reverse array to mirror the products listing behavior (newest first)
        const blogData = response.data.blogs || response.data.data || [];
        setBlogs([...blogData].reverse());
      } else {
        toast.error(response.data.message || "Failed to load blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error(error.message || "Something went wrong fetching data.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handlers
  const handleAddBlog = () => {
    fetchBlogs();
    setView('list');
  };

  const handleUpdateBlog = () => {
    fetchBlogs();
    setView('list');
    setSelectedBlog(null);
  };

  const handleRemoveBlog = async (id) => {
    if (!window.confirm('Are you sure you want to permanently remove this blog entry?')) return;
    
    try {
      setIsDeleting(id);
      const response = await axios.post(`${backendUrl}/api/blog/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message || "Blog deleted successfully!");
        await fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Could not delete blog.");
    } finally {
      setIsDeleting(null);
    }
  };

  const triggerEditView = (blog) => {
    setSelectedBlog(blog);
    setView('edit');
  };

  // Metrics Data Calculations
  const uniqueCategories = ['All Categories', ...new Set(blogs.map(item => item.category).filter(Boolean))];
  const totalBlogs = blogs.length;
  const totalCategories = uniqueCategories.length - 1;
  const wordCountAvg = blogs.length > 0 
    ? Math.round(blogs.reduce((sum, item) => sum + ((item.paragraph || item.content || '').split(' ').length), 0) / blogs.length) 
    : 0;

  // Filter Logic
  const filteredBlogs = blogs.filter(item => {
    const matchesSearch = (item.title?.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          (item.category?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          ((item.paragraph || item.content)?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-4 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 h-full">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">
                News & Blog Dashboard
              </h1>
              <p className="text-xs md:text-sm text-[#434843] mt-1">
                Live publication entries, content classification metrics, and curation management.
              </p>
            </div>
            {view === 'list' && (
              <button
                onClick={() => setView('add')}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#4a6549] text-white font-medium text-sm rounded-xl hover:bg-[#3b503a] transition shadow-sm self-start md:self-auto"
              >
                + Create Blog Entry
              </button>
            )}
          </div>

          {/* Dynamic Add / Edit views toggle window */}
          {view === 'add' && (
            <div className="bg-white p-6 rounded-xl border border-[#c3c8c1]/30 shadow-sm">
              <BlogAdd 
                token={token} 
                onBlogAdded={handleAddBlog} 
                onCancel={() => setView('list')} 
              />
            </div>
          )}

          {view === 'edit' && (
            <div className="bg-white p-6 rounded-xl border border-[#c3c8c1]/30 shadow-sm">
              <BlogEdit 
                token={token} 
                currentBlog={selectedBlog} 
                onUpdateBlog={handleUpdateBlog} 
                onCancel={() => { setView('list'); setSelectedBlog(null); }} 
              />
            </div>
          )}

          {/* Core List Inventory View */}
          {view === 'list' && (
            <>
              {/* Quick Metrics Bento Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
                  <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#4a6549]" /> Total Entries
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{totalBlogs}</span>
                    <span className="text-[#4a6549] text-xs font-bold bg-[#ccebc7]/40 px-2 py-0.5 rounded-full">Live index</span>
                  </div>
                </div>

                <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
                  <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#4a6549]" /> Hub Categories
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{totalCategories}</span>
                    <span className="text-xs text-[#434843]">Active subjects</span>
                  </div>
                </div>

                <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
                  <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#4a6549]" /> Avg Length
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">
                      {wordCountAvg} <span className="text-xs font-sans text-[#434843]">words</span>
                    </span>
                    <span className="text-xs text-[#434843]">Per publication</span>
                  </div>
                </div>
              </div>

              {/* Table Container Wrapper */}
              <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 flex flex-col overflow-hidden">
                
                {/* Search & Filtering Bars */}
                <div className="p-4 md:p-6 border-b border-[#c3c8c1]/20 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#f3f4f1]/50">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#434843] w-4 h-4" />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all shadow-sm placeholder:text-[#434843]/60 text-[#191c1b]"
                      placeholder="Search by title, category, or content..."
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="w-full md:w-auto">
                    <select
                      className="w-full md:w-auto bg-white border border-[#c3c8c1]/30 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#4a6549]/20 transition-all shadow-sm text-[#434843] cursor-pointer"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      {uniqueCategories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Structured Table Layout Header */}
                <div className="hidden md:grid grid-cols-[2.5fr_1.2fr_1.5fr_140px] items-center gap-4 py-3.5 px-6 border-b border-[#c3c8c1]/30 bg-[#f3f4f1]/80 text-xs font-bold text-[#434843] uppercase tracking-wider">
                  <span>Blog Information Summary</span>
                  <span>Category Classification</span>
                  <span>Teaser Excerpt</span>
                  <span className="text-center">Actions</span>
                </div>

                {/* Product/Blog Mapping List Area */}
                <div className="divide-y divide-[#c3c8c1]/20">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((item, index) => (
                      <div 
                        className="grid grid-cols-1 md:grid-cols-[2.5fr_1.2fr_1.5fr_140px] items-center gap-4 p-4 md:p-6 hover:bg-[#f3f4f1]/30 transition-colors" 
                        key={item._id || item.id || index}
                      >
                        
                        {/* Column 1: Title & Database Index identifiers */}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#191c1b] truncate md:whitespace-normal">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-[#434843]/60 font-mono mt-0.5 uppercase tracking-wider">
                            ENTRY ID: {item._id ? item._id.slice(-8) : `#${index}`}
                          </p>
                        </div>

                        {/* Column 2: Category Label Tag */}
                        <div className="flex md:block items-center justify-between">
                          <span className="text-xs text-[#434843]/40 uppercase font-bold tracking-wider inline md:hidden">Category</span>
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-[#f3f4f1] border border-[#c3c8c1]/30 rounded-full text-[#434843]">
                            {item.category || 'General'}
                          </span>
                        </div>

                        {/* Column 3: Paragraph/Content line snippet */}
                        <div className="flex md:block items-center justify-between min-w-0">
                          <span className="text-xs text-[#434843]/40 uppercase font-bold tracking-wider inline md:hidden">Snippet</span>
                          <p className="text-xs text-[#434843] line-clamp-2 md:line-clamp-1 max-w-xs italic text-right md:text-left">
                            {item.paragraph || item.content || 'No text content preview provided.'}
                          </p>
                        </div>

                        {/* Column 4: Actions (Edit & Delete execution layouts) */}
                        <div className="flex justify-end md:justify-center items-center gap-2 pt-2 md:pt-0 border-t border-[#c3c8c1]/10 md:border-0 mt-2 md:mt-0">
                          {/* Edit Button */}
                          <button
                            onClick={() => triggerEditView(item)}
                            className="flex items-center gap-2 justify-center text-[#434843] hover:text-[#4a6549] bg-[#f3f4f1]/50 hover:bg-[#ccebc7]/40 p-2.5 rounded-xl transition-all duration-200 border border-[#c3c8c1]/20 hover:border-[#4a6549]/30 flex-1 md:flex-initial"
                            title="Edit entry metadata"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span className="text-xs font-semibold md:hidden">Edit View</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveBlog(item._id || item.id)}
                            disabled={isDeleting === (item._id || item.id)}
                            className="flex items-center gap-2 justify-center text-[#434843] hover:text-[#93000a] bg-[#f3f4f1]/50 hover:bg-[#ffdad6] p-2.5 rounded-xl transition-all duration-200 border border-[#c3c8c1]/20 hover:border-[#ffb4ab] group flex-1 md:flex-initial"
                            title="Remove article completely"
                          >
                            <Trash2 className={`w-4 h-4 transition-transform group-hover:scale-105 ${isDeleting === (item._id || item.id) ? 'animate-pulse text-red-500' : ''}`} />
                            <span className="text-xs font-semibold md:hidden">Delete Post</span>
                          </button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="p-16 flex flex-col items-center justify-center text-[#434843] text-sm italic gap-2">
                      <AlertCircle className="w-5 h-5 text-[#434843]/40" />
                      <span>No blog posts match your custom catalog filtering conditions.</span>
                    </div>
                  )}
                </div>

                {/* Table Dynamic Footer elements */}
                <div className="p-4 md:p-6 border-t border-[#c3c8c1]/20 flex justify-between items-center bg-[#f3f4f1]/30 text-xs font-medium text-[#434843]">
                  <p>Displaying {filteredBlogs.length} of {blogs.length} written narratives</p>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default Blogs;