import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Search, ShoppingCart, User, Menu, LayoutDashboard, LogOut, X } from "lucide-react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  
  const cartCount = getCartCount();

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  useEffect(() => {
    if (cartCount === 0) return;
    setAnimateCart(true);
    const timer = setTimeout(() => setAnimateCart(false), 500);
    return () => clearTimeout(timer);
  }, [cartCount]);

  // Updated navigation layout array
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'OUR PLANTS', path: '/collection' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'NEWS & BLOGS', path: '/blogs' }
  ];

  return (
    <>
      {/* Updated Navbar with Dark Background Theme */}
      <nav className='sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-lg border-b border-stone-800/60 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md'>
        
        {/* Weblogo */}
        <Link to="/" className="flex-shrink-0">
          <img src={assets.webLogo1} className="w-28 sm:w-36 transition-transform hover:scale-105 brightness-110" alt="Logo" />
        </Link>

        {/* Desktop Center Navigation Links */}
        <ul className='hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] font-medium tracking-wide text-stone-300'>
          {navLinks.map((item, idx) => (
            <NavLink 
              key={idx} 
              to={item.path} 
              className={({ isActive }) => `relative py-2 transition-colors hover:text-emerald-400 ${isActive ? 'text-white font-semibold' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-emerald-500 transition-all duration-300 w-full ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right Side Actions Panel */}
        <div className='flex items-center gap-2 sm:gap-4'>
          

          <button onClick={() => { setShowSearch(true); navigate('/collection'); }} className='block lg:hidden p-2 hover:bg-stone-900 rounded-full transition-colors'>
            <Search size={20} className="text-stone-300" />
          </button>

          {/* Cart Icon & Badge updates */}
          <Link to='/cart' className={`relative p-2 hover:bg-stone-900 rounded-full transition-all ${animateCart ? 'scale-110 text-emerald-400' : ''}`}>
            <ShoppingCart size={20} className="text-stone-300" />
            {cartCount > 0 && (
              <span className='absolute top-1 right-1 bg-emerald-600 text-white font-bold text-[9px] h-4 w-4 flex items-center justify-center rounded-full shadow-sm animate-bounce'>
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Options Dropdown Restyled */}
          <div className='group relative'>
            <button onClick={() => !token && navigate('/login')} className='p-2 hover:bg-stone-900 rounded-full block transition-colors'>
              <User size={20} className="text-stone-300" />
            </button>

            {token && (
              <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                <div className="flex flex-col p-1.5 bg-stone-900 shadow-xl rounded-xl border border-stone-800 text-stone-300">
                  <button onClick={() => navigate('/profilesetup')} className="w-full flex items-center gap-2 text-left text-xs px-3 py-2 rounded-lg hover:bg-stone-800/60 hover:text-white transition-colors">
                    <User size={14} /> Profile Setup
                  </button>
                  <button onClick={() => navigate('/userdashboard')} className="w-full flex items-center gap-2 text-left text-xs px-3 py-2 rounded-lg hover:bg-stone-800/60 hover:text-white transition-colors">
                    <LayoutDashboard size={14} /> Dashboard
                  </button>
                  <hr className="my-1 border-stone-800" />
                  <button onClick={logout} className="w-full flex items-center gap-2 text-left text-xs px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Book Free Consultation Button - Only on Large Screens */}
          <button 
            onClick={() => navigate('/consultation')}
            className='hidden lg:block text-xs font-semibold tracking-wider px-5 py-2.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 shadow-md transition-all'
          >
            Book Free Consultation
          </button>

          {/* Mobile Menu Icon */}
          <button onClick={() => setVisible(true)} className='lg:hidden p-2 hover:bg-stone-900 rounded-full transition-colors'>
            <Menu size={20} className="text-stone-300" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div onClick={() => setVisible(false)} className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-stone-950 w-full max-w-[280px] shadow-2xl transition-transform duration-300 ease-in-out border-l border-stone-800/60 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full bg-stone-950'>
          <div onClick={() => setVisible(false)} className='flex items-center justify-between p-4 cursor-pointer border-b border-stone-800 bg-stone-900/40'>
            <span className='text-xs font-bold uppercase tracking-wider text-stone-400'>Menu</span>
            <X size={18} className="text-stone-400" />
          </div>

          <div className="flex flex-col py-3 px-2 gap-1">
            {navLinks.map((item, idx) => (
              <NavLink 
                key={idx} 
                onClick={() => setVisible(false)} 
                to={item.path}
                className={({ isActive }) => `py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-emerald-950/60 text-emerald-400 font-semibold' : 'text-stone-300 hover:bg-stone-900'}`}
              >
                {item.name.toUpperCase()}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;