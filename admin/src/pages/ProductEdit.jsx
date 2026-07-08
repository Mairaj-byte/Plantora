import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Upload, Save, Loader2 } from 'lucide-react';

const ProductEdit = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form Field States
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestSeller, setBestSeller] = useState(false);
  
  // Handling image alterations
  const [existingImages, setExistingImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
  // Fetch individual product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/product/single`, { productId });
      
      if (response.data.success) {
        const product = response.data.product;
        setName(product.name || '');
        setDescription(product.description || '');
        setPrice(product.price || '');
        setCategory(product.category || '');
        setSubCategory(product.subCategory || '');
        setBestSeller(product.bestseller || false);
        setExistingImages(product.image || []);
      } else {
        toast.error(response.data.message || "Failed to parse product schema");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProductDetails();
  }, [productId]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = [...imageFiles];
      updatedFiles[index] = file;
      setImageFiles(updatedFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check to ensure token exists before making authenticated request
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      
      formData.append('id', productId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestSeller);
      formData.append('existingImages', JSON.stringify(existingImages));

      imageFiles.forEach((file, idx) => {
        if (file) formData.append(`image${idx + 1}`, file);
      });

      // ✅ FIXED: Using dynamic backendUrl environment variable instead of hardcoded string
      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Product updated successfully");
        navigate('/list'); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f9faf7] gap-3 text-[#434843]">
        <Loader2 className="w-8 h-8 text-[#4a6549] animate-spin" />
        <p className="text-sm font-medium italic">Fetching botanical properties...</p>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-4xl mx-auto">
        
        <button 
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-[#434843] hover:text-[#061b0e] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Catalogue
        </button>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">
            Modify Product Parameters
          </h1>
          <p className="text-xs md:text-sm text-[#434843] mt-1">
            Change stock parameters, updates configurations, and manage image grids.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 p-6 md:p-8 space-y-6">
            
            <div>
              <p className="text-xs font-bold text-[#434843] uppercase tracking-wider mb-3">Product Media Grid</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => {
                  const currentPreview = imageFiles[index] 
                    ? URL.createObjectURL(imageFiles[index]) 
                    : existingImages[index];

                  return (
                    <div key={index} className="relative group aspect-square rounded-xl border border-dashed border-[#c3c8c1] bg-[#f3f4f1]/30 hover:bg-[#f3f4f1]/70 transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer overflow-hidden">
                      <input 
                        type="file" 
                        id={`img-upload-${index}`}
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => handleImageChange(e, index)}
                      />
                      {currentPreview ? (
                        <img 
                          src={currentPreview} 
                          alt="preview" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-[#434843]/50">
                          <Upload className="w-5 h-5 mb-1 text-[#434843]/40" />
                          <span className="text-[10px] font-medium">Slot {index + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Plant Display Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Monstera Deliciosa"
                className="w-full px-4 py-2.5 bg-white border border-[#c3c8c1]/40 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all text-[#191c1b]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Botanical Profile / Description</label>
              <textarea 
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe lighting setups, soil configurations, hydration frequencies..."
                className="w-full px-4 py-2.5 bg-white border border-[#c3c8c1]/40 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all text-[#191c1b] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Category</label>
                <input 
                  type="text" 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Indoor"
                  className="w-full px-4 py-2.5 bg-white border border-[#c3c8c1]/40 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all text-[#191c1b]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Sub-Classification</label>
                <input 
                  type="text" 
                  required
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="e.g., Ferns"
                  className="w-full px-4 py-2.5 bg-white border border-[#c3c8c1]/40 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all text-[#191c1b]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Price Scale</label>
                <input 
                  type="number" 
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2.5 bg-white border border-[#c3c8c1]/40 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all text-[#191c1b]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="bestseller"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="w-4 h-4 accent-[#4a6549] border-[#c3c8c1] rounded focus:ring-[#4a6549]/20 cursor-pointer"
              />
              <label htmlFor="bestseller" className="text-xs font-bold text-[#434843] uppercase tracking-wider select-none cursor-pointer">
                Highlight as Catalog Bestseller
              </label>
            </div>

          </div>

          <div className="flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-transparent hover:bg-[#f3f4f1] text-[#434843] border border-transparent transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#4a6549] hover:bg-[#3d533c] rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving records...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Apply Live Changes
                </>
              )}
            </button>
          </div>
        </form>

      </main>
    </div>
  );
};

export default ProductEdit;