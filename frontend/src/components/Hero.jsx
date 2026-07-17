import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: assets.hero,
    title: "Bring Life to Your",
    italic: "Outdoor Spaces",
    desc: "Explore a curated collection of premium plants, shrubs, and trees. We combine affordable quality with professional horticultural expertise.",
    showCard: true
  },
  {
    image: assets.hero2,
    title: "Design Your",
    italic: "Perfect Garden",
    desc: "Transform your backyard into a sanctuary with our professional landscaping design services.",
    showCard: false
  },
  {
    image: assets.hero3,
    title: "Rare & Exotic",
    italic: "Tropical Species",
    desc: "Discover our unique collection of indoor tropicals sourced from across the globe.",
    showCard: false
  },
  {
    image: assets.hero4,
    title: "Sustainable Living",
    italic: "Starts Here",
    desc: "Eco-friendly gardening solutions for a greener, healthier future.",
    showCard: false
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[85vh] sm:min-h-[80vh] lg:min-h-[90vh] w-full overflow-hidden my-0 bg-black flex items-center px-5 sm:px-10 lg:px-16">
      
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        />
      </AnimatePresence>

      <div className='absolute inset-0 bg-black/30 mix-blend-multiply' />

      {/* Unified Content Layer */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {slides[current].showCard ? (
              // Card Version
              <div className='w-full max-w-xl bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-xl'>
                <div className='inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-6'>
                  <span>🌿</span> Nurturing Growth Since 2016
                </div>
                <h1 className='text-3xl sm:text-5xl font-light text-stone-950 leading-[1.15] mb-4'>
                  {slides[current].title} <br />
                  <span className='italic font-serif text-emerald-900'>{slides[current].italic}</span>
                </h1>
                <p className='text-stone-600 text-sm sm:text-base mb-8'>{slides[current].desc}</p>
                <div className='flex gap-4'>
                  <button onClick={() => navigate('/collection')} className='bg-stone-950 text-white py-3 px-6 rounded-full text-sm hover:bg-emerald-800 transition-all'>Explore</button>
                </div>
              </div>
            ) : (
              // Text Overlay Version
              <div className="text-white max-w-2xl">
                <h2 className="text-4xl sm:text-6xl font-serif mb-4">
                  {slides[current].title} {slides[current].italic}
                </h2>
                <p className="text-lg opacity-90">{slides[current].desc}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;