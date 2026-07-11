import React from 'react'

const Footer = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Privacy policy', path: '/privacy' },
    { name: 'News & Blogs', path: '/blogs' },

  ];

  return (
    /* FIXED: Changed mt-24 sm:mt-40 to mt-0 so it sits perfectly flush with the Newsletter section */
    <footer className='bg-[#0b2216] text-stone-300 border-t border-emerald-950 mt-0 transition-colors duration-300 font-sans'>
      <div className='max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-12'>
        
        {/* Main Grid Content */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12'>
          
          {/* Brand & About Section */}
          <div className='md:col-span-5 flex flex-col gap-6'>
            <div className='flex flex-col'>
              <span className='text-2xl font-extrabold tracking-wide text-white font-serif uppercase'>
                Eco Garden Nursery
              </span>
              <span className='text-xs font-medium tracking-widest uppercase text-emerald-400 mt-1'>
                Nature at your fingertips
              </span>
            </div>
            
            <p className='text-sm leading-relaxed text-stone-400 max-w-sm'>
              We bring you thoughtfully nurtured plants that combine natural beauty, longevity, and freshness, ensuring every specimen is handled with care while delivering a seamless, green experience you can trust.
            </p>
            
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
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path} 
                    className='hover:text-emerald-300 transition-colors duration-200 ease-in-out relative block w-fit after:block after:content-[""] after:absolute after:h-[1px] after:bg-emerald-400 after:w-0 hover:after:w-full after:transition-all after:duration-300'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className='md:col-span-3 flex flex-col gap-5'>
            <p className='text-xs font-bold tracking-widest uppercase text-white'>
              <a href="/contact" className="hover:text-emerald-400 transition-colors duration-200">
                Get In Touch
              </a>
            </p>
            <ul className='flex flex-col gap-3 text-sm text-stone-400'>
              <li>
                <a href="tel:+12124567890" className='hover:text-emerald-300 transition-colors duration-200'>
                  +91 97605 00048
                </a>
              </li>
              <li>
                <a href="mailto:contact@nursery.com" className='hover:text-emerald-300 transition-colors duration-200 underline underline-offset-4 decoration-emerald-800 hover:decoration-emerald-300'>
                  contact@edogardenursery.com
                </a>
              </li>
              <li className='text-stone-400 leading-relaxed mt-1'>
                <p className='text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1'>Nursery Address:</p>
                City Yaqoobpur<br />
                District Amroha<br />
                State Uttar Pradesh<br />
                Country India<br />
                Pin Code 244241
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className='pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-wide text-stone-500'>
          <p>© 2026 ecogardenursery.com. All Rights Reserved.</p>
          <div className='flex gap-6 opacity-85'>
            <span className='hover:text-stone-300 cursor-pointer transition-colors'>Terms of Service</span>
            <span className='hover:text-stone-300 cursor-pointer transition-colors'>Cookie Policy</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer