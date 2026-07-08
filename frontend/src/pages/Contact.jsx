import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
// Imported standard Lucide React icons utilized within your custom form fields
import { Leaf, User, Mail, Phone, MapPin, MessageSquare, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = ({ plantName, onClose }) => {
  const [formData, setFormData] = useState({
    plantName: plantName || '',
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    message: ''
  });

  // Submission UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (plantName) {
      setFormData(prev => ({ ...prev, plantName: plantName }));
    }
  }, [plantName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Make sure to add this at the very top of your file

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(backendUrl + "/api/enquiry/list", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      // Success Toast Notification
      toast.success('Enquiry submitted successfully!');

      // Clear form on success
      setFormData({
        plantName: plantName || '',
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        message: ''
      });

      // Close modal/overlay right away since the toast handles the visual feedback
      if (onClose) {
        onClose();
      }

    } catch (error) {
      // Error Toast Notification
      toast.error(error.message || 'Failed to submit enquiry. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent text-slate-800 min-h-screen font-sans">

      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-screen flex items-center justify-start overflow-hidden">

        {/* Background: Greenhouse Image taking full height and width of viewport */}
        <img
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={assets.contact}
          alt="Nursery Greenhouse"
        />

        {/* Dimming Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Text Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full space-y-6 text-white">
          <p className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight max-w-2xl">
            Let's grow something <br />
            <span className="italic font-normal text-emerald-200">beautiful</span> together.
          </h1>
          <p className="text-gray-100 max-w-md leading-relaxed text-sm md:text-base">
            Whether you're looking for a rare sapling or professional landscaping advice,
            our nursery is open around the clock to serve your green needs.
          </p>
          <a
            href="tel:09760500048"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-2xl font-medium tracking-wide hover:bg-emerald-700 transition-all shadow-lg"
          >
            Call +91-97605 00048
          </a>
        </div>

      </div>

      {/* --- DETAILS & FORM SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

        {/* Left Side: Messaging Form Card (Takes up 7 columns on desktop) */}
        <div className="md:col-span-7 order-2 md:order-1 rounded-[22px] shadow-sm border border-gray-100/60 overflow-hidden">
          {/* Form Container */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
            <h3 className="text-2xl font-serif text-[#112211] mb-2">Send us a Message</h3>

            {/* Status Messages */}
            {status.type && (
              <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                {status.message}
              </div>
            )}

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
                  disabled={isSubmitting}
                  className="w-full bg-[#F4F6F2]/50 border border-emerald-100/80 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all disabled:opacity-60"
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
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all disabled:opacity-60"
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
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all resize-none disabled:opacity-60"
              />
            </div>

            {/* Submit Action Block */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-950 text-white font-medium py-3.5 px-6 rounded-xl hover:bg-emerald-900 transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm shadow-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Request Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Contact Info & Map (Takes up 5 columns on desktop) */}
        <div className="md:col-span-5 order-1 md:order-2 space-y-10 bg-white p-6 md:p-8 rounded-[22px] border border-gray-100/60 shadow-sm">
          <h2 className="text-3xl font-serif text-[#112211]">Contact Information</h2>

          <div className="space-y-8">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                📍
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Location</p>
                <p className="font-medium mt-1">
                  Yaqoobpur, Amroha <br />Uttar Pradesh 244241
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                📞
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</p>
                <p className="font-medium mt-1">+91-97605 00048</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                🛡️
              </div>
              <div>
                <p className="text-xs font-semibold text-[#2d4a2c] uppercase tracking-wider">Availability</p>
                <p className="font-bold mt-1">Open 24 Hours / 7 Days a Week</p>
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
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white text-gray-800 font-medium px-5 py-2.5 rounded-full shadow-md hover:bg-gray-50 flex items-center gap-2 transition-all"
              >
                🗺️ View on Maps
              </a>
            </div>
          </div>
        </div>

      </div>





      {/* --- NEWSLETTER FOOTER --- */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;