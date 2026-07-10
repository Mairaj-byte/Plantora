import React from 'react'
import { assets } from '../assets/assets'

const WhyChooseUs = () => {
  return (
    <section className='py-16 px-4 sm:px-12 max-w-7xl mx-auto text-stone-800'>

      {/* Header Section */}
      <div className='text-center max-w-xl mx-auto mb-5 mt-8'>
        <h2 className='prata-regular text-3xl sm:text-4xl text-stone-900 mb-4'>
          Why Choose Us
        </h2>
        <p className='text-stone-500 text-sm sm:text-base leading-relaxed font-light'>
          We provide more than just plants; we provide the foundation for your garden's future with quality you can trust.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        {/* Card 1: Premium Quality Plants (Large Image Block) */}
        <div
          className='md:col-span-2 relative min-h-[280px] rounded-2xl overflow-hidden 
          bg-cover bg-center flex items-end p-6 sm:p-8 group shadow-sm hover:shadow-md transition-all duration-300 ease-out group-hover:scale-110'
          style={{ backgroundImage: `url(${assets.garden || 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000'})` }} // Leaf close up image fall-back
        >
          {/* Dark gradient overlay for typography readability */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none' />

          <div className='relative z-10 text-white max-w-md'>
            <h3 className='prata-regular text-xl sm:text-2xl mb-2 tracking-wide'>
              Premium Quality Plants
            </h3>
            <p className='text-stone-200/90 text-xs sm:text-sm font-light leading-relaxed'>
              Every plant is nurtured with care by our experts, ensuring they thrive when they reach your home.
            </p>
          </div>
        </div>

        {/* Card 2: Affordable Quality (Right Cream Container) */}
        <div className='bg-stone-100/70 backdrop-blur-sm border border-stone-200/40 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300'>

          <div>
            <div className="w-12 h-12 flex items-center justify-center mb-6 shadow-lg">
              <i className="fa-solid fa-dollar-sign text-xl"></i>
            </div>
            <h3 className='prata-regular text-xl text-stone-900 mb-3'>
              Affordable Quality
            </h3>
            <p className='text-stone-600 text-sm font-light leading-relaxed mb-6'>
              We believe beautiful gardens shouldn't cost a fortune. Our direct-to-customer pricing ensures you get the best value.
            </p>
          </div>

          <div>
            <hr className='border-stone-200 mb-4' />
            <p className='text-emerald-800 font-bold text-xs tracking-wider uppercase'>
              Starting from ₹99/-
            </p>
          </div>
        </div>



        {/* Card 3: Open 24 Hours (Bottom Peach Container) */}
        <div className='bg-orange-100 border border-orange-100 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300'>
          <div className='text-xl text-stone-800 mb-4'>
            🕒
          </div>
          <h3 className='prata-regular text-lg text-amber-950 mb-2'>
            Open 24 Hours
          </h3>
          <p className='text-stone-600 text-sm font-light leading-relaxed'>
            Whether you're an early bird or a night owl, our doors are always open to serve your landscaping needs.
          </p>
        </div>

        {/* Card 4: Stats Counter (Middle Sage Container) */}
        <div className='bg-emerald-100 border border-emerald-100/80 p-6 sm:p-8 rounded-2xl flex items-center justify-around text-center shadow-sm hover:shadow-md transition-all duration-300'>
          <div>
            <h4 className='text-2xl sm:text-3xl font-light text-emerald-900 tracking-tight'>2000+</h4>
            <p className='text-[11px] font-bold tracking-wider text-emerald-800 uppercase mt-1'>Plants Sold</p>
          </div>

          <div className='w-[1px] h-12 bg-emerald-200' />

          <div>
            <h4 className='text-2xl sm:text-3xl font-light text-emerald-900 tracking-tight'>5+ Years</h4>
            <p className='text-[11px] font-bold tracking-wider text-emerald-800 uppercase mt-1'>Experience</p>
          </div>
        </div>

        {/* Card 5: Testimonial Block (Bottom Light Grey Container) */}
        <div className='bg-stone-100/50 border border-stone-200/30 p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300'>
          <p className='italic text-stone-600 text-sm font-light mb-4 max-w-[240px]'>
            "Best nursery in the region for rare indoor plants."
          </p>
          <div className='flex gap-1 text-emerald-800 text-sm'>
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs