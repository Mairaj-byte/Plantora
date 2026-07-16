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
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <p>Service not found.</p>
        <button onClick={() => navigate("/services")} className="ml-4 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-stone-900/5 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
      
      {/* --- BACKGROUND BLUR EFFECTS --- */}
      {/* Soft Emerald Glow */}
      <div className="absolute top-[10%] left-[5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-emerald-500/20 blur-[100px] sm:blur-[140px] pointer-events-none" />
      {/* Soft White/Light Glow */}
      <div className="absolute bottom-[10%] right-[5%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-white/60 blur-[80px] sm:blur-[120px] pointer-events-none" />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-[1000px] bg-white/75 backdrop-blur-xl border border-white/40 overflow-hidden shadow-[0_30px_60px_-15px_rgba(4,78,56,0.12)] rounded-[40px] z-10"
        >
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* LEFT IMAGE SECTION */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-emerald-900/10"></div>
              
              <div className="absolute top-6 left-6">
                <div className="bg-emerald-600 rounded-full px-5 py-2 flex items-center gap-2 shadow-lg">
                  <Sparkles size={12} className="text-white" fill="white" />
                  <span className="text-white uppercase tracking-[2px] text-[10px] font-bold">
                    Premium Service
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT SECTION */}
            <div className="relative flex flex-col justify-center px-8 md:px-12 py-10 lg:py-16">
              <button
                onClick={() => navigate("/services")}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-emerald-100 flex items-center justify-center bg-white/80 hover:bg-emerald-50 transition-colors group z-20"
              >
                <X size={18} className="text-emerald-900" />
              </button>

              <div className="h-[2px] w-[50px] bg-emerald-600 rounded-full mb-6" />

              <p className="uppercase tracking-[3px] text-emerald-700 text-[11px] font-bold mb-3">
                Our Expertise
              </p>
              
              <h1 className="text-emerald-950 text-4xl md:text-5xl font-serif leading-[1.1] mb-6">
                {service.title}
              </h1>

              <p className="text-emerald-800/80 text-sm md:text-base leading-relaxed max-w-[450px] mb-8">
                {service.description}
              </p>

              <div className="border-t border-emerald-100/60 pt-8" />

              <div className="mt-2">
                <p className="italic text-lg text-emerald-900/60 mb-6">
                  Ready to bring this vision to life?
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white uppercase tracking-[2px] text-[11px] font-bold rounded-full px-8 py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/20"
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