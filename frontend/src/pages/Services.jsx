import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';

const Services = () => {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const servicesList = [
    { id: 'landscape-architecture', title: "Landscape Architecture", description: "Masterfully planned outdoor spaces combining art, architecture, and ecology to elevate your landscape layout entirely.", image: assets.Services1 },
    { id: 'farmhouse-villa', title: "Farmhouse & Villa Garden", description: "Bespoke sprawling green sanctuaries tailored beautifully to match the grandeur and luxury of estate properties.", image: assets.Services2 },
    { id: 'terrace-garden', title: "Terrace Garden", description: "Transforming empty rooftop spaces into breathtaking micro-climates and private high-altitude nature retreats.", image: assets.Services3 },
    { id: 'commercial-gardens', title: "Commercial & Corporate Gardens", description: "Striking green environments purposefully designed to boost workspace productivity and deliver visual corporate prestige.", image: assets.Services4 },
    { id: 'hospitality-resort', title: "Hospitality & Resort Garden", description: "Immersive, luxurious botanical concepts crafted explicitly to offer guests a remarkable, tranquil getaway experience.", image: assets.Services5 },
    { id: 'garden-maintenance', title: "Garden Maintenance", description: "Comprehensive elite upkeep solutions ensuring your outdoor investments remain pristine, vibrant, and flourishing year-round.", image: assets.Services6 },
    { id: 'lawn-turf', title: "Lawn & Turf Creation", description: "Precision grading, top-tier grass varieties, and flawless execution for deep-green, carpet-smooth natural turf lawns.", image: assets.Services7 },
    { id: 'drip-irrigation', title: "Drip Irrigation Systems", description: "Smart, automated eco-watering layouts built to optimize targeted root hydration while slashing water waste efficiently.", image: assets.Services8 },
    { id: 'water-features', title: "Water Features", description: "Elegant, serene custom waterfalls, stone fountains, and lily ponds introducing dynamic soundscapes to your backyard.", image: assets.Services9 },
    { id: 'garden-lighting', title: "Garden Lighting", description: "Thoughtfully placed architectural lights transforming your daytime foliage layout into a warm, enchanting evening setting.", image: assets.Services10 },
    { id: 'vertical-gardens', title: "Vertical Gardens", description: "Stunning living structural walls providing instant urban greenery, premium insulation, and lush vertical architecture.", image: assets.Services11 },
    { id: 'pergola-gazebo', title: "Pergola & Gazebo Design", description: "Handcrafted wooden and metal outdoor lounges balancing dynamic shadows, structural durability, and leisure value.", image: assets.Services12 },
    { id: 'indoor-plant-decor', title: "Indoor Plant Decor", description: "Curated collection of health-centric exotic houseplants curated perfectly for indoor offices and living rooms.", image: assets.Services13 },
    { id: 'pathway-design', title: "Garden Pathway Design", description: "Artfully laid stone pavers, stepping pathways, and gravel trails navigating you seamlessly through nature.", image: assets.Services14 },
    { id: 'sculpture-hardscape', title: "Sculpture & Hardscape Features", description: "Integrating bespoke geometric rockeries, retaining accents, and focal sculptures alongside thriving biological textures.", image: assets.Services15 },
    { id: 'tree-shrub-pruning', title: "Tree & Shrub Pruning", description: "Expert artistic structural trimming ensuring your high canopy growth path remains disease-free and perfectly aesthetic.", image: assets.Services16 },
    { id: 'soil-treatment', title: "Soil Treatment & Enrichment", description: "Re-engineering base dirt profiles with premium organic bio-nutrients for high-yield, long-term root health.", image: assets.Services17 },
    { id: 'lawn-care', title: "Grass Cutting & Lawn Care", description: "Scheduled professional trimming, aeration, and precise treatments keeping your turf clean, uniform, and pest-resistant.", image: assets.Services18 }
  ];

  return (
    <section className="bg-[#f5f7f4] py-[24px] sm:px-8 lg:px-16 min-h-screen flex flex-col justify-center overflow-hidden font-['Work_Sans']">
      <div className="mx-auto w-full">
        {/* Header Section */}
        <div className={`transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 gap-6">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-800 font-bold bg-emerald-100/60 px-4 py-2 rounded-full w-fit">
              Premium Horticultural Standards
            </span>

            <h2 className="mt-2 text-3xl sm:text-6xl font-light text-[#061b0e] tracking-tight font-['EB_Garamond'] leading-[1.1] sm:whitespace-nowrap transition-all duration-500 ease-in-out hover:text-emerald-950 hover:scale-[1.01]">
              The Green Thumb <span className="font-semibold italic text-emerald-900 transition-colors duration-500 hover:text-emerald-700">Experience</span>
            </h2>

            <p className="text-[16px] text-[#434843] max-w-[515px] leading-relaxed font-light mt-2 transition-all duration-500 ease-in-out hover:text-[#2c302c]">
              We design, construct, and manage elite residential and commercial landscape ecosystems backed by experienced horticultural architects.
            </p>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isMounted ? '0ms' : `${index * 40}ms` }}
            >
              {/* Wrapper div contains mounting animations, isolating the inline transitionDelay */}
              <div
                onClick={() => navigate(`/services/${service.id}`)}
                className="relative overflow-hidden h-[260px] rounded-2xl flex flex-col justify-end cursor-pointer group shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out will-change-transform bg-stone-800"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                
                <div className="p-6 w-full relative z-20 text-white">
                  <h3 className="text-xl font-semibold font-['EB_Garamond'] transition-colors duration-300 group-hover:text-[#ccebc7]">{service.title}</h3>
                  <p className="text-white/80 text-xs mt-2 line-clamp-2 leading-relaxed">{service.description}</p>
                  
                  <div className="mt-4 h-4 overflow-hidden">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <button className="text-xs font-bold uppercase tracking-widest text-[#ccebc7] flex items-center gap-2">
                        Explore <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;