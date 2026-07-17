import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF9F6] text-[#064e3b] py-12 md:py-20 px-5 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        
        {/* Top/Right Column: Editorial Copy (Appears first on mobile using order utilities) */}
        <div className="col-span-1 lg:col-span-6 space-y-6 md:space-y-8 flex flex-col justify-center order-1 lg:order-2 text-center sm:text-left">
          <div className="space-y-2 md:space-y-3">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-stone-950">
              Bringing living art <br />
              <span className="italic font-light text-[#047857]">into your sanctuary.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-[#1f4e3d] font-light max-w-xl mx-auto sm:mx-0">
            We believe that spaces thrive when they breathe. Our pieces aren’t just houseplants; they are meticulously sourced, mature botanical statements designed to elevate modern architecture and nurture mindful living.
          </p>

          <p className="text-sm md:text-base leading-relaxed text-[#1f4e3d] font-light max-w-xl hidden sm:block">
            From rare structural gems to lush, cascading foliage, each specimen is hand-selected, acclimatized, and delivered directly from our artisanal glasshouses to your doorstep—complete with premium, tailored care profiles.
          </p>

          {/* Micro-Metrics Section */}
          <div className="pt-4 border-t border-[#e2e8f0] grid grid-cols-2 gap-4 max-w-md mx-auto sm:mx-0 text-left w-full">
            <div>
              <p className="font-serif text-xl md:text-2xl text-stone-950">100%</p>
              <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-[#047857] mt-1">Sustainably Grown</p>
            </div>
            <div>
              <p className="font-serif text-xl md:text-2xl text-stone-950">Bespoke</p>
              <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-[#047857] mt-1">Acclimatization Care</p>
            </div>
          </div>

          {/* Elegant Minimalist Rounded CTA Button */}
          <div className="pt-2 flex justify-center sm:justify-start">
            <button 
              onClick={() => navigate('/about')} 
              className="group relative inline-flex items-center justify-start overflow-hidden py-3 px-6 text-[11px] md:text-xs uppercase tracking-widest text-[#064e3b] border border-[#064e3b] transition-all duration-300 hover:text-black rounded-full bg-transparent cursor-pointer"
            >
              <span className="absolute inset-0 bg-[#064e3b] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 ease-out -z-10" />
              <span className="font-medium">Discover Our Story</span>
              <svg 
                className="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom/Left Column: Premium Imagery Layout */}
        <div className="col-span-1 lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1 pt-6 sm:pt-0">
          {/* Main Background Image */}
          <div className="w-[85%] sm:w-4/5 aspect-[4/5] overflow-hidden rounded-2xl shadow-xl group">
            <img 
              src={assets.abouts}
              alt="Premium indoor plants styling" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          
          {/* Overlapping Secondary Image */}
          <div className="absolute -bottom-6 left-2 sm:-bottom-8 sm:-left-4 w-5/12 aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-[#FAF9F6] group">
            <img 
              src={assets.about} 
              alt="Carefully curated botanical detail" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Decorative Minimalist Badge */}
          <div className="absolute top-6 right-4 sm:top-12 sm:right-0 bg-[#064e3b] text-[#FAF9F6] tracking-widest text-[9px] sm:text-[10px] uppercase py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-full shadow-lg backdrop-blur-sm bg-opacity-95">
            Est. 2021 • Curated Nature
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;