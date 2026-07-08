import React, { useState, useEffect } from 'react';
import { Leaf, Truck, HeartHandshake, Sparkles, Sprout, ShieldCheck, ArrowRight, Trees, Layers, Gem, ShoppingBag, Store } from 'lucide-react';
import { assets } from '../assets/assets';

const Services = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const servicesList = [
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: "Secure & Safe Shipping",
      description: "Our specialized eco-packaging ensures your green friends arrive safely, hydrated, and completely stress-free right at your doorstep.",
      isFeatured: true,
      image: assets.Services1
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      title: "Lifetime Plant Care Advice",
      description: "Got a yellow leaf? Don't panic. Our team of expert botanists offers free, lifetime chat support to help your plants thrive.",
      isFeatured: false
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      title: "Custom Potting & Styling",
      description: "Choose your plant and pair it with our premium ceramic pots. We repot them in optimal organic soil mixes before sending.",
      isFeatured: false
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-700" />,
      title: "Rare & Exotic Species",
      description: "From variegated Monstera to rare Alocasias, we source hard-to-find botanical gems for passionate collectors.",
      isFeatured: true,
      image: assets.Services2
    },
    {
      icon: <Sprout className="w-6 h-6 text-lime-600" />,
      title: "Garden Consultation",
      description: "Unsure which plant fits your space? Schedule a virtual layout consultation to pick the perfect low-light or pet-friendly choices.",
      isFeatured: true,
      image: assets.Services3
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      title: "30-Day Health Guarantee",
      description: "We are confident in our plant health. If your plant shows signs of decline within 30 days, we will replace it entirely free.",
      isFeatured: false
    },
    {
      icon: <Trees className="w-6 h-6 text-emerald-600" />,
      title: "Garden Design Service",
      description: "Transform your outdoor areas with bespoke architectural landscaping tailored to your local climate and personal aesthetic.",
      isFeatured: false

    },
    {
      icon: <Layers className="w-6 h-6 text-lime-700" />,
      title: "Vertical Garden Service",
      description: "Maximize your space with stunning living walls and vertical installations perfect for urban settings and compact patios.",
      isFeatured: true,
      image: assets.Services4
    },
    {
      icon: <Gem className="w-6 h-6 text-stone-600" />,
      title: "Stone Design services",
      description: "Incorporate elegant pathways, retaining walls, and custom rockeries that seamlessly balance organic textures with greenery.",
      isFeatured: true,
      image: assets.Services5

    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-amber-700" />,
      title: "Retail Plant Service",
      description: "Explore our meticulously curated selection of premium houseplants, flowers, and essentials designed for immediate home styling.",
      isFeatured: false
    },
    {
      icon: <Store className="w-6 h-6 text-teal-700" />,
      title: "Wholesale Plant Service",
      description: "Bulk botanical ordering options and volume contract pricing explicitly optimized for commercial developers, offices, and designers.",
      isFeatured: false
    },
    {
      icon: <Gem className="w-6 h-6 text-stone-600" />,
      title: "Eco Friendly services",
      description: "Eco Garden Nursery is committed to sustainable practices, from biodegradable packaging to organic soil mixes, ensuring a greener future for all.",
      isFeatured: true,
      image: assets.Services6

    }
  ];

  return (
    <section className="bg-[#f9faf7] py-20 px-4 sm:px-8 lg:px-16 min-h-screen flex flex-col justify-center overflow-hidden font-['Work_Sans']">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full">
              Premium Horticultural Standards
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-semibold text-[#061b0e] tracking-tight font-['EB_Garamond'] leading-none">
              The Green Thumb Experience
            </h2>
          </div>
          <p className="text-base text-[#434843] max-w-sm leading-relaxed">
            We don't just ship plants—we deliver healthy, beautifully curated premium greenery backed by lifetime expert support.
          </p>
        </div>

        {/* Aesthetic Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          {servicesList.map((service, index) => {
            const sideDirection = index % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
            
            // Render structural layout styles if card contains a high-res image accent
            if (service.isFeatured) {
              return (
                <div
                  key={index}
                  className={`relative md:col-span-2 overflow-hidden rounded-3xl group shadow-sm border border-stone-200/40 transition-all duration-700 ease-out
                    ${isMounted ? 'translate-x-0 opacity-100' : `${sideDirection} opacity-0`}
                  `}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transitionProperty: 'transform, opacity'
                  }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#061b0e]/90 via-[#061b0e]/70 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end md:justify-center md:max-w-md text-white z-10 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-semibold font-['EB_Garamond'] tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <a 
                      href={"/contact"}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#ccebc7] hover:text-white transition-colors pt-2"
                    >
                      Learn Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            }

            // Default Minimalist Glass/Stone Styled Grid Item
            return (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-3xl border border-stone-200/40 flex flex-col items-start justify-between
                  hover:shadow-md hover:border-emerald-800/20 transition-all duration-500 ease-out group
                  ${isMounted ? 'translate-x-0 opacity-100' : `${sideDirection} opacity-0`}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: 'transform, opacity'
                }}
              >
                <div className="space-y-4 w-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#f3f4f1] flex items-center justify-center shadow-inner">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#061b0e] font-['EB_Garamond'] tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-[#434843] leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
                
                <a 
                  href={"/contact"} 
                  className="text-xs font-semibold tracking-wider uppercase text-emerald-700 hover:text-[#061b0e] transition-colors flex items-center gap-1.5 mt-4"
                >
                  Learn details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Premium Geometric Call to Action Banner */}
        <div className="mt-20 relative rounded-[32px] overflow-hidden bg-[#061b0e] text-white shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 lg:opacity-40 pointer-events-none">
            <img 
              src={assets.Services7}
              alt="Lush Nursery Setup" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061b0e] via-transparent to-transparent hidden lg:block" />
          </div>
          
          <div className="relative z-10 max-w-2xl p-10 md:p-16 space-y-6">
            <h3 className="text-3xl md:text-4xl font-semibold font-['EB_Garamond'] leading-tight">
              Looking to brighten up your living space?
            </h3>
            <p className="text-stone-300 text-sm md:text-base max-w-xl leading-relaxed">
              Explore our curated collections of easy-care indoor plants and give your home the fresh air it deserves.
            </p>
            <div className="pt-2">
              <button className="bg-[#ccebc7] text-[#07200b] font-semibold tracking-wide text-sm px-8 py-3.5 rounded-full hover:bg-white hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                <a href={"/collection"}>
                Browse Content Collection
                </a>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;