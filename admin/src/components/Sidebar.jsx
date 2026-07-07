import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingBag, 
  ClipboardList, 
  Settings, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react'

const Sidebar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Style helper for nav navigation links
  const navLinkClass = ({ isActive }) => 
  `flex items-center gap-3 px-4 py-3 mx-4 rounded-lg transition-all duration-200 text-[15px] font-medium ${
    isActive 
      ? 'bg-[#1A4331] text-[#EAF5F0] shadow-sm font-semibold' 
      : 'text-[#2C3E35]/70 hover:bg-[#1A4331]/5 hover:text-[#1A4331]'
  }`;

  // Reusable Main Logo/Brand component
  const BrandLogo = () => (
    <div className='flex flex-col items-center text-center px-2 py-1 select-none'>
      <div className='text-xl md:text-2xl font-serif text-[#1A4331] font-semibold tracking-wider leading-tight'>
        ECO GARDEN
      </div>
      <div className='text-3xl md:text-4xl font-serif text-[#A0522D] font-medium tracking-widest leading-none mt-1'>
        NURSERY
      </div>
      <div className='w-full border-b border-gray-400 my-2 shadow-sm'></div>
      <div className='text-[9px] md:text-[10px] tracking-[0.2em] text-gray-800 font-medium whitespace-nowrap'>
        NATURE AT YOUR FINGERTIPS
      </div>
    </div>
  )

  // Reusable Nav items collection
  const NavItems = () => (
    <nav className='flex flex-col gap-1 mt-6'>
      <NavLink className={navLinkClass} to="/dashboard" onClick={() => setIsOpen(false)}>
        <LayoutDashboard className='w-5 h-5 transition-opacity' />
        <span>Dashboard</span>
      </NavLink>

      <NavLink className={navLinkClass} to="/enquiries" onClick={() => setIsOpen(false)}>
        <MessageSquare className='w-5 h-5 transition-opacity' />
        <span>Enquiries</span>
      </NavLink>

      <NavLink className={navLinkClass} to="/products" onClick={() => setIsOpen(false)}>
        <ShoppingBag className='w-5 h-5 transition-opacity' />
        <span>Products</span>
      </NavLink>

      <NavLink className={navLinkClass} to="/orders" onClick={() => setIsOpen(false)}>
        <ClipboardList className='w-5 h-5 transition-opacity' />
        <span>Orders</span>
      </NavLink>

      <NavLink className={navLinkClass} to="/settings" onClick={() => setIsOpen(false)}>
        <Settings className='w-5 h-5 transition-opacity' />
        <span>Settings</span>
      </NavLink>
    </nav>
  )

  return (
    <>
      {/* --- MOBILE TOP BAR --- */}
      <div className='lg:hidden w-full h-16 bg-[#F8F9FA] border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 z-40'>
        <div className='scale-75 origin-left'>
          <div className='text-sm font-serif text-[#1A4331] font-bold tracking-wider'>ECO GARDEN</div>
          <div className='text-lg font-serif text-[#A0522D] font-bold tracking-widest leading-none'>NURSERY</div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className='p-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none'
        >
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY BACKGROUND --- */}
      {isOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity' 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      {/* Changed left-0 to right-0, border-r to border-l, and -translate-x-full to translate-x-full */}
      <div className={`
        fixed lg:sticky top-0 right-0 h-screen bg-[#f0f2eb] border-l border-gray-200 
        flex flex-col justify-between py-8 z-50 transition-transform duration-300 ease-in-out
        w-[260px] lg:w-[22%] xl:w-[18%] shrink-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Section: Brand & Nav */}
        <div>
          {/* Close button inside mobile menu */}
          <div className='lg:hidden flex justify-end px-4 mb-2'>
            <button onClick={() => setIsOpen(false)} className='p-1 text-gray-500 hover:bg-gray-800 rounded-full'>
              <X className='w-5 h-5' />
            </button>
          </div>

          <BrandLogo />
          <NavItems />
        </div>

        {/* Bottom Section: Profile & Logout Controls */}
        <div className='flex flex-col gap-4'>
          {/* User Profile */}
          <div className='px-6 pt-4 border-t border-gray-300 mx-4 flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-[#EAF5F0] text-[#1A4331] font-bold flex items-center justify-center text-sm shrink-0'>
              AD
            </div>
            <div className='overflow-hidden'>
              <h4 className='text-sm font-semibold text-gray-800 leading-tight truncate'>Admin User</h4>
              <p className='text-xs text-gray-500 truncate'>Manager</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className='px-4'>
            <button 
              onClick={() => {
                if(setToken) setToken('');
                setIsOpen(false);
              }} 
              className='w-full flex items-center justify-center gap-2 bg-[#1A4331] hover:bg-[#133325] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-150'
            >
              <LogOut className='w-4 h-4' />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar