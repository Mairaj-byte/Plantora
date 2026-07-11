import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import BlogAdd from '../components/BlogAdd';
import BlogEdit from '../components/BlogEdit';

const Blogs = ({ token }) => {
  // Swapped mock data array for an empty array to house backend response entries
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState('list');
  const [selectedBlog, setSelectedBlog] = useState(null);

  // --- NEW: Function to fetch live blogs from backend database ---
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/blog/list`);
      if (response.data.success) {
        setBlogs(response.data.blogs || response.data.data); 
      } else {
        toast.error(response.data.message || "Failed to load blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error(error.message || "Something went wrong fetching data.");
    }
  };

  // Run the fetch command on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handlers
  const handleAddBlog = () => {
    fetchBlogs(); // Refresh array from DB instead of pushing locally
    setView('list');
  };

  const handleUpdateBlog = () => {
    fetchBlogs(); // Refresh array from DB to reflect backend edits
    setView('list');
    setSelectedBlog(null);
  };

  const handleRemoveBlog = async (id) => {
    if (window.confirm('Are you sure you want to remove this blog?')) {
      try {
        // Aligned with standard MERN deletion routes, passing token validation header
        const response = await axios.post(`${backendUrl}/api/blog/remove`, { id }, { headers: { token } });
        if (response.data.success) {
          toast.success(response.data.message || "Blog deleted successfully!");
          fetchBlogs(); // Sync local state UI view with new backend landscape
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Could not delete blog.");
      }
    }
  };

  const triggerEditView = (blog) => {
    setSelectedBlog(blog);
    setView('edit');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Blog Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and curate your system entries seamlessly.</p>
          </div>
          {view === 'list' && (
            <button
              onClick={() => setView('add')}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition shadow-sm"
            >
              + Create Blog
            </button>
          )}
        </div>

        {/* Dynamic Views Rendering */}
        {view === 'add' && (
          <BlogAdd 
            token={token} 
            onBlogAdded={handleAddBlog} 
            onCancel={() => setView('list')} 
          />
        )}

        {view === 'edit' && (
          <BlogEdit 
            token={token} 
            currentBlog={selectedBlog} 
            onUpdateBlog={handleUpdateBlog} 
            onCancel={() => { setView('list'); setSelectedBlog(null); }} 
          />
        )}

        {view === 'list' && (
          <div>
            {blogs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No blogs posted yet. Click "+ Create Blog" to start.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {blogs.map((blog) => (
                  <div 
                    key={blog._id || blog.id} // Adjust dynamically if your MongoDB sets '_id' strings
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-200"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full mb-3">
                        {blog.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{blog.title}</h3>
                      {/* Check paragraph or content parameters depending on model config */}
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{blog.paragraph || blog.content}</p>
                    </div>

                    <div className="flex justify-end items-center gap-2 border-t border-gray-100 pt-4 mt-2">
                      <button
                        onClick={() => triggerEditView(blog)}
                        className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveBlog(blog._id || blog.id)}
                        className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-md transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;