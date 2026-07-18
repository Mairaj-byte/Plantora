import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [isMounted, setIsMounted] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // 7 rows × 3 cards per row = 21 items

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((b, a) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  const resetFilters = () => {
    setCategory([]);
    setSubCategory([]);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => (cb.checked = false));
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // --- PAGINATION CALCULATIONS ---
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  return (
    <main className="bg-[#f5f7f4] min-h-screen py-6 px-4 sm:py-8 sm:px-8 lg:px-16 font-['Work_Sans']">
      <div className="max-w-7xl mx-auto w-full">
        
       {/* Header Section */}
<div className={`transition-all duration-1000 ease-out mb-10 md:mb-16 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 md:gap-6">
    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-800 font-bold bg-emerald-100/60 px-4 py-2 rounded-full w-fit">
      Hand-Grown Specimen Nursery
    </span>

    <h1 className="mt-2 text-3xl sm:text-6xl font-light text-[#061b0e] tracking-tight font-['EB_Garamond'] leading-[1.2] sm:leading-[1.1] lg:whitespace-nowrap transition-all duration-500 ease-in-out hover:text-emerald-950">
      Our Exclusive <span className="font-semibold italic text-emerald-900">Plant Collection</span>
    </h1>

    <p className="text-sm sm:text-[16px] text-[#434843] max-w-[515px] leading-relaxed font-light mt-1">
      Discover our curated collection of nursery-grown specimens, from rare indoor tropicals to hardy fruit-bearing trees.
    </p>
  </div>
</div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Filter Sidebar Container */}
          <aside className="w-full lg:w-64 lg:sticky lg:top-24 flex-shrink-0">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="w-full lg:hidden flex justify-between items-center py-3.5 px-5 bg-white border border-stone-200/80 rounded-2xl shadow-sm font-semibold text-xs tracking-wider text-[#061b0e]"
            >
              <span className="flex items-center gap-2">
                FILTERS
                {(category.length > 0 || subCategory.length > 0) && (
                  <span className="bg-emerald-700 text-[10px] px-2 py-0.5 rounded-full text-white font-bold">
                    {category.length + subCategory.length}
                  </span>
                )}
              </span>
              <img className={`h-2 transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="Toggle Filters" />
            </button>

            <div className={`mt-3 lg:mt-0 space-y-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-stone-200/80 shadow-sm transition-all duration-300 ${showFilter ? 'block' : 'hidden lg:block'}`}>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-950 mb-4">Categories</h3>
                <div className="space-y-3">
                  {[
                    { value: 'Indoor Plants', label: 'Indoor Plants' },
                    { value: 'Creepar', label: 'Creepar' },
                    { value: 'Ground Cover Plants', label: 'Ground Cover Plants' },
                    { value: 'Fruit Plants', label: 'Fruit Plants' },
                    { value: 'Timber', label: 'Timber' },
                    { value: 'Shrub', label: 'Shrub' },
                    { value: 'Palm Tree', label: 'Palm Tree' }
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center group cursor-pointer select-none">
                      <input
                        className="w-4 h-4 rounded border-stone-300/80 text-emerald-700 focus:ring-emerald-500/20 mr-3 accent-emerald-700 cursor-pointer transition-all"
                        type="checkbox"
                        value={cat.value}
                        checked={category.includes(cat.value)}
                        onChange={toggleCategory}
                      />
                      <span className="text-xs text-stone-600 group-hover:text-emerald-900 font-medium transition-colors">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-stone-200/60" />

              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
                  <span>🕒</span>
                  <span>Open 24 Hours</span>
                </div>
                <p className="text-[11px] mt-1 text-emerald-800/80 leading-relaxed">Ready for dynamic pickup or flat-rate delivery anytime.</p>
              </div>

              {(category.length > 0 || subCategory.length > 0) && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2.5 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* Right Side Showcase Grid */}
          <div className="flex-grow w-full flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-stone-200/60">
                <span className="text-xs sm:text-sm text-stone-500 font-medium text-center sm:text-left">
                  Showing <span className="font-semibold text-stone-800">{filterProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-{Math.min(indexOfLastProduct, filterProducts.length)}</span> of <span className="font-semibold text-stone-800">{filterProducts.length}</span> luxury specimens
                </span>

                {/* Swipeable Sort Pill Tabs */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs sm:text-sm text-stone-500 font-medium whitespace-nowrap hidden sm:inline">Sort by:</span>
                  
                  <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-2 w-full sm:w-auto scrollbar-none snap-x snap-mandatory">
                    {[
                      { label: 'Relevant', value: 'relevant' },
                      { label: 'Price: Low-High', value: 'low-high' },
                      { label: 'Price: High-Low', value: 'high-low' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortType(option.value)}
                        className={`px-4 py-2 rounded-xl border text-xs font-semibold tracking-wide whitespace-nowrap snap-align-start transition-all duration-300 ${
                          sortType === option.value
                            ? 'bg-emerald-900 text-white border-emerald-900 shadow-md shadow-emerald-900/10'
                            : 'bg-white text-stone-600 border-stone-200/80 hover:border-emerald-800 hover:text-emerald-900'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filterProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">No botanical species match the selected criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {currentProducts.map((item, index) => (
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
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-12 pb-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-3 py-2 rounded-xl border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-600 bg-white hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                      currentPage === page
                        ? 'bg-emerald-900 text-white shadow-md shadow-emerald-900/10'
                        : 'bg-white border border-stone-200/80 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-2 rounded-xl border border-stone-200/80 text-xs sm:text-sm font-semibold text-stone-600 bg-white hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Collection;