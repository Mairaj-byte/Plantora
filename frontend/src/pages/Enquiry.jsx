import React, { useState, useEffect } from 'react';
import { Leaf, User, Mail, Phone, MapPin, MessageSquare, Send, X } from 'lucide-react';

const Enquiry = ({ plantName, onClose }) => {
  const [formData, setFormData] = useState({
    plantName: plantName || '',
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    message: ''
  });

  
  useEffect(() => {
    if (plantName) {
      setFormData(prev => ({ ...prev, plantName: plantName }));
    }
  }, [plantName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Submitted Successfully:", formData);
    // Add your backend submission routing rules here
    if (onClose) onClose(); // Optionally close modal on successful submit
  };

  return (
    <div className="w-full bg-white transition-all duration-300 relative">
      
      
      <div className="bg-emerald-950 text-white p-8 relative overflow-hidden">
      
        {onClose && (
          <button 
            type="button" 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 p-2 text-emerald-200 hover:text-white bg-emerald-900/40 rounded-full transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="absolute -right-6 -bottom-6 text-emerald-900/40 opacity-20 pointer-events-none">
          <Leaf className="w-40 h-40" strokeWidth={1} />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-900 text-emerald-300 text-[10px] font-semibold tracking-wider uppercase">
            <Leaf className="w-3 h-3" /> Botanical Sourcing
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Specimen Enquiry</h1>
          <p className="text-emerald-200/70 text-xs sm:text-sm font-light max-w-md">
            Let our horticultural curators help you obtain or safely acclimatize this custom plant framework inside your space guidelines.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
        
        {/* Plant Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase font-bold tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Plant Specimen Target
          </label>
          <div className="relative rounded-xl shadow-sm">
            <input
              type="text"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              placeholder="Enter plant variety name..."
              required
              className="w-full bg-[#F4F6F2]/50 border border-emerald-100/80 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all"
            />
          </div>
        </div>

        {/* Contact Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-gray-400" /> Contact Number
            <span className="text-[10px] text-gray-400 font-normal"> (With country code)</span>
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all"
          />
        </div>

        {/* Delivery Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" /> Delivery Address Details
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address, Apartment, Suite, City, State"
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all"
          />
        </div>

        {/* Message Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" /> Custom Message / Request Specifics
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Provide context regarding lighting configuration constraints, spatial layout setup, or delivery care questions..."
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all resize-none"
          />
        </div>

        {/* Submit Action Block */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-emerald-950 text-white font-medium py-3.5 px-6 rounded-xl hover:bg-emerald-900 transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm shadow-sm tracking-wide"
          >
            <Send className="w-4 h-4" /> Submit Request Review
          </button>
        </div>
      </form>

    </div>
  );
};

export default Enquiry;