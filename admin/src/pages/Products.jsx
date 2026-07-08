import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Search, Trash2, Edit3, Layers, Tag, Leaf, Eye, AlertCircle } from 'lucide-react';

const Products = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to permanently remove this item from inventory?")) return;
    
    try {
      setIsDeleting(id);
      const response = await axios.post(
        backendUrl + '/api/product/remove', 
        { id }, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Product removed successfully");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsDeleting(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const uniqueCategories = ['All Categories', ...new Set(list.map(item => item.category).filter(Boolean))];
  const totalProducts = list.length;
  const totalCategories = uniqueCategories.length - 1;
  const averagePrice = list.length > 0 ? Math.round(list.reduce((sum, item) => sum + (item.price || 0), 0) / list.length) : 0;

  const filteredList = list.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 h-full">
          
          {/* Section Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">
              Inventory Catalogue
            </h1>
            <p className="text-xs md:text-sm text-[#434843] mt-1">
              Live stock overview, botanical pricing lists, and catalog actions.
            </p>
          </div>

          {/* Quick Metrics Bento Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#4a6549]" /> Total SKUs
              </p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{totalProducts}</span>
                <span className="text-[#4a6549] text-xs font-bold bg-[#ccebc7]/40 px-2 py-0.5 rounded-full">Live catalog</span>
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#4a6549]" /> Plant Categories
              </p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{totalCategories}</span>
                <span className="text-xs text-[#434843]">Active groups</span>
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#4a6549]" /> Avg Variant Price
              </p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">
                  {currency}{averagePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#434843]">Balanced price</span>
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
                  placeholder="Search by botanical or common name..."
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
            <div className="hidden md:grid grid-cols-[80px_2.5fr_1.2fr_1fr_140px] items-center gap-4 py-3.5 px-6 border-b border-[#c3c8c1]/30 bg-[#f3f4f1]/80 text-xs font-bold text-[#434843] uppercase tracking-wider">
              <span>Display</span>
              <span>Plant Name</span>
              <span>Category Classification</span>
              <span>Price Scale</span>
              <span className="text-center">Actions</span>
            </div>

            {/* Product Mapping List Area */}
            <div className="divide-y divide-[#c3c8c1]/20">
              {filteredList.length > 0 ? (
                filteredList.map((item, index) => (
                  <div 
                    className="grid grid-cols-1 md:grid-cols-[80px_2.5fr_1.2fr_1fr_140px] items-center gap-4 p-4 md:p-6 hover:bg-[#f3f4f1]/30 transition-colors" 
                    key={item._id || index}
                  >
                    
                    {/* Column 1: Image Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-[#f3f4f1] border border-[#c3c8c1]/30 overflow-hidden shadow-sm flex items-center justify-center">
                      {item.image && item.image[0] ? (
                        <img 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                          src={item.image[0]} 
                          alt={item.name} 
                        />
                      ) : (
                        <Leaf className="w-6 h-6 text-[#434843]/30 stroke-[1.25]" />
                      )}
                    </div>

                    {/* Column 2: Name & Product ID info */}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#191c1b] truncate md:whitespace-normal">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#434843]/60 font-mono mt-0.5 uppercase tracking-wider">
                        SKU ID: {item._id ? item._id.slice(-8) : `#${index}`}
                      </p>
                    </div>

                    {/* Column 3: Category Label Tag */}
                    <div className="flex md:block items-center justify-between">
                      <span className="text-xs text-[#434843]/40 uppercase font-bold tracking-wider inline md:hidden">Category</span>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-[#f3f4f1] border border-[#c3c8c1]/30 rounded-full text-[#434843]">
                        {item.category || 'Uncategorized'}
                      </span>
                    </div>

                    {/* Column 4: Price details */}
                    <div className="flex md:block items-center justify-between">
                      <span className="text-xs text-[#434843]/40 uppercase font-bold tracking-wider inline md:hidden">Price Tag</span>
                      <span className="text-sm font-bold font-['EB_Garamond'] text-[#061b0e] md:text-base">
                        {currency}{item.price?.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Column 5: Actions (Edit & Delete) */}
                    <div className="flex justify-end md:justify-center items-center gap-2 pt-2 md:pt-0 border-t border-[#c3c8c1]/10 md:border-0 mt-2 md:mt-0">
                      {/* Edit Button */}
                      <button
                        onClick={() => window.location.href = `/product/${item._id}`}
                        className="flex items-center gap-2 justify-center text-[#434843] hover:text-[#4a6549] bg-[#f3f4f1]/50 hover:bg-[#ccebc7]/40 p-2.5 rounded-xl transition-all duration-200 border border-[#c3c8c1]/20 hover:border-[#4a6549]/30 flex-1 md:flex-initial"
                        title="Edit product info"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span className="text-xs font-semibold md:hidden">Edit info</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeProduct(item._id)}
                        disabled={isDeleting === item._id}
                        className="flex items-center gap-2 justify-center text-[#434843] hover:text-[#93000a] bg-[#f3f4f1]/50 hover:bg-[#ffdad6] p-2.5 rounded-xl transition-all duration-200 border border-[#c3c8c1]/20 hover:border-[#ffb4ab] group flex-1 md:flex-initial"
                        title="Remove product variant"
                      >
                        <Trash2 className={`w-4 h-4 transition-transform group-hover:scale-105 ${isDeleting === item._id ? 'animate-pulse text-red-500' : ''}`} />
                        <span className="text-xs font-semibold md:hidden">Delete Item</span>
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-16 flex flex-col items-center justify-center text-[#434843] text-sm italic gap-2">
                  <AlertCircle className="w-5 h-5 text-[#434843]/40" />
                  <span>No products match your active inventory query metrics.</span>
                </div>
              )}
            </div>

            {/* Table Dynamic Footer */}
            <div className="p-4 md:p-6 border-t border-[#c3c8c1]/20 flex justify-between items-center bg-[#f3f4f1]/30 text-xs font-medium text-[#434843]">
              <p>Displaying {filteredList.length} of {list.length} catalog items</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Products;