import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Gallery = () => {
  const { search, showSearch } = useContext(ShopContext);
  const [services, setServices] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Services'); // Changed to single state for tabs
  
  const categories = ['All Services', 'Garden', 'Vertical Garden', 'Tapoori', 'Pot Design', 'Design', 'Stone Design'];

  const getServicesData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/services");
      if (response.data.success) {
        setServices(response.data.products.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { getServicesData(); }, []);

  useEffect(() => {
    let productsCopy = services.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (activeCategory !== 'All Services') {
      productsCopy = productsCopy.filter(item => item.category === activeCategory);
    }
    setFilterProducts(productsCopy);
  }, [activeCategory, search, showSearch, services]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">
          Our Versatile Services
        </h1>

        {/* Decorative Leaf Line */}
        <div className="flex items-center justify-center gap-3 w-64 mb-6">
          <div className="flex-1 h-px bg-emerald-800/40"></div>
          {/* Inline SVG Leaf Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-6 h-6 text-emerald-800"
          >
            <path d="M16 8c-1.12 0-2.3.26-3.41.74a10.05 10.05 0 0 0-4.04-1.89C8.36 5.51 8 4 8 4S7 5.92 7 8c0 3.31 2.69 6 6 6h1c.88 0 1.7-.26 2.41-.74A10.05 10.05 0 0 0 20.45 15.1c.19 1.34.55 2.84.55 2.84s-1-1.92-1-4c0-3.31-2.69-6-6-6Zm-3 4H12c-2.21 0-4-1.79-4-4 0-.17.02-.34.05-.5.84.28 1.63.74 2.3 1.34.8.71 1.79 1.16 2.85 1.16h.85c-.53.72-1.23 1.32-2.05 1.7Z" />
          </svg>
          <div className="flex-1 h-px bg-emerald-800/40"></div>
        </div>

        {/* Two-Line Paragraph */}
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our comprehensive range of professional gardening and nursery services <br className="hidden sm:block" />
          designed to help your plants and garden thrive.
        </p>
      </div>

      {/* Modern Tab Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl border transition-all duration-300 text-sm font-medium ${
              activeCategory === cat 
                ? 'bg-emerald-800 text-white border-emerald-800' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-800'
            }`}
          >
            {cat}
          </button>
        ))}


      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {filterProducts.map((item) => (
          <div key={item._id} className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            {/* Note: Adjust ProductItem or wrapper to match the card content style */}
            <ProductItem 
              name={item.name} 
              id={item._id} 
              price={item.price} 
              image={item.image} 
              badge={item.category} 
            />
          </div>
        ))}
      </div>

      {/* CTA Footer */}
      <div className="text-center">
        <button className="bg-emerald-800 text-white px-10 py-3 rounded-full hover:bg-emerald-900 transition-colors">
          View All Services
        </button>
      </div>
    </main>
  );
};

export default Gallery;