import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll positioning to trigger header micro-interaction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Structural Navigation links mapping 
  const navLinks = [
    { name: 'Home', href: '#', active: false },
    { name: 'Our Plants', href: '#', active: false },
    { name: 'Services', href: '#', active: false },
    { name: 'About Us', href: '#', active: true },
    { name: 'Contact Us', href: '#', active: false },
  ];

  return (
    <div className="bg-[#f9faf7] text-[#191c1b] font-['Work_Sans'] selection:bg-[#b0cfad]">
      {/* Dynamic Load for External Fonts & Icons via React side-effect rendering */}
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      

      <main>
        {/* Hero Section */}
        <section 
  className="relative h-[614px] flex items-center justify-center text-center px-4 bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(6, 27, 14, 0.4), rgba(6, 27, 14, 0.4)), url(${assets.About1})`
  }}
>
        
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#ccebc7] text-[#07200b] rounded-full text-[14px] font-semibold uppercase tracking-widest">
              Since 2016
            </span>
            <h1 className="text-[48px] leading-[1.1] font-semibold tracking-tight font-['EB_Garamond'] text-white">
              Nurturing Growth in Gajraula
            </h1>
            <p className="text-[18px] leading-[1.6] text-white/90 max-w-2xl mx-auto">
              Chauhan Traders & Nursery is more than just a nursery; it's a legacy of commitment to quality and a passion for the green world.
            </p>
          </div>
        </section>

        {/* Our History Story */}
        <section className="py-[80px] px-4 md:px-12 max-w-[1280px] mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[32px] font-['EB_Garamond'] font-medium text-[#061b0e]">
                  A Vision Planted in 2016
                </h2>
                <div className="w-20 h-1 bg-[#4a6549] rounded-full"></div>
              </div>
              <p className="text-[18px] leading-[1.6] text-[#434843]">
                Founded in the heart of Gajraula in 2016, Chauhan Traders & Nursery began with a singular vision: to bridge the gap between dedicated plant traders and high-quality botanical specimens. What started as a local initiative has blossomed into a trusted hub for horticultural excellence.
              </p>
              <p className="text-[18px] leading-[1.6] text-[#434843]">
                Our journey over the last eight years has been defined by our unwavering commitment to "Affordable Quality." We understand that every plant we supply is an investment in the environment and our customers' peace of mind.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-[#edeeeb] rounded-xl border border-[#c3c8c1]/30">
                  <span className="text-[48px] font-['EB_Garamond'] font-semibold text-[#061b0e]">8+</span>
                  <p className="text-[14px] font-semibold text-[#434843]">Years of Expertise</p>
                </div>
                <div className="p-6 bg-[#edeeeb] rounded-xl border border-[#c3c8c1]/30">
                  <span className="text-[48px] font-['EB_Garamond'] font-semibold text-[#061b0e]">50k+</span>
                  <p className="text-[14px] font-semibold text-[#434843]">Plants Delivered</p>
                </div>
              </div>
            </div>
            
            <div className="relative group mt-8 lg:mt-0">
              <div className="absolute -inset-4 bg-[#ccebc7]/30 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <img
                src={assets.About2}
                alt="Nursery Staff"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Commitment & Core Values */}
        <section className="bg-[#f3f4f1] py-[80px]">
          <div className="px-4 md:px-12 max-w-[1280px] mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-[32px] font-['EB_Garamond'] font-medium text-[#061b0e]">
                Our Core Commitment
              </h2>
              <p className="text-[18px] text-[#434843] max-w-2xl mx-auto">
                We believe in the power of plants to transform spaces and lives. Our commitment to quality is rooted in three main pillars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="bg-[#f9faf7] p-8 rounded-2xl space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#ccebc7] flex items-center justify-center text-[#07200b]">
                  <span className="material-symbols-outlined">eco</span>
                </div>
                <h3 className="text-[24px] font-['EB_Garamond'] font-medium text-[#061b0e]">Quality Assurance</h3>
                <p className="text-[16px] text-[#434843]">
                  Every plant in our nursery undergoes rigorous health checks to ensure you receive only the most resilient and vibrant specimens.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#f9faf7] p-8 rounded-2xl space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#ffdbcc] flex items-center justify-center text-[#2c160b]">
                  <span className="material-symbols-outlined">handshake</span>
                </div>
                <h3 className="text-[24px] font-['EB_Garamond'] font-medium text-[#061b0e]">Trader Partnerships</h3>
                <p className="text-[16px] text-[#434843]">
                  We are a dedicated partner to plant traders across India, offering reliable logistics and consistent supply chains since 2016.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#f9faf7] p-8 rounded-2xl space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#d0e9d4] flex items-center justify-center text-[#0b2013]">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <h3 className="text-[24px] font-['EB_Garamond'] font-medium text-[#061b0e]">24/7 Availability</h3>
                <p className="text-[16px] text-[#434843]">
                  Nature doesn't sleep, and neither do we. Our operations run 24 hours a day to meet the urgent needs of landscapers and traders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section: Bento Layout */}
        <section className="py-[80px] px-4 md:px-12 max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-[32px] font-['EB_Garamond'] font-medium text-[#061b0e]">
                Professional Horticultural Services
              </h2>
              <p className="text-[18px] text-[#434843]">
                Tailored solutions for residential, commercial, and wholesale requirements.
              </p>
            </div>
            <a className="text-[14px] font-semibold text-[#4a6549] border-b border-[#4a6549] pb-1 flex items-center gap-2 group" href="#">
              View All Services 
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
            {/* Bento Block 1 */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-[#e2e3e0] h-[300px] md:h-auto">
              <img 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={assets.About3} 
                alt="Wholesale Supply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061b0e]/80 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[12px] font-semibold uppercase tracking-widest text-[#ccebc7] mb-2">Primary Service</span>
                <h3 className="text-[32px] font-['EB_Garamond'] font-medium mb-2">Wholesale Plant Supply</h3>
                <p className="text-[16px] opacity-90">Bulk procurement for nurseries, landscapers, and corporate projects with pan-India delivery.</p>
              </div>
            </div>

            {/* Bento Block 2 */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl bg-[#e2e3e0] h-[200px] md:h-auto">
              <img 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={assets.About4} 
                alt="Landscaping"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061b0e]/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-[24px] font-['EB_Garamond'] font-medium mb-2">Expert Landscaping</h3>
                <p className="text-[16px] opacity-90">Transforming bare land into thriving ecosystems with professional design and execution.</p>
              </div>
            </div>

            {/* Bento Block 3 */}
            <div className="md:col-span-1 relative overflow-hidden rounded-2xl bg-[#ccebc7] h-[150px] md:h-auto">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#506b4f]">
                <span className="material-symbols-outlined text-4xl mb-2">settings_suggest</span>
                <h3 className="text-[18px] font-semibold mb-1">Nursery Consulting</h3>
                <p className="text-[12px] opacity-80">Expert advice on plant selection and maintenance.</p>
              </div>
            </div>

            {/* Bento Block 4 */}
            <div className="md:col-span-1 relative overflow-hidden rounded-2xl bg-[#3e261a] h-[150px] md:h-auto">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[#e6bead]">
                <span className="material-symbols-outlined text-4xl mb-2">schedule</span>
                <h3 className="text-[18px] font-semibold mb-1">24h Maintenance</h3>
                <p className="text-[12px] opacity-80">Round-the-clock support for critical botanical care.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-[80px] px-4 md:px-12 bg-[#061b0e] text-white text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-[48px] font-['EB_Garamond'] font-semibold leading-none">Ready to grow together?</h2>
            <p className="text-[18px] opacity-80">Whether you are a trader looking for a reliable partner or a homeowner planning a garden, we are here for you in Gajraula.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-3 bg-[#ccebc7] text-[#07200b] rounded-full text-[14px] font-semibold hover:-translate-y-[2px] transition-transform duration-200">
                Contact our Experts
              </button>
              <button className="px-8 py-3 border border-white/30 text-white rounded-full text-[14px] font-semibold hover:bg-white/10 transition-colors duration-200">
                Browse Wholesale Catalog
              </button>
            </div>
          </div>
        </section>
      </main>

      

    </div>
  );
};

export default About;