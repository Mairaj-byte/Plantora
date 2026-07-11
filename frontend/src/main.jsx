import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { HelmetProvider } from 'react-helmet-async' // Added to handle dynamic SEO head mutations safely
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ 
    v7_startTransition: true,
    v7_relativeSplatPath: true 
  }}>
    <ShopContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ShopContextProvider>
  </BrowserRouter>,
)