import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { servicesList } from "../assets/assets"; 

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the service that matches the ID from the URL
  const service = servicesList.find((s) => s.id === id);

  // Fallback if the ID doesn't exist
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
        <p className="text-stone-600 font-medium">Service not found.</p>
        <button 
          onClick={() => navigate("/services")} 
          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-stone-950/5 flex items-center justify-center p-3 sm:p-6 lg:p-12 overflow-hidden">
      
      {/* --- BACKGROUND BLUR EFFECTS --- */}
      {/* Soft Emerald Glow */}
      <div className="absolute top-[10%] left-[5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-emerald-500/15 blur-[80px] sm:blur-[140px] pointer-events-none" />
      {/* Soft White/Light Glow */}
      <div className="absolute bottom-[10%] right-[5%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-white/50 blur-[70px] sm:blur-[120px] pointer-events-none" />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-[1000px] bg-white/80 backdrop-blur-xl border border-white/50 overflow-hidden shadow-[0_20px_50px_-12px_rgba(4,78,56,0.12)] rounded-[24px] sm:rounded-[40px] z-10"
        >
          {/* GLOBAL CLOSE BUTTON - Accessible instantly on both mobile and desktop */}
          <button
            onClick={() => navigate("/services")}
            className="absolute top-4 right-4 w-10 h-10 rounded-full border border-stone-200/80 flex items-center justify-center bg-white/90 backdrop-blur-md shadow-md hover:bg-emerald-50 transition-colors group z-30"
            aria-label="Close details"
          >
            <X size={18} className="text-emerald-950 transition-transform group-hover:scale-90" />
          </button>

          <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
            {/* LEFT IMAGE SECTION */}
            <div className="relative h-[220px] sm:h-[300px] lg:h-auto overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-emerald-950/10" />
              
              {/* Premium Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <div className="bg-emerald-600/95 backdrop-blur-sm rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg">
                  <Sparkles size={10} className="text-white sm:w-[12px]" fill="white" />
                  <span className="text-white uppercase tracking-[1.5px] sm:tracking-[2px] text-[9px] sm:text-[10px] font-bold">
                    Premium Service
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT SECTION */}
            <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
              <div className="h-[2px] w-[40px] bg-emerald-600 rounded-full mb-4 sm:mb-6" />

              <p className="uppercase tracking-[2px] sm:tracking-[3px] text-emerald-800 text-[10px] sm:text-[11px] font-bold mb-2">
                Our Expertise
              </p>
              
              <h1 className="text-emerald-950 text-2xl sm:text-3xl md:text-5xl font-serif leading-[1.2] sm:leading-[1.1] mb-4 sm:mb-6">
                {service.title}
              </h1>

              <p className="text-emerald-900/80 text-sm sm:text-base leading-relaxed max-w-[450px] mb-6 sm:mb-8">
                {service.description}
              </p>

              <div className="border-t border-emerald-100/80 pt-6 sm:pt-8" />

              <div className="mt-2">
                <p className="italic text-base sm:text-lg text-emerald-900/70 mb-4 sm:mb-6">
                  Ready to bring this vision to life?
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center justify-center w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white uppercase tracking-[2px] text-[10px] sm:text-[11px] font-bold rounded-full px-8 py-3.5 sm:py-4 transition-all duration-300 active:scale-[0.98] sm:hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/15"
                >
                  Request Service 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">✦</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}