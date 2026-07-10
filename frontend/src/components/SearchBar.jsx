import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
// Importing Lucide Icons
import { Search, X } from 'lucide-react'; 

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className='w-full backdrop-blur-md sticky top-0 z-50 px-4 py-3 sm:py-4 flex items-center justify-center transition-all duration-300 ease-in-out'>
      
      {/* Search Input Container */}
      <div className='flex items-center justify-between w-full max-w-2xl gap-3 md:gap-4'>
        
        <div className='relative flex-1 flex items-center group'>
          {/* Left-aligned Search Icon */}
          <Search className='absolute left-4 w-4 h-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none' />
          
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='w-full pl-11 pr-10 py-2.5 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50/50' 
            type="text" 
            placeholder='Search products, brands, and more...'
          />

          {/* Clear text button (Only shows when user has typed something) */}
          {search && (
            <button 
              onClick={() => setSearch('')}
              className='absolute right-3 p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all'
            >
              <X className='w-3.5 h-3.5' />
            </button>
          )}
        </div>
        
        {/* Close Search Overlay Button */}
        <button
          onClick={() => setShowSearch(false)} 
          className='p-2.5 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-emerald-700 active:scale-95 transition-all shrink-0 border border-transparent hover:border-emerald-50 hover:bg-emerald-50/30'
          aria-label="Close search"
        >
          <X className='w-5 h-5' />
        </button>
      </div>

    </div>
  ) : null;
};

export default SearchBar;