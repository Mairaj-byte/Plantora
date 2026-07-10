import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, badge, category, subcategory }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className='group block relative bg-[#F3F4F0] rounded-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80' 
      to={`/product/${id}`}
    >
      {/* Image Container with Custom Plant Frame Background */}
      <div className='relative aspect-square w-full rounded-t-xl overflow-hidden bg-[#F3F4F0] flex items-center justify-center'>
        
        <img 
          className='object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105' 
          src={image[0]} 
          alt={name} 
        />
        
        {/* Floating "Indoor" Tag (Optional, styled like your image badge) */}
        <div className='absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm'>
          <span className='text-[10px] font-bold uppercase tracking-widest text-orange-800/60'>{badge}</span>
        </div>



      </div>

      {/* Content Details Block */}
      <div className='pt-4 pb-1 px-2'>
        {/* Product Name (Matches your premium serif style setup) */}
        <h2 className='text-xl font-medium text-gray-900 group-hover:text-emerald-900 transition-colors duration-300 line-clamp-1 font-serif'>
          {name}
        </h2>

        {/* Subtle category/brand indicator */}
        <span className='text-xs text-gray-500 block mt-1 mb-4'>
          {subcategory}
        </span>
        
        {/* Bottom Row: Price and Dynamic View Details Component */}
        <div className='flex items-center justify-between pt-1'>
          {/* Price */}
          <p className='text-sm font-bold text-emerald-800 sm:text-xl'>
            {price === 0 ? "Out of Stock" : `${currency}${price}`}
          </p>

          {/* View Details Link Component with Animated Arrow */}
          <div className='flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-900'>
            <span>View Details</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-3 h-3 sm:w-4 sm:h-4 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default ProductItem;