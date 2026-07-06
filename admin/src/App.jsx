import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Enquiries from './pages/Enquiries'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen antialiased'>
      <ToastContainer
              position="top-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
              toastClassName={() =>
                "relative flex p-4 min-h-16 rounded-2xl justify-between overflow-hidden cursor-pointer bg-white/95 backdrop-blur-md border border-stone-100 shadow-[0_10px_30px_rgba(11,34,22,0.08)] mb-4"
              }
              bodyClassName={() =>
                "flex text-xs sm:text-sm font-light tracking-wide text-stone-800 items-center p-0 m-0"
              }
              progressClassName={() =>
                "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-950"
              }
            />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          {/* <Navbar setToken={setToken} /> */}
          
          {/* Flex layout container: arranges sidebar and content side-by-side */}
          <div className='flex flex-col lg:flex-row w-full min-h-screen'>
            
            {/* Added setToken prop so the sidebar's logout feature functions */}
            <Sidebar setToken={setToken} />
            
            {/* MAIN CONTENT CONTAINER:
              - flex-1: allows container to expand into all remaining horizontal space cleanly
              - px-4 md:px-8: provides proportional responsive spacing
              - pt-24 lg:pt-8: adds spacing above content on mobile layout to sit cleanly below fixed top-bar
            */}
            <div className='flex-1 px-4 md:px-8 pt-24 lg:pt-8 pb-8 text-gray-600 text-base overflow-x-hidden'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/enquiries' element={<Enquiries token={token} />} />
                <Route path='/settings' element={<Settings token={token} />} />
                <Route path='/dashboard' element={<Dashboard token={token} />} />
                <Route path='/products' element={<Products token={token} />} />
              </Routes>
            </div>

          </div>
        </>
      }
    </div>
  )
}

export default App