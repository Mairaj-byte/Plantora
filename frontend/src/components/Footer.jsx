import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-[#0b2216] text-stone-300 border-t border-emerald-950 mt-24 sm:mt-40 transition-colors duration-300 font-sans'>
      <div className='max-w-7xl mx-auto px-6 py-16 md:py-24'>
        
        {/* Main Grid Content */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12'>
          
          {/* Brand & About Section */}
          <div className='md:col-span-5 flex flex-col gap-6'>
            <img 
              src={assets.logo1} 
              className='w-28 opacity-90 hover:opacity-100 transition-opacity' 
              alt="Nursery Logo" 
            />
            <p className='text-sm leading-relaxed text-stone-400 max-w-sm'>
              We bring you thoughtfully nurtured plants that combine natural beauty, longevity, and freshness, ensuring every specimen is handled with care while delivering a seamless, green experience you can trust.
            </p>
            {/* Elegant Social Placeholder Grid */}
            <div className='flex gap-4 items-center pt-2'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
              <p className='text-xs font-semibold tracking-wider uppercase text-emerald-400/80'>
                Follow our green journey
              </p>
              
            </div>
          </div>

          {/* Spacer for aesthetic balance on wider viewports */}
          <div className='hidden lg:block lg:col-span-1'></div>

          {/* Company Links Section */}
          <div className='md:col-span-3 flex flex-col gap-5'>
            <p className='text-xs font-bold tracking-widest uppercase text-white'>
              Company
            </p>
            <ul className='flex flex-col gap-3 text-sm text-stone-400'>
              {['Home', 'About us', 'Delivery', 'Privacy policy'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className='hover:text-emerald-300 transition-colors duration-200 ease-in-out relative block w-fit after:block after:content-[""] after:absolute after:h-[1px] after:bg-emerald-400 after:w-0 hover:after:w-full after:transition-all after:duration-300'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className='md:col-span-3 flex flex-col gap-5'>
            <p className='text-xs font-bold tracking-widest uppercase text-white'>
              Get In Touch
            </p>
            <ul className='flex flex-col gap-3 text-sm text-stone-400'>
              <li>
                <a href="tel:+12124567890" className='hover:text-emerald-300 transition-colors duration-200'>
                  +1-212-456-7890
                </a>
              </li>
              <li>
                <a href="mailto:contact@nursery.com" className='hover:text-emerald-300 transition-colors duration-200 underline underline-offset-4 decoration-emerald-800 hover:decoration-emerald-300'>
                  contact@nursery.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className='pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-wide text-stone-500'>
          <p>© 2026 nursery.com. All Rights Reserved.</p>
          <div className='flex gap-6 opacity-85'>
            <span className='hover:text-stone-300 cursor-pointer transition-colors'>Terms of Service</span>
            <span className='hover:text-stone-300 cursor-pointer transition-colors'>Cookie Policy</span>
            <span className='hover:text-stone-300 cursor-pointer transition-colors'>
              <a href="http://localhost:5173/" target="_blank" rel="noreferrer" className='hidden sm:block'>
                   Admin Panel
              </a>
           
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer