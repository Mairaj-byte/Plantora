import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// Import Lucide icons
import { ArrowRight, Leaf, User, Mail, Lock } from 'lucide-react';
import plant from '../assets/plant.jpeg';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          toast.success("Registered Successfully");
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          toast.success("Login Successfully");
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen w-full flex bg-[#f9faf7] text-stone-800 font-sans overflow-hidden">
      
      {/* Left Column: Premium Cinematic Image Background with Depth Parallax Motion */}
      <div className="hidden md:flex md:w-[45%] lg:w-[50%] relative flex-col justify-between p-12 overflow-hidden group perspective-1000">
        
        {/* Cinematic Background Image Layer (Zooms in smoothly on container hover) */}
        <div className="absolute inset-0 w-full h-full transform transition-transform duration-[4000ms] ease-out group-hover:scale-110 z-0">
          <img 
            src={plant} 
            alt="Botanical Background" 
            className="w-full h-full object-cover grayscale-[15%] contrast-[105%]"
          />
        </div>

        {/* Deep Organic Gradient Overlay Filter (Shifts tone slightly on hover) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020a05]/95 via-[#061b0e]/85 to-[#132c1a]/40 z-[1] transition-opacity duration-1000 group-hover:opacity-90" />

        {/* Floating Ambient Light Rays (Breathes and tracks depth shift) */}
        <div className="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-[#4a6549]/20 blur-[100px] animate-pulse z-[2] transform transition-transform duration-[3000ms] group-hover:translate-x-12 group-hover:translate-y-6"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#ccebc7]/10 blur-[90px] z-[2] transform transition-transform duration-[3000ms] group-hover:-translate-x-8"></div>

        {/* Logo / Brand Header */}
        <div className="relative z-10 flex items-center gap-2 text-white/90 transform transition-transform duration-1000 group-hover:translate-x-1">
          <Leaf className="w-5 h-5 text-[#b0cfad]" />
          <span className="font-serif text-lg tracking-wider font-medium">Chauhan Traders & Nursery</span>
        </div>

        {/* Center Quote/Branding Text (Pushes forward creating 3D depth isolation) */}
        <div className="relative z-10 my-auto max-w-md space-y-5 transform transition-all duration-[2000ms] ease-out group-hover:translate-y-[-4px] group-hover:scale-[1.01]">
          <div className="inline-block px-3 py-1 rounded-full border border-[#ccebc7]/20 bg-white/5 text-xs text-[#b0cfad] tracking-widest uppercase backdrop-blur-sm transition-all duration-700 group-hover:border-[#ccebc7]/40 group-hover:bg-white/10">
            Nurture Your Space
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif text-white leading-tight tracking-wide drop-shadow-md">
            Bring life, elegance, and pure air into your home sanctuary.
          </h2>
          <p className="text-sm text-stone-300 font-light leading-relaxed max-w-sm transition-colors duration-1000 group-hover:text-white">
            Join our green community today and unlock curation insights from our head botanists, exclusive pre-orders, and seamless tracking status.
          </p>
        </div>

        {/* Footer info inside sidebar */}
        <div className="relative z-10 text-xs text-stone-400/80 tracking-wide transform transition-transform duration-1000 group-hover:translate-y-[-2px]">
          © 2026 Chauhan Traders & Nursery. All rights reserved.
        </div>
      </div>

      {/* Right Column: Authentication Form Layout */}
      <div className="w-full md:w-[55%] lg:w-[50%] flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Mobile-only fallback brand display */}
        <div className="absolute md:hidden top-0 right-0 p-6 flex items-center gap-2 text-[#061b0e]/80">
          <Leaf className="w-4 h-4 text-[#4a6549]" />
          <span className="font-serif text-sm font-semibold">Chauhan Traders</span>
        </div>

        <div className="w-full max-w-md bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-8 rounded-2xl border border-stone-200/40 md:border-none transition-all duration-500">
          
          {/* Header Title Switcher Indicator */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-serif tracking-tight text-[#061b0e] transition-all duration-300">
              {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-stone-500 font-light">
              {currentState === 'Login' 
                ? 'Sign in to access your garden sanctuary dashboard.' 
                : 'Register now to start tracking your saved greenery profiles.'
              }
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Conditional Name Field Input */}
            <div className={`overflow-hidden transition-all duration-300 ease-out ${currentState === 'Login' ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'}`}>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 text-stone-400 w-5 h-5" />
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#4a6549] focus:bg-white rounded-xl text-sm transition-all outline-none" 
                  placeholder="Mohammad Mairaj" 
                  required={currentState !== 'Login'}
                />
              </div>
            </div>

            {/* Email Field Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-stone-400 w-5 h-5" />
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  type="email" 
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#4a6549] focus:bg-white rounded-xl text-sm transition-all outline-none" 
                  placeholder="yourname@domain.com" 
                  required
                />
              </div>
            </div>

            {/* Password Field Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">Secure Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-stone-400 w-5 h-5" />
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  type="password" 
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#4a6549] focus:bg-white rounded-xl text-sm transition-all outline-none" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            {/* Quick Action Helpers */}
            <div className="flex justify-between items-center text-xs pt-1">
              <p className="text-stone-500 hover:text-[#061b0e] cursor-pointer transition-colors underline underline-offset-4">
                Forgot your password?
              </p>
              {currentState === 'Login' ? (
                <p onClick={() => setCurrentState('Sign Up')} className="text-[#4a6549] font-medium hover:underline cursor-pointer transition-all">
                  Create account
                </p>
              ) : (
                <p onClick={() => setCurrentState('Login')} className="text-[#4a6549] font-medium hover:underline cursor-pointer transition-all">
                  Login Here
                </p>
              )}
            </div>

            {/* Main CTA Submission Button */}
            <button 
              type="submit" 
              className="w-full py-3.5 mt-4 bg-[#061b0e] text-white hover:bg-[#13301d] font-medium tracking-wide rounded-xl shadow-md shadow-[#061b0e]/10 transition-all active:scale-[0.99] flex items-center justify-center gap-2 group"
            >
              <span>{currentState === 'Login' ? 'Sign In' : 'Register Account'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;