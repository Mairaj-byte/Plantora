import React, { useState } from 'react'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    subject: 'Plant Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <div className="bg-transparent text-slate-800 min-h-screen font-sans">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="flex-1 space-y-6">
          <p className="text-xs font-bold tracking-widest text-[#4a6b48] uppercase">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#112211] leading-tight">
            Let's grow something <br />
            <span className="italic font-normal text-[#2d4a2c]">beautiful</span> together.
          </h1>
          <p className="text-gray-600 max-w-md leading-relaxed">
            Whether you're looking for a rare sapling or professional landscaping advice, 
            our nursery is open around the clock to serve your green needs.
          </p>
          <a 
            href="tel:09760500048" 
            className="inline-block bg-[#0b1c10] text-white px-6 py-3 rounded-2xl font-medium tracking-wide hover:bg-[#1a3321] transition-all"
          >
            Call 097605 00048
          </a>
        </div>

        {/* Right: Greenhouse Image */}
        <div className="flex-1 w-full">
          <img 
            className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-sm" 
            src={assets.contact} 
            alt="Nursery Greenhouse" 
          />
        </div>
      </div>

      {/* --- DETAILS & FORM SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left Grid: Contact Info (4 Columns) */}
        <div className="md:col-span-5 space-y-10">
          <h2 className="text-3xl font-serif text-[#112211]">Contact Information</h2>
          
          <div className="space-y-8">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-gray-7xl">
                📍
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Location</p>
                <p className="text-gray-7xl font-medium mt-1">
                  Unnamed Road, Gajraula, Machhrai,<br />Uttar Pradesh 244241
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-gray-7xl">
                📞
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</p>
                <p className="text-gray-7xl font-medium mt-1">097605 00048</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-7xl rounded-xl">
                🛡️
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-7xl uppercase tracking-wider">Availability</p>
                <p className="text-gray-7xl font-bold mt-1">Open 24 Hours / 7 Days a Week</p>
                <p className="text-xs text-gray-400 mt-0.5">Providing fresh plants whenever inspiration strikes.</p>
              </div>
            </div>
          </div>

          {/* Map Preview Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-sm h-52 bg-gray-200 border border-gray-100">
            <img 
              src={assets.map_preview || "https://wallpaperbat.com/img/99008511-google-maps-wallpaper-free.jpg"} 
              alt="Map Location" 
              className="w-full h-full object-cover blur-[1px]"
            />

            <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
              <a 
                href="https://www.google.com/maps/@30.3359445,78.0566528,14z?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white text-gray-800 font-medium px-5 py-2.5 rounded-full shadow-md hover:bg-gray-50 flex items-center gap-2 transition-all"
              >
                🗺️ View on Maps
              </a>
            </div>
            
          </div>
        </div>

        {/* Right Grid: Messaging Form Card (7 Columns) */}
        <div className="md:col-span-7 bg-white p-8 md:p-10 rounded-[22px] shadow-sm border border-gray-100/60">
          <h3 className="text-2xl font-serif text-[#112211] mb-8">Send us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-gray-50 border-0 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 border-0 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Subject</label>
              <select 
                className="w-full bg-gray-50 border-0 rounded-xl p-4 text-gray-800 focus:ring-2 focus:ring-emerald-600 outline-none transition-all appearance-none"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>Plant Inquiry</option>
                <option>Landscaping Services</option>
                <option>Bulk/Wholesale Orders</option>
                <option>Other Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Message</label>
              <textarea 
                rows="5"
                placeholder="Tell us how we can help..."
                className="w-full bg-gray-50 border-0 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-600 outline-none transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#0b1c10] text-white p-4 rounded-xl font-medium tracking-wide hover:bg-[#1a3321] transition-all flex items-center justify-center gap-2"
            >
              Send Message <span>➤</span>
            </button>
          </form>
        </div>

      </div>

      {/* --- NEWSLETTER FOOTER --- */}
      <NewsletterBox />
    </div>
  )
}

export default Contact