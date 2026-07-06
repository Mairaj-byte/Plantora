import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
// Import Lucide icons
import { ArrowRight, Leaf, Mail, Lock, ShieldCheck } from 'lucide-react';
import loginImg from '../assets/login.jpeg';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Admin Authentication Successful");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white text-stone-800 font-sans overflow-hidden relative">
      
      {/* Mobile-only structural Background Wrapper to completely isolate the image layout from desktop */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden z-0" 
        style={{ backgroundImage: `url(${loginImg})` }} 
      />
      
      {/* Dark overlay specifically for mobile backdrop legibility */}
      <div className="absolute inset-0 bg-black/50 md:hidden z-0" />
      
      {/* Left Column: Premium Cinematic Image Background with Depth Parallax Motion */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] relative flex-col justify-between p-12 overflow-hidden group perspective-1000 z-10">
        
        {/* Cinematic Background Image Layer */}
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-[4000ms] ease-out group-hover:scale-110 z-0">
          <img 
            src={loginImg} 
            alt="Admin Portal Background" 
            className="w-full h-full object-cover grayscale-[10%] contrast-[105%]"
          />
        </div>

        {/* Deep Organic Gradient Overlay Filter */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020a05]/95 via-[#061b0e]/85 to-[#132c1a]/40 z-[1] transition-opacity duration-1000 group-hover:opacity-90" />

        {/* Floating Ambient Light Rays */}
        <div className="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#4a6549]/20 blur-[100px] animate-pulse z-[2] transform transition-transform duration-[3000ms] group-hover:translate-x-12 group-hover:translate-y-6"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#ccebc7]/10 blur-[90px] z-[2] transform transition-transform duration-[3000ms] group-hover:-translate-x-8"></div>

        {/* Logo / Brand Header */}
        <div className="relative z-10 flex items-center gap-2 text-white/90 transform transition-transform duration-1000 group-hover:translate-x-1">
          <Leaf className="w-5 h-5 text-[#b0cfad]" />
          <span className="font-serif text-lg tracking-wider font-medium">Chauhan Traders & Nursery</span>
        </div>

        {/* Center Control Panel Branding */}
        <div className="relative z-10 my-auto max-w-md space-y-5 transform transition-all duration-[2000ms] ease-out group-hover:translate-y-[-4px] group-hover:scale-[1.01]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ccebc7]/20 bg-white/5 text-xs text-[#b0cfad] tracking-widest uppercase backdrop-blur-sm transition-all duration-700 group-hover:border-[#ccebc7]/40 group-hover:bg-white/10">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure HQ Terminal
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif text-white leading-tight tracking-wide drop-shadow-md">
            Management, analytics, and nursery operations engine.
          </h2>
          <p className="text-sm text-stone-300 font-light leading-relaxed max-w-sm transition-colors duration-1000 group-hover:text-white">
            Authorized personnel entry point. Authenticate to manage catalogs, track order fulfillment, access global metrics, and tweak system architecture configurations.
          </p>
        </div>

        {/* Footer info inside sidebar */}
        <div className="relative z-10 text-xs text-stone-400/80 tracking-wide transform transition-transform duration-1000 group-hover:translate-y-[-2px]">
          © 2026 Chauhan Traders & Nursery. Engine Control v2.1.
        </div>
      </div>

      {/* Right Column: Authentication Form Layout */}
      <div className="w-full md:w-[55%] lg:w-[50%] flex items-center justify-center p-4 sm:p-12 relative z-10 md:bg-white">
        
        {/* Mobile-only fallback brand display */}
        <div className="absolute md:hidden top-0 right-0 p-6 flex items-center gap-2 text-white/90">
          <Leaf className="w-4 h-4 text-[#b0cfad]" />
          <span className="font-serif text-sm font-semibold">Chauhan HQ</span>
        </div>

        {/* Glassmorphic Form Container */}
        <div className="w-full max-w-md bg-white/10 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-8 rounded-2xl border border-white/20 md:border-none shadow-2xl md:shadow-none transition-all duration-500">
          
          {/* Header Title */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-serif tracking-tight text-white md:text-[#061b0e] transition-all duration-300">
              Admin Gateway
            </h1>
            <p className="text-sm text-stone-200 md:text-stone-500 font-light">
              Sign in with your master credentials to open the administrative panel dashboard.
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Email Field Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-200 md:text-stone-700 uppercase tracking-wider mb-1.5">Administrative Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-stone-300 md:text-stone-400 w-5 h-5" />
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  type="email" 
                  className="w-full pl-11 pr-4 py-3 bg-white/10 md:bg-stone-50 border border-white/20 md:border-stone-200 focus:border-[#4a6549] text-white md:text-stone-800 focus:bg-white/20 md:focus:bg-white backdrop-blur-md rounded-xl text-sm transition-all outline-none placeholder-stone-300 md:placeholder-stone-400" 
                  placeholder="admin@chauhan.com" 
                  required
                />
              </div>
            </div>

            {/* Password Field Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-200 md:text-stone-700 uppercase tracking-wider mb-1.5">Secure Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-stone-300 md:text-stone-400 w-5 h-5" />
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  type="password" 
                  className="w-full pl-11 pr-4 py-3 bg-white/10 md:bg-stone-50 border border-white/20 md:border-stone-200 focus:border-[#4a6549] text-white md:text-stone-800 focus:bg-white/20 md:focus:bg-white backdrop-blur-md rounded-xl text-sm transition-all outline-none placeholder-stone-300 md:placeholder-stone-400" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            {/* Main CTA Submission Button */}
            <button 
              type="submit" 
              className="w-full py-3.5 mt-6 bg-white text-[#061b0e] md:bg-[#061b0e] md:text-white hover:bg-stone-100 md:hover:bg-[#13301d] font-semibold md:font-medium tracking-wide rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 group"
            >
              <span>Access Control Panel</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;