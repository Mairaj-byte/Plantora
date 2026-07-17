import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import SearchBar from '../components/SearchBar';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')
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
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
    setCurrentPage(1); // Reset to first page when filters change
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((b, a) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  const resetFilters = () => {
    setCategory([]);
    setSubCategory([]);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  // --- PAGINATION CALCULATIONS ---
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  return (
    <main className="bg-[#f5f7f4] min-h-screen py-8 px-4 sm:px-8 lg:px-16 font-['Work_Sans']">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section (Matching Services Page Style) */}
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

        {/* Global Search Bar Integration (If active) */}
        {showSearch && (
          <div className="mb-8 p-4 bg-white/65 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <SearchBar />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Filter Sidebar Container */}
          <aside className="w-full lg:w-64 lg:sticky lg:top-24 flex-shrink-0">

            {/* Mobile Collapse Toggle Trigger */}
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

            {/* Collapsible Content */}
            <div className={`mt-3 lg:mt-0 space-y-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-stone-200/80 shadow-sm transition-all duration-300 ${showFilter ? 'block' : 'hidden lg:block'}`}>

              {/* Categories Section */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-950 mb-4">Categories</h3>
                <div className="space-y-3">
                  {[
                    { id: 'indoor', value: 'Indoor Plants', label: 'Indoor Plants' },
                    { id: 'creepar', value: 'Creepar', label: 'Creepar' },
                    { id: 'outdoor', value: 'Ground Cover Plants', label: 'Ground Cover Plants' },
                    { id: 'fruit', value: 'Fruit Plants', label: 'Fruit Plants' },
                    { id: 'pot', value: 'Timber', label: 'Timber' },
                    { id: 'exotic', value: 'Shrub', label: 'Shrub' },
                    { id: 'palm', value: 'Palm Tree', label: 'Palm Tree' }
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

              {/* Static Info Block */}
              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/60">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
                  <span>🕒</span>
                  <span>Open 24 Hours</span>
                </div>
                <p className="text-[11px] mt-1 text-emerald-800/80 leading-relaxed">Ready for dynamic pickup or flat-rate delivery anytime.</p>
              </div>

              {/* Reset Button */}
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
              {/* Product Counter / Sorting Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-stone-200/60">
                <span className="text-xs sm:text-sm text-stone-500 font-medium">
                  Showing <span className="font-semibold text-stone-800">{filterProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-{Math.min(indexOfLastProduct, filterProducts.length)}</span> of <span className="font-semibold text-stone-800">{filterProducts.length}</span> luxury specimens
                </span>

                {/* Sort Option */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs sm:text-sm text-stone-500 font-medium whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="bg-white border border-stone-200/80 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 cursor-pointer transition-all duration-200"
                  >
                    <option value="relevant">Relevant Specimens</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Grid layout */}
              {filterProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">No botanical species match the selected criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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

            {/* --- PAGINATION UI CONTROLS --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-12 pb-6">
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
  )
}

export default Collection;