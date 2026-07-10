import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronLeft,
  LayoutDashboard,
  LogOut
} from "lucide-react";



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

  // Trigger the pop/shake visual effect when cartCount updates
  useEffect(() => {
    if (cartCount === 0) return;
    setAnimateCart(true);
    const timer = setTimeout(() => setAnimateCart(false), 500);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <>
      {/* Dynamic Keyframe Injection for the Cart Pop/Shake Effect */}
      <style>{`
        @keyframes cart-bump {
          0% { transform: scale(1); }
          20% { transform: scale(1.3) rotate(-10deg); }
          40% { transform: scale(1.3) rotate(10deg); }
          60% { transform: scale(1.2) rotate(-5deg); }
          80% { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1); }
        }
        .animate-cart-pop {
          animation: cart-bump 0.5s ease-in-out;
        }
      `}</style>

      <nav className='sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-stone-100 px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between transition-all duration-300'>

        {/* Brand Logo */}
        <a href="/about">
          <img
            src={assets.WebLogo}
            className="w-28 sm:w-32 md:w-40 transition-transform duration-300 group-hover:scale-[1.01]"
            alt="Nursery Logo"
          />
        </a>


        {/* Right Side Utility & Navigation Panel combined closer together */}
        <div className='flex items-center gap-6 md:gap-8 flex-1 justify-end max-w-5xl ml-auto'>

          {/* Navigation Menu Links (Desktop) - Large font & adjacent to search */}
          <ul className='hidden lg:flex items-center gap-7 xl:gap-8 text-[15px] font-medium tracking-wide text-stone-700 font-sans'>
            {[
              { name: 'Home', path: '/' },
              { name: 'Our Plants', path: '/collection' },
              { name: 'Services', path: '/services' },
              { name: 'About Us', path: '/about' },
              { name: 'Contact Us', path: '/contact' }
            ].map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `group relative py-2 transition-colors duration-200 hover:text-emerald-900 text-stone-600 font-medium ${isActive ? 'text-emerald-950 font-semibold' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {/* Smooth custom sliding/growing active underline item */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-emerald-800 transition-all duration-300 origin-left ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </ul>

          {/* Permanent Search Bar Input (Desktop/Tablet) */}
          <div
            onClick={() => { setShowSearch(true); navigate('/collection') }}
            className='hidden md:flex items-center gap-3 bg-stone-100/80 border border-stone-200/50 px-4 py-2 rounded-full w-full max-w-[200px] lg:max-w-[240px] cursor-pointer hover:bg-stone-100 transition-all duration-200 group flex-shrink-0'
          >
            <Search
              size={16}
              className="text-stone-500 group-hover:text-stone-700 transition-colors"
            />
            <input
              type="text"
              placeholder="Search plants..."
              disabled
              className='bg-transparent text-xs text-stone-600 outline-none w-full placeholder-stone-400 cursor-pointer'
            />
          </div>

          {/* Action Controls Frame */}
          <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>

            {/* Mobile Search Icon Alternative */}
            <button
              onClick={() => { setShowSearch(true); navigate('/collection') }}
              className='block md:hidden p-2 hover:bg-stone-100 rounded-full transition-colors'
              aria-label="Search"
            >
              <Search size={20} className="text-stone-700" />
            </button>

            {/* Shopping Cart Icon Trigger with Dynamic CSS Pop Effect */}
            <Link
              to='/cart'
              className={`relative p-2 hover:bg-stone-100 rounded-full transition-colors duration-200 block ${animateCart ? 'animate-cart-pop text-emerald-800' : ''}`}
            >
              <ShoppingCart size={20} className="text-stone-700" />
              {cartCount > 0 && (
                <span className='absolute top-1 right-1 bg-emerald-700 text-white font-bold text-[9px] h-4 min-w-4 px-1 flex items-center justify-center rounded-full shadow-sm'>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account Context Anchor */}
            <div className='group relative'>
              <button
                onClick={() => token ? null : navigate('/login')}
                className='p-2 hover:bg-stone-100 rounded-full transition-colors duration-200 block'
                aria-label="Account Settings"
              >
                <User size={22} className="text-stone-700" />
              </button>

              {token && (
                <div className="absolute right-0 top-full pt-3 w-52 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col p-1.5 bg-white shadow-xl rounded-2xl border border-[#c3c8c1]/30 text-[#2c302b]">

                    {/* Decorative tiny subtle tag header */}
                    <div className="px-3 pt-2 pb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#737973]">Account Actions</span>
                    </div>

                    {/* Profile Setup Option */}
                    <button
                      onClick={() => navigate('/profilesetup')}
                      className="w-full flex items-center gap-3 text-left font-medium text-xs sm:text-sm px-3 py-2.5 rounded-xl hover:bg-[#f9faf7] hover:text-[#061b0e] transition-all duration-150 group/item"
                    >
                      <User className="w-4 h-4 text-[#737973] group-hover/item:text-[#4a6549] transition-colors" />
                      <span>Profile Setup</span>
                    </button>

                    {/* Dashboard Option */}
                    <button
                      onClick={() => navigate('/userdashboard')}
                      className="w-full flex items-center gap-3 text-left font-medium text-xs sm:text-sm px-3 py-2.5 rounded-xl hover:bg-[#f9faf7] hover:text-[#061b0e] transition-all duration-150 group/item"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#737973] group-hover/item:text-[#4a6549] transition-colors" />
                      <span>Dashboard</span>
                    </button>

                    {/* Clean Divider */}
                    <div className="h-[1px] bg-[#c3c8c1]/20 my-1 mx-2" />

                    {/* Logout Option */}
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 text-left font-medium text-xs sm:text-sm px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50/60 transition-all duration-150 group/item"
                    >
                      <LogOut className="w-4 h-4 text-red-400 group-hover/item:text-red-600 transition-colors" />
                      <span>Logout</span>
                    </button>

                  </div>
                </div>
              )}


            </div>

            {/* Desktop Action Button */}
            <a href="https://plantora-uots.vercel.app/" target="_blank" rel="noreferrer" className='hidden sm:block'>
              <button className="bg-[#0b2216] hover:bg-emerald-900 text-white font-medium py-2 px-4 md:px-5 rounded-full text-xs transition-all duration-300 shadow-sm whitespace-nowrap tracking-wide">
                Admin Panel
              </button>
            </a>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setVisible(true)}
              className='lg:hidden p-2 hover:bg-stone-100 rounded-full transition-colors duration-200'
              aria-label="Open Menu"
            >
              <Menu size={20} className="text-stone-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Canvas */}
      <div
        onClick={() => setVisible(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-full max-w-[300px] shadow-2xl transition-transform duration-300 ease-in-out transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full text-stone-700 bg-stone-50/50 overflow-y-auto'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-5 cursor-pointer text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-100 bg-white'>
            <img className='h-4 rotate-180 opacity-70' src={assets.dropdown_icon} alt="" />
            <span className='text-xs font-semibold uppercase tracking-wider'>Close Menu</span>
          </div>

          <div className="flex flex-col py-4 px-3 gap-1">
            {[
              { name: 'HOME', path: '/' },
              { name: 'OUR PLANTS', path: '/collection' },
              { name: 'SERVICES', path: '/services' },
              { name: 'ABOUT US', path: '/about' },
              { name: 'CONTACT US', path: '/contact' }
            ].map((item, idx) => (
              <NavLink
                key={idx}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-xl text-sm font-medium tracking-wide transition-all ${isActive ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'hover:bg-stone-100'}`
                }
                to={item.path}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Admin Option Line & URL */}
            <hr className="my-2 border-stone-200" />
            <a
              href="https://plantora-uots.vercel.app/dashboard"
              target="_blank"
              rel="noreferrer"
              onClick={() => setVisible(false)}
              className="py-3 px-4 rounded-xl text-sm font-semibold tracking-wide text-white bg-[#0b2216] hover:bg-emerald-900 transition-all text-center mt-1 shadow-sm"
            >
              ADMIN PANEL
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;