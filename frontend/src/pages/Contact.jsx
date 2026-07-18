import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import {
  Leaf,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Loader2,
  Send,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';
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

      toast.success('Enquiry submitted successfully!');

      setFormData({
        plantName: plantName || '',
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        message: ''
      });

      if (onClose) {
        onClose();
      }

    } catch (error) {
      toast.error(error.message || 'Failed to submit enquiry. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans antialiased">

      {/* --- SECTION 1: HERO OVERLAY --- */}
      <div className="relative w-full h-[85vh] flex items-center justify-start overflow-hidden">

        {/* Background Container for Image with Hover Effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
            src={assets.contact}
            alt="Nursery Greenhouse"
          />
        </div>

        {/* Dimming Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />

        {/* Text Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full space-y-8 text-white">
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Get in Touch
            </p>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] max-w-2xl">
              Let's grow something <br />
              <span className="italic font-normal text-emerald-300">beautiful</span> together.
            </h1>
            <p className="text-gray-300 max-w-md leading-relaxed text-lg">
              Whether you're looking for a rare sapling or professional landscaping advice,
              our nursery is open around the clock to serve your green needs.
            </p>
          </div>

          <a
            href="tel:09760500048"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold tracking-wide hover:bg-emerald-500 transition-all shadow-xl hover:shadow-emerald-500/20 active:scale-95 duration-300"
          >
            <Phone className="w-5 h-5" /> +91-97605 00048
          </a>
        </div>
      </div>

      {/* --- SECTION 2: DETAILS & FORM GRID --- */}
      <div className="bg-[#fafaf9] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Messaging Form Card */}
          <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-slate-900">Send us a Message</h3>
                <p className="text-sm text-slate-500 mt-1">Fill out the fields below and our plant experts will reach out to you.</p>
              </div>

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
                <input
                  type="text"
                  name="plantName"
                  value={formData.plantName}
                  onChange={handleChange}
                  placeholder="Enter plant variety name..."
                  required
                  disabled={isSubmitting}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all disabled:opacity-60"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all disabled:opacity-60"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@example.com"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Contact Number
                  <span className="text-[10px] text-slate-400 font-normal"> (With country code)</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all disabled:opacity-60"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Delivery Address Details
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address, Apartment, Suite, City, State"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all disabled:opacity-60"
                />
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Custom Message / Request Specifics
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Provide context regarding lighting configurations, spatial layouts, or delivery care questions..."
                  required
                  disabled={isSubmitting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all resize-none disabled:opacity-60"
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
                    </                    >
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Request Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Info & Map Card */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-sm">
            <h2 className="text-3xl font-serif text-slate-900">Contact Information</h2>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shadow-sm">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Our Location</p>
                  <p className="text-slate-700 font-medium mt-1 leading-relaxed">
                    Yaqoobpur, Amroha <br />Uttar Pradesh 244241
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shadow-sm">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-slate-700 font-medium mt-1">+91-97605 00048</p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100/50">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Availability</p>
                  <p className="text-slate-900 font-bold mt-1">Open 24 Hours / 7 Days a Week</p>
                  <p className="text-xs text-slate-400 mt-0.5">Providing fresh plants whenever inspiration strikes.</p>
                </div>
              </div>
            </div>

            {/* Real Map Container */}
            <div className="relative rounded-xl overflow-hidden shadow-sm h-64 bg-slate-100 border border-slate-200/60 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13969.870598822003!2d78.43261645000001!3d28.914234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b79e4bf0bcf53%3A0xe54fb72d41a7d65a!2sYaqoobpur%2C%20Uttar%20Pradesh%20244241!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Yaqoobpur, Amroha"
                className="w-full h-full"
              />

              {/* Clean, hoverable overlay button to open full maps */}
              <div className="absolute bottom-3 right-3">
                <a
                  href="https://www.google.com/maps/place/Yaqoobpur,+Uttar+Pradesh+244241"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-slate-800 font-medium px-4 py-2 rounded-lg shadow-md hover:bg-slate-50 flex items-center gap-1.5 transition-all active:scale-95 text-xs border border-slate-200"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" /> View Larger Map
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- SECTION 3: NEWSLETTER FOOTER --- */}
      <section className="bg-[#f3f4f1] py-4 ">
        <NewsletterBox />
      </section>


    </div>
  );
};

export default Contact;