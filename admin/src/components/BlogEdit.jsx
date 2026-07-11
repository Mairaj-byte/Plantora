import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const BlogEdit = ({ currentBlog, onUpdateBlog, onCancel, token }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [paragraph, setParagraph] = useState(''); // Synced with 'paragraph' schema from Add component
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync state if the currentBlog prop changes
  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title || '');
      setCategory(currentBlog.category || '');
      // Accounts for backend 'paragraph' structure or frontend mock 'content' structures
      setParagraph(currentBlog.paragraph || currentBlog.content || ''); 
    }
  }, [currentBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !paragraph) {
      return toast.error('Fields cannot be empty!');
    }

    if (!token) {
      return toast.error('Not Authorized! Please log in again.');
    }

    setLoading(true);

    try {
      // Build FormData to support textual data + optional multi-part media uploads
      const formData = new FormData();
      formData.append('id', currentBlog._id || currentBlog.id); // Send unique MongoDB _id or local fallback id
      formData.append('title', title);
      formData.append('category', category);
      formData.append('paragraph', paragraph);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(
        `${backendUrl}/api/blog/editblog`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Changes saved successfully!');
        if (onUpdateBlog) {
          onUpdateBlog();
        }
      } else {
        toast.error(response.data.message || 'Failed to update blog.');
      }
    } catch (error) {
      console.error('Update operation failed:', error);
      toast.error(error.response?.data?.message || 'Something went wrong saving updates.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Update Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Update Category</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Change/Replace Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Edit Content</label>
          <textarea
            rows="6"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition shadow-sm disabled:bg-emerald-400"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEdit;