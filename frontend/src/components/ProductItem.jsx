import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className='group block relative bg-white rounded-2xl p-2.5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80' 
      to={`/product/${id}`}
    >
      {/* Image Container with Custom Plant Frame Background */}
      <div className='relative aspect-square w-full rounded-xl overflow-hidden bg-[#F4F6F2] flex items-center justify-center'>
        <img 
          className='object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105' 
          src={image[0]} 
          alt={name} 
        />
        
        {/* Sleek Floating Tag - Dynamically changes based on price availability */}
        <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg border shadow-sm transition-all duration-300 ${
          price === 0 
            ? 'bg-amber-50/90 text-amber-900 border-amber-200/60 backdrop-blur-md group-hover:bg-amber-600 group-hover:text-white group-hover:border-transparent' 
            : 'bg-white/80 backdrop-blur-md border-white/40 text-gray-800 group-hover:bg-emerald-900 group-hover:text-white'
        }`}>
          <p className='text-xs font-semibold tracking-tight transition-colors duration-300'>
            {price === 0 ? "Out of Stock" : `${currency}${price}`}
          </p>
        </div>

        {/* Minimalist "View" Arrow Icon Overlay on Hover */}
        <div className='absolute top-2.5 right-2.5 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-white p-1.5 rounded-full shadow-sm'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-emerald-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>

      {/* Content Details Block */}
      <div className='pt-3 pb-1 px-1'>
        {/* Subtle, premium category/brand indicator */}
        <span className='text-[10px] font-bold tracking-widest text-emerald-700/70 uppercase block mb-0.5'>
          Botanical Specimen
        </span>
        
        {/* Product Name with neat truncation clamp */}
        <h2 className='text-xs sm:text-sm font-medium text-gray-800 group-hover:text-emerald-800 transition-colors duration-300 line-clamp-1'>
          {name}
        </h2>
      </div>
    </Link>
  )
}

export default ProductItem;