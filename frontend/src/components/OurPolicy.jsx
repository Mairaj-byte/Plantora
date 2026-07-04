import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    // Changed class to w-full (or w-screen) and removed margins/padding to span full viewport width
    <section className='w-full bg-stone-100/60 py-10 border-y border-stone-200/40 backdrop-blur-sm'>
      {/* Wrapped content container to retain structured padding and center alignment internally */}
      <div className='max-w-[1280px] mx-auto px-4 sm:px-12 p-8 sm:p-12'>
        
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 md:gap-12 text-center'>
          
          {/* Policy Item 1: Transit Freshness Guarantee */}
          <div className='flex flex-col items-center group max-w-xs mx-auto'>
            <div className='w-16 h-16 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:border-emerald-800/20 group-hover:shadow transition-all duration-300'>
              <img src={assets.exchange_icon} className='w-7 h-7 object-contain opacity-80' alt="Freshness Icon" />
            </div>
            <h3 className='font-serif text-stone-900 font-semibold text-base mb-2 tracking-wide'>
              Secure Transit Guarantee
            </h3>
            <p className='text-stone-500 font-light text-xs sm:text-sm leading-relaxed'>
              Specially engineered eco-packaging ensures your specimens arrive vibrant, secure, and fully intact.
            </p>
          </div>

          {/* Policy Item 2: Freshness/Arrive Alive Policy */}
          <div className='flex flex-col items-center group max-w-xs mx-auto'>
            <div className='w-16 h-16 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:border-emerald-800/20 group-hover:shadow transition-all duration-300'>
              <img src={assets.quality_icon} className='w-7 h-7 object-contain opacity-80' alt="Quality Guarantee Icon" />
            </div>
            <h3 className='font-serif text-stone-900 font-semibold text-base mb-2 tracking-wide'>
              Freshness Coverage
            </h3>
            <p className='text-stone-500 font-light text-xs sm:text-sm leading-relaxed'>
              We guarantee nursery-fresh health. Reach out within 7 days if your plant shows any signs of transit stress.
            </p>
          </div>

          {/* Policy Item 3: Horticultural Expert Support */}
          <div className='flex flex-col items-center group max-w-xs mx-auto'>
            <div className='w-16 h-16 bg-white border border-stone-200/60 rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:border-emerald-800/20 group-hover:shadow transition-all duration-300'>
              <img src={assets.support_img} className='w-7 h-7 object-contain opacity-80' alt="Expert Guidance Support Icon" />
            </div>
            <h3 className='font-serif text-stone-900 font-semibold text-base mb-2 tracking-wide'>
              Horticultural Guidance
            </h3>
            <p className='text-stone-500 font-light text-xs sm:text-sm leading-relaxed'>
              Gain lifetime access to our expert botanical support team for personal growth and watering guidance.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default OurPolicy