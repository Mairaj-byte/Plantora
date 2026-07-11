import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from "../App"; // Alignment with product setup
import { toast } from "react-toastify"; // Swapped out ugly alert boxes

const BlogAdd = ({ onCancel, onBlogAdded, token }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('');
  const [summary, setSummary] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !paragraph || !author) {
      return toast.error('Title, Author, and Content (Paragraph) are required!');
    }

    if (!token) {
      return toast.error('Not Authorized! Please log in again.');
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category || 'Uncategorized');
    formData.append('author', author);
    formData.append('readTime', readTime || '5 min read');
    formData.append('summary', summary || title.substring(0, 60));
    formData.append('paragraph', paragraph);
    formData.append('date', new Date().toLocaleDateString()); 

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/blog/addblog", 
        formData, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Blog Added Successfully!');
        
        // --- LOGIC ALIGNMENT: Reset Form States on Success ---
        setTitle('');
        setCategory('');
        setAuthor('');
        setReadTime('');
        setSummary('');
        setParagraph('');
        setImage(null);
        
        if (onBlogAdded) {
          onBlogAdded();
        }
      } else {
        if (response.data.message?.toLowerCase().includes('not authorized')) {
          toast.error('Not Authorized! Please login again.');
        } else {
          toast.error(response.data.message || 'Something went wrong.');
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
      if (error.response && error.response.status === 401) {
        toast.error('Not Authorized! Please login again.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to connect to the backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Blog Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Author Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Tech, Lifestyle"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Read Time</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 5 min read"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Short Summary</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Brief overview line..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Article Paragraph</label>
          <textarea
            rows="6"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Write your content paragraphs here..."
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:bg-indigo-400"
          >
            {loading ? 'Uploading...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogAdd;