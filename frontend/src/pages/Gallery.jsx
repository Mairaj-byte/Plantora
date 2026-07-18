import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Gallery = () => {
  // FIX: Destructured getServicesData from context so it can be safely invoked inside useEffect
  const { services, search, showSearch, getServicesData } = useContext(ShopContext);
 
  const [filterProducts, setFilterProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [isMounted, setIsMounted] = useState(false);

  const categories = ['All Services', 'Garden', 'Vertical Garden', 'Tapoori', 'Pot Design', 'Design', 'Stone Design'];
  
  useEffect(() => {
    // Safely call if it exists in context, fallback gracefully if already fetched globally
    if (getServicesData) {
      getServicesData();
    }
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, [getServicesData]);

  useEffect(() => {
    let productsCopy = Array.isArray(services) ? services.slice() : [];
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (activeCategory !== 'All Services') {
      productsCopy = productsCopy.filter(item => item.category === activeCategory);
    }
    setFilterProducts(productsCopy);
  }, [activeCategory, search, showSearch, services]);

  return (
    <main className="bg-[#f5f7f4] min-h-screen py-8 px-4 sm:px-8 lg:px-16 font-['Work_Sans']">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className={`transition-all duration-1000 ease-out mb-10 md:mb-16 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 md:gap-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-800 font-bold bg-emerald-100/60 px-4 py-2 rounded-full w-fit">
              Artistic Landscape Showcase
            </span>

            <h1 className="mt-2 text-3xl sm:text-6xl font-light text-[#061b0e] tracking-tight font-['EB_Garamond'] leading-[1.2] sm:leading-[1.1] lg:whitespace-nowrap transition-all duration-500 ease-in-out hover:text-emerald-950">
              Our Versatile <span className="font-semibold italic text-emerald-900">Work & Design</span>
            </h1>

            <p className="text-sm sm:text-[16px] text-[#434843] max-w-[515px] leading-relaxed font-light mt-1">
              Explore our comprehensive range of professional gardening and nursery services designed to help your plants and gardens thrive.
            </p>
          </div>
        </div>

        {/* Swipeable Pill Tabs */}
        <div className="w-full mb-10 overflow-hidden">
          <div className="flex overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 scrollbar-none [mask-image:linear-gradient(to_right,white_85%,transparent)] sm:[mask-image:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-md shadow-emerald-900/10'
                    : 'bg-white text-stone-600 border-stone-200/80 hover:border-emerald-800 hover:text-emerald-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery/Products Grid */}
        {filterProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-stone-200 mb-16">
            <p className="text-xs sm:text-sm text-stone-500 font-medium">No botanical services match the selected category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
            {filterProducts.map((item, index) => (
              <div 
                key={item._id || index} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 ease-out border border-stone-100"
              >
                <ProductItem 
                  name={item.name} 
                  id={item._id} 
                  price={item.price} 
                  image={item.image} 
                  badge={item.category} 
                  subcategory={item.subCategory}
                />
              </div>
            ))}
          </div>
        )}

        {/* CTA Footer */}
        <div className="text-center pb-6">
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm uppercase tracking-widest font-bold px-10 py-4 rounded-full shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            View All Services
          </button>
        </div>

      </div>
    </main>
  );
};

export default Gallery;