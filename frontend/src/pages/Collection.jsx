import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
// import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import SearchBar from '../components/SearchBar';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

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

  return (
    /* Reduced overall max-width to max-w-6xl for a tighter layout frame */
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 min-h-screen">
      

      {/* Hero Title Section */}
      <div className="mb-8">
        <h1 className="font-display-lg text-3xl md:text-4xl font-semibold text-primary mb-2">Our Plants</h1>
        <p className="text-sm md:text-base text-on-surface-variant max-w-xl text-gray-600">
          Discover our curated collection of nursery-grown specimens, from rare indoor tropicals to hardy fruit-bearing trees.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Filter Sidebar Container - reduced size slightly to fit tighter shell */}
        <aside className="w-full lg:w-64 flex-shrink-0">

          {/* Mobile Collapse Toggle Trigger */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full lg:hidden flex justify-between items-center py-2.5 px-4 bg-surface-container-low border border-gray-200 rounded-xl mb-4 font-medium text-sm"
          >
            <span className="flex items-center gap-2">
              FILTERS
              {(category.length > 0 || subCategory.length > 0) && (
                <span className="bg-secondary text-[10px] px-1.5 py-0.5 rounded-full text-white">
                  {category.length + subCategory.length}
                </span>
              )}
            </span>
            <img className={`h-2.5 transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="Toggle Filters" />
          </button>

          {/* Collapsible Content */}
          <div className={`sticky top-24 space-y-6 bg-surface-container-low p-5 rounded-xl border border-gray-200/60 transition-all ${showFilter ? 'block' : 'hidden lg:block'}`}>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Categories</h3>
              <div className="space-y-2">
                {[
                  { id: 'indoor', value: 'Indoor Plants', label: 'Indoor Plants' },
                  { id: 'outdoor', value: 'Outdoor Garden', label: 'Outdoor Garden' },
                  { id: 'exotic', value: 'Decorative and Exotic', label: 'Decorative & Exotic' },
                  { id: 'fruit', value: 'Fruit Plants', label: 'Fruit Plants' }
                ].map((cat) => (
                  <label key={cat.id} className="flex items-center group cursor-pointer">
                    <input
                      className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary/20 mr-2.5 accent-emerald-700"
                      type="checkbox"
                      value={cat.value}
                      checked={category.includes(cat.value)}
                      onChange={toggleCategory}
                    />
                    <span className="text-xs text-gray-700 group-hover:text-primary transition-colors">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* SubCategory Filter / Type */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Type</h3>
              <div className="space-y-2">
                {[
                  { id: 'decor', value: 'Home Decor', label: 'Home Decor' },
                  { id: 'office', value: 'Office Plants', label: 'Office Plants' },
                  { id: 'bedroom', value: 'Bedroom Plants', label: 'Bedroom Plants' },
                  { id: 'balcony', value: 'Balcony Plants', label: 'Balcony Plants' }
                ].map((sub) => (
                  <label key={sub.id} className="flex items-center group cursor-pointer">
                    <input
                      className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary/20 mr-2.5 accent-emerald-700"
                      type="checkbox"
                      value={sub.value}
                      checked={subCategory.includes(sub.value)}
                      onChange={toggleSubCategory}
                    />
                    <span className="text-xs text-gray-700 group-hover:text-primary transition-colors">{sub.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Static Info Block */}
            <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 font-medium text-xs">
                <span className="text-[14px]">🕒</span>
                <span>Open 24 Hours</span>
              </div>
              <p className="text-[11px] mt-0.5 text-emerald-700 opacity-80">Ready for pickup or delivery anytime.</p>
            </div>

            {(category.length > 0 || subCategory.length > 0) && (
              <button
                onClick={resetFilters}
                className="w-full py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </aside>

        {/* Right Side Showcase Grid */}
        <div className="flex-grow">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            {/* Product Count */}
            <span className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-800">{filterProducts.length}</span> plants
            </span>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer transition-all duration-200"
              >
                <option value="relevant">Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Optimized grid properties to guarantee at least 3 cards wide from small breakpoints upwards */}
          {filterProducts.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500">No products match the selected configuration criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {filterProducts.map((item, index) => (
                <div key={index} className="group bg-[#F3F4F0] rounded-xl overflow-hidden hover:translate-y-[-2px] transition-all duration-300">
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}

export default Collection