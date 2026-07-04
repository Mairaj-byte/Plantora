import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
  className="
    relative
    min-h-[85vh]
    sm:min-h-[80vh]
    lg:min-h-[90vh]
    w-full
    overflow-hidden
    my-0
    bg-cover
    bg-center
    flex
    items-center
    px-5
    sm:px-10
    lg:px-16
  "
  style={{ backgroundImage: `url(${assets.hero})` }}
>
      {/* Dark overlay gradient to maintain rich text contrast over background details on mobile */}
      <div className='absolute inset-0 bg-black/20 sm:bg-black/10 mix-blend-multiply pointer-events-none' />

      {/* Elegant Left Floating Card Overlay - Adjusted transparency for mobile view */}
      <div className='relative z-10 w-full max-w-xl bg-white/50 sm:bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-xl border border-white/30 sm:border-white/40 text-stone-900 transition-all duration-500 hover:shadow-2xl'>
        
        {/* Plant Badge / Tagline */}
        <div className='inline-flex items-center gap-2 bg-emerald-50/90 sm:bg-emerald-50 text-emerald-800 sm:text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6 shadow-xs sm:shadow-none'>
          <span>🌿</span>
          <span className='tracking-wide uppercase font-semibold text-[10px] sm:text-xs'>Nurturing Growth Since 2016</span>
        </div>

        {/* Serif-Accent Main Headline */}
        <h1 className='text-3xl sm:text-5xl font-light tracking-tight text-stone-950 sm:text-stone-900 leading-[1.15] mb-4'>
          Bring Life to Your <br />
          <span className='italic font-serif text-emerald-900 sm:text-emerald-800 font-medium sm:font-normal'>Outdoor Spaces</span>
        </h1>

        {/* Descriptive Body Text */}
        <p className='text-stone-950 sm:text-stone-600 font-medium sm:font-light text-sm sm:text-base leading-relaxed mb-8 max-w-md'>
          Explore a curated collection of premium plants, shrubs, and trees. We combine affordable quality with professional horticultural expertise.
        </p>

        {/* Modern Interactive Call-to-Actions */}
        <div className='flex flex-wrap items-center gap-4'>
          <button 
            onClick={() => navigate('/collection')}
            className='bg-stone-950 text-white hover:bg-emerald-800 font-medium py-3 px-6 rounded-full text-sm shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-300'
          >
            Explore Plants
          </button>
          
          <button 
            onClick={() => navigate('/about')}
            className='group bg-white/60 sm:bg-transparent text-stone-900 hover:text-emerald-800 font-semibold py-3 px-5 rounded-full text-sm border border-stone-400 sm:border-stone-300 hover:border-emerald-600 flex items-center gap-2 transition-all duration-300 backdrop-blur-xs sm:backdrop-blur-none'
          >
            View Services 
            <span className='transform group-hover:translate-x-1 transition-transform duration-300'>→</span>
          </button>
        </div>

      </div>

      {/* Floating Status Badge at Bottom Right */}
      <div className='absolute bottom-6 right-6 sm:bottom-10 sm:right-12 hidden xs:flex items-center gap-2.5 bg-emerald-50/90 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-emerald-100 shadow-lg animate-bounce duration-1000'>
        <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
        <div className='text-left'>
          <p className='text-[10px] font-bold text-emerald-800 uppercase tracking-wider leading-none mb-0.5'>Always Available</p>
          <p className='text-xs font-semibold text-stone-700 leading-none'>Open 24 Hours</p>
        </div>
      </div>

    </div>
  )
}

export default Hero