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
import Inquiries from './pages/Inquiries'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen antialiased'>
      <ToastContainer />
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
                <Route path='/inquiries' element={<Inquiries token={token} />} />
                <Route path='/settings' element={<Settings token={token} />} />
                <Route path='/dashboard' element={<Dashboard token={token} />} />
              </Routes>
            </div>

          </div>
        </>
      }
    </div>
  )
}

export default App