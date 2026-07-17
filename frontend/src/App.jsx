import React, { useContext } from 'react' 
import { Routes, Route, useLocation, matchPath } from 'react-router-dom' // Imported matchPath
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify'
import Services from './pages/Services'
import Enquiry from './pages/Enquiry'
import Payment from './pages/Payment'
import Shipping from './pages/Shipping'
import Summary from './pages/Summary'
import UserDashboard from './pages/UserDashboard'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ProfileSetup from './pages/ProfileSetup'
import { ShopContext } from './context/ShopContext';
import Blog from './pages/Blog'
import BlogDetail from './components/BlogDetail'
import Gallery from './pages/Gallery'
import ServiceDetail from './components/ServicesDetail'

const App = () => {
  const location = useLocation();
  const { token, setToken } = useContext(ShopContext);

  // Define routes where global navigation elements should be hidden
  const hideNavbarRoutes = ['/shipping', '/orders', '/summary', '/payment', '/login', '/blogs', '/blog/:id', '/services/:id'];
  
  // Use matchPath to check if the current path matches any pattern in our array
  const shouldHideNavbar = hideNavbarRoutes.some(routePath => 
    matchPath({ path: routePath, end: true }, location.pathname)
  );

  // Define routes where the footer should be hidden
  const hideFooterRoutes = ['/login', '/blogs', '/blog/:id', '/shipping', '/services/:id', '/orders', '/summary', '/payment' ];
  
  const shouldHideFooter = hideFooterRoutes.some(routePath => 
    matchPath({ path: routePath, end: true }, location.pathname)
  );

  return (
    <>
      {/* Conditionally render components only if current route matches criteria */}
      {!shouldHideNavbar && (
        <>
          <Navbar />
          <SearchBar />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profilesetup" element={<ProfileSetup token={token} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

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
      {!shouldHideFooter && <Footer />}
    </>
  )
}

export default App