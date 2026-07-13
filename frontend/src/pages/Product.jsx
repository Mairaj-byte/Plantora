import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Enquiry from "./Enquiry"; // Make sure the path matches your project structure

import {
  Leaf,
  ShoppingBag,
  Sun,
  Droplet,
  Sprout,
  Truck,
  Bell
} from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  // State to control modal visibility
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);

    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <main className="pt-6 max-w-5xl mx-auto px-4 md:px-6 mb-16 transition-opacity ease-in duration-500 opacity-100 relative">

      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-1.5 mb-6 text-gray-400 text-xs tracking-wide">
        <a className="hover:text-emerald-800 transition-colors" href="/">Home</a>
        <span className="text-gray-300 text-xs">/</span>
        <a className="hover:text-emerald-800 transition-colors" href="/collection">Catalog</a>
        <span className="text-gray-300 text-xs">/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px]">{productData.name}</span>
      </nav>

      {/* Main Framework Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Product Media Column Showcase */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none space-y-3">
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#F4F6F2] border border-gray-100">
            <img
              alt={productData.name}
              className="w-full h-full object-cover transition-all duration-300"
              src={image}
            />
          </div>

          {/* Gallery Thumbnails List */}
          <div className="grid grid-cols-4 gap-2.5">
            {productData.image.map((item, index) => (
              <button
                key={index}
                onClick={() => setImage(item)}
                className={`aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-all border-2 bg-[#F4F6F2] ${image === item ? 'border-emerald-800 scale-[0.98]' : 'border-transparent'}`}
              >
                <img
                  alt={`${productData.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={item}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Info Sidebar */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold tracking-wide mb-3">
              <Leaf className="w-3 h-3 text-emerald-700" strokeWidth={2.5} />
              <span>Premium Quality • Low Maintenance</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-1">{productData.name}</h1>
            <p className="text-xs uppercase tracking-wider font-semibold text-emerald-700/80">{productData.category} &middot; {productData.subCategory}</p>
          </div>

          {/* Rating Reviews Component */}
          <div className="flex items-center gap-1 bg-gray-50 inline-flex px-2.5 py-1 rounded-lg border border-gray-100">
            <div className="flex items-center gap-0.5">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} alt="Star" className="w-3 h-3" />
              ))}
              <img src={assets.star_dull_icon} alt="Star dull" className="w-3 h-3" />
            </div>
            <p className="pl-1.5 text-[11px] text-gray-500 font-medium">(122 Reviews)</p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pt-1 border-t border-gray-100">
            <span className="text-2xl font-bold text-gray-900">
              {productData.subCategory === 'Services' ? (
                "Variable Price Range"
              ) : productData.price === 0 ? (
                "Out of Stock"
              ) : (
                `${currency}${productData.price}`
              )}
            </span>

            {/* Only show discount if it's not a service and has a price */}
            {productData.subCategory !== 'Services' && productData.price > 0 && (
              <>
                <span className="text-gray-400 line-through text-xs">
                  {currency}{(productData.price * 1.3).toFixed(0)}
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">30% OFF</span>
              </>
            )}
          </div>

          {/* Core dynamic description snippet */}
          <p className="text-gray-600 leading-relaxed text-sm max-w-2xl">
            {productData.description || "Renowned for its structural statement look, this vibrant botanical addition adapts gracefully to your interior framework while purifying native surrounding air parameters naturally."}
          </p>

          {/* Conditional Add to Cart / Enquiry Layout */}
          <div className="pt-2 max-w-md">
            {productData.subCategory === 'Services' || productData.price === 0 ? (
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full bg-amber-600 text-white font-medium py-3.5 px-6 rounded-xl hover:bg-amber-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <Bell className="w-4 h-4" /> Enquiry Now
              </button>
            ) : (
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full bg-emerald-950 text-white font-medium py-3.5 px-6 rounded-xl hover:bg-emerald-900 transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            )}
          </div>

          {/* Growth Requirements Matrix */}
          <div className="bg-[#F4F6F2] p-4 rounded-xl border border-gray-200/40 max-w-xl">
            <h3 className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Growth Requirements</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center text-center bg-white p-2.5 rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-1">
                  <Sun className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Sunlight</span>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">Bright Indirect</p>
              </div>
              <div className="flex flex-col items-center text-center bg-white p-2.5 rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                  <Droplet className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Watering</span>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">Once Weekly</p>
              </div>
              <div className="flex flex-col items-center text-center bg-white p-2.5 rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Soil Profile</span>
                <p className="text-xs font-semibold text-gray-800 mt-0.5">Well-draining</p>
              </div>
            </div>
          </div>

          {/* Micro Logistics Information Banner */}
          <div className="flex items-start gap-3 p-3.5 border border-amber-100 rounded-xl bg-amber-50/40 max-w-xl">
            <div className="text-amber-800 p-1 bg-amber-100/50 rounded-lg">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-amber-900">Secure Commercial Shipping</h4>
              <p className="text-[11px] text-amber-800/80 leading-normal mt-0.5">Every package is curated dynamically using organic secure wraps for safe delivery transit.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Hook Section Wrapper */}
      <div className="border-t border-gray-100 mt-10 pt-10">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>

      {/* ENQUIRY MODAL OVERLAY */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <Enquiry
              plantName={productData.name}
              onClose={() => setIsEnquiryOpen(false)}
            />
          </div>
        </div>
      )}

    </main>
  ) : (
    <div className="opacity-0 min-h-screen"></div>
  );
};

export default Product;