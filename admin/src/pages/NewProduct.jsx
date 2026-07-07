import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
// Matching lucide-react icons style from Orders page
import { Plus, Image as ImageIcon } from 'lucide-react';

const NewProduct = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (index, file) => {
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Plant added successfully!");

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setBestseller(false);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      loading && setLoading(false);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-8 h-full">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">
                Add New Plant
              </h1>
              <p className="text-xs md:text-sm text-[#434843] mt-1">
                Expand your nursery inventory and establish fresh stock listings.
              </p>
            </div>
          </div>

          {/* Form Card Body Container */}
          <div className="bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(74,101,73,0.06)] border border-[#e1e4df] overflow-hidden p-6 md:p-8">
            <form onSubmit={onSubmitHandler} className="space-y-6">
              
              {/* --- Image Upload Gallery Section --- */}
              <div>
                <p className="text-sm font-semibold text-[#2d322e] mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#4a6549]" /> Upload Media Gallery
                </p>
                <div className="flex flex-wrap gap-4">
                  {images.map((img, index) => (
                    <label key={index} htmlFor={`image${index}`} className="cursor-pointer group">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#f4f6f3] border border-[#c3c8c1]/60 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[#ebefe9] group-hover:border-[#4a6549] group-active:scale-95 shadow-sm">
                        {img ? (
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={URL.createObjectURL(img)}
                            alt=""
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-1">
                            <img className="w-6 opacity-40 group-hover:opacity-80 group-hover:translate-y-[-2px] transition-all duration-300 mb-1" src={assets.upload} alt="" />
                            <span className="text-[10px] text-[#434843]/60 font-semibold group-hover:text-[#4a6549] transition-colors">Slot {index + 1}</span>
                          </div>
                        )}
                      </div>
                      <input
                        hidden
                        id={`image${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* --- Plant Structural Content --- */}
              <div className="space-y-4">
                <div className="w-full">
                  <p className="text-sm font-semibold text-[#2d322e] mb-1.5">Plant Name</p>
                  <input
                    className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#c3c8c1] rounded-xl outline-none text-sm transition-all duration-200 placeholder:text-[#434843]/40 text-[#191c1b] hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
                    type="text"
                    placeholder="e.g., Variegated Monstera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="w-full">
                  <p className="text-sm font-semibold text-[#2d322e] mb-1.5">Description</p>
                  <textarea
                    className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#c3c8c1] rounded-xl outline-none text-sm transition-all duration-200 placeholder:text-[#434843]/40 text-[#191c1b] min-h-[120px] resize-y hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
                    placeholder="Enter care instructions, sunlight requirements, and sizes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* --- Taxonomy Settings & Pricing Matrix --- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#2d322e] mb-1.5">Category</p>
                  <select
                    className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#c3c8c1] rounded-xl text-sm font-medium outline-none transition-all duration-200 text-[#434843] cursor-pointer hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234a6549%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>Select Category</option>
                    <option value="Creepar">🌿 Creepar</option>
                    <option value="Shrub">🌳 Shrub</option>
                    <option value="Fruit Plants">🍎 Fruit Plants</option>
                    <option value="Pot Design">🪴 Pot Design</option>
                    <option value="Indoor Plants">🏠 Indoor Plants</option>
                    <option value="Ground Cover Plants">🍀 Ground Cover Plants</option>
                    <option value="Palm Tree">🌴 Palm Tree</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#2d322e] mb-1.5">Sub Category</p>
                  <select
                    className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#c3c8c1] rounded-xl text-sm font-medium outline-none transition-all duration-200 text-[#434843] cursor-pointer hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234a6549%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>Select Tag</option>
                    <option value="Air Purifying">Air Purifying</option>
                    <option value="Low Maintenance">Low Maintenance</option>
                    <option value="Pet Friendly">Pet Friendly</option>
                    <option value="Flowering">Flowering</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#2d322e] mb-1.5">Product Price</p>
                  <input
                    className="w-full px-4 py-2.5 bg-[#fcfdfa] border border-[#c3c8c1] rounded-xl outline-none text-sm transition-all duration-200 placeholder:text-[#434843]/40 text-[#191c1b] font-medium hover:border-[#4a6549]/60 focus:border-[#4a6549] focus:ring-4 focus:ring-[#4a6549]/10 focus:bg-white shadow-sm"
                    type="number"
                    min="0"
                    placeholder="499"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* --- Custom Badge Meta Attributes --- */}
              <div className="pt-2">
                <label className="flex gap-3 items-center cursor-pointer select-none w-fit group">
                  <input
                    id="bestseller"
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#c3c8c1] text-[#4a6549] transition-all duration-200 focus:ring-[#4a6549]/30 accent-[#4a6549] cursor-pointer group-hover:border-[#4a6549]"
                    checked={bestseller}
                    onChange={() => setBestseller((prev) => !prev)}
                  />
                  <span className="text-sm font-medium text-[#434843] select-none cursor-pointer group-hover:text-[#191c1b] transition-colors">
                    Promote and add to <span className="text-[#4a6549] font-semibold group-hover:underline decoration-2">Bestseller</span> collection
                  </span>
                </label>
              </div>

              {/* --- Bottom Drawer Submission Controls --- */}
              <div className="pt-4 border-t border-[#c3c8c1]/20 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-44 flex items-center justify-center gap-2 bg-[#061b0e] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4a6549] active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#4a6549]/10 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <Plus className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? "Adding Plant..." : "Publish Plant"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default NewProduct;