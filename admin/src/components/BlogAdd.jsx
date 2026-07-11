import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Upload, X, FileText, User, Tag, Clock, AlignLeft } from 'lucide-react';

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
        `${backendUrl}/api/blog/addblog`, 
        formData, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Blog Added Successfully!');
        
        // Reset states
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
    <div className="bg-white p-6 md:p-8 rounded-xl border border-[#c3c8c1]/30 max-w-3xl mx-auto shadow-[0_10px_40px_-10px_rgba(74,101,73,0.04)]">
      <div className="border-b border-[#c3c8c1]/20 pb-4 mb-6">
        <h2 className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">
          Compose New Publication
        </h2>
        <p className="text-xs text-[#434843] mt-0.5">
          Draft system entries, configure editorial fields, and attach media resources.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        
        {/* Dynamic Image Upload Zone */}
        <div>
          <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-2">
            Featured Cover Image
          </label>
          <div className="flex items-center gap-4">
            <label className="group flex flex-col items-center justify-center w-28 h-28 bg-[#f3f4f1]/50 border-2 border-dashed border-[#c3c8c1]/60 hover:border-[#4a6549]/50 rounded-xl cursor-pointer transition-all overflow-hidden relative">
              {image ? (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <Upload className="w-5 h-5 text-[#434843]/60 group-hover:text-[#4a6549] transition-colors stroke-[1.5]" />
                  <span className="text-[10px] font-semibold text-[#434843]/60 mt-1">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            {image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#93000a] bg-[#ffdad6] border border-[#ffb4ab] rounded-lg hover:bg-[#ffb4ab]/40 transition"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
        </div>

        {/* Input Row 1: Title & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-[#4a6549]" /> Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/40 rounded-xl outline-none text-sm text-[#191c1b] placeholder:text-[#434843]/40 transition-all hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
              placeholder="e.g., Cultivating Indoor Ferns"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#4a6549]" /> Author Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/40 rounded-xl outline-none text-sm text-[#191c1b] placeholder:text-[#434843]/40 transition-all hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
              placeholder="e.g., Dr. Jane Elix"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        {/* Input Row 2: Category & Read Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-[#4a6549]" /> Category Group
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/40 rounded-xl outline-none text-sm text-[#191c1b] placeholder:text-[#434843]/40 transition-all hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
              placeholder="e.g., Botany, Gardening"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#4a6549]" /> Estimated Read Time
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/40 rounded-xl outline-none text-sm text-[#191c1b] placeholder:text-[#434843]/40 transition-all hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
              placeholder="e.g., 4 min read"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
        </div>

        {/* Short Summary Input */}
        <div>
          <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlignLeft className="w-3 h-3 text-[#4a6549]" /> Short Summary Meta
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/40 rounded-xl outline-none text-sm text-[#191c1b] placeholder:text-[#434843]/40 transition-all hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
            placeholder="Provide a quick abstract catchphrase line..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {/* Textarea: Full Article Paragraph */}
        <div>
          <label className="block text-xs font-bold text-[#434843] uppercase tracking-wider mb-1">
            Full Article Content <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="6"
            className="w-full px-4 py-3 bg-white border border-[#c3c8c1]/40 rounded-xl outline-none text-sm text-[#191c1b] placeholder:text-[#434843]/40 resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-all hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
            placeholder="Type or paste your narrative rich text paragraphs here..."
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          ></textarea>
        </div>

        {/* Action Triggers */}
        <div className="flex justify-end gap-3 pt-3 border-t border-[#c3c8c1]/10">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-[#434843] bg-[#f3f4f1] border border-[#c3c8c1]/30 rounded-xl hover:bg-[#c3c8c1]/20 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#4a6549] hover:bg-[#3b503a] rounded-xl transition-all shadow-sm disabled:bg-[#4a6549]/50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Publishing...
              </>
            ) : (
              'Publish Entry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogAdd;