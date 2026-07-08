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
    <div className='border-t border-b bg-gray-50 text-center px-4 py-4 flex items-center justify-center gap-3 transition-all duration-300'>
      {/* Search Input Container - Adjusted for perfect mobile & desktop scaling */}
      <div className='inline-flex items-center justify-center border border-gray-400 px-4 py-2 rounded-full w-full max-w-md bg-white sm:max-w-lg'>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='flex-1 outline-none bg-inherit text-sm pr-2' 
          type="text" 
          placeholder='Search...'
        />
        {/* Lucide Search Icon */}
        <Search className='w-4 h-4 text-gray-500 shrink-0' />
      </div>
      
      {/* Lucide Close Icon */}
      <X 
        onClick={() => setShowSearch(false)} 
        className='w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors shrink-0' 
      />
    </div>
  ) : null;
};

export default SearchBar;