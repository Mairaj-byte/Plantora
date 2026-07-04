import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ArrowRight, Lock, Clock, Leaf, Trash2, Plus } from "lucide-react";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Calculate dynamic count for wholesale visibility logic
  const totalUnits = cartData.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calculate raw subtotal
  const subtotal = cartData.reduce((acc, item) => {
    const product = products.find(p => p._id === item._id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const tax = subtotal * 0.08; // 8% Estimated Tax
  const total = subtotal + tax;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 scroll-smooth">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
        
        {/* Shopping List Section */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl sm:text-3xl font-serif mb-6 md:mb-8 text-neutral-900 tracking-tight">
            Your Botanical Selection
          </h1>
          
          <div className="space-y-4 md:space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl shadow-xs border border-neutral-100 transition-all sm:hover:-translate-y-1 sm:hover:shadow-md duration-300"
                >
                  {/* Image Container */}
                  <div className="w-full sm:w-32 h-48 sm:h-40 flex-shrink-0 bg-neutral-50 rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 flex flex-col justify-between min-h-[120px] sm:h-40">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg sm:text-xl font-medium text-neutral-800">
                          {productData.name}
                        </h3>
                        <button 
                          onClick={() => updateQuantity(item._id, 0)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5 stroke-[1.75]" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">
                        Nursery Choice • Premium Grade
                      </p>
                    </div>

                    {/* Quantity & Price Row */}
                    <div className="flex justify-between items-end mt-4 sm:mt-0">
                      <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden bg-neutral-50">
                        <button
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-neutral-200/50 transition-colors text-neutral-700 disabled:opacity-30 disabled:pointer-events-none text-sm font-medium"
                        >
                          -
                        </button>
                        <span className="px-4 py-1.5 text-sm font-medium border-x border-neutral-200 text-neutral-800 bg-white min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-neutral-200/50 transition-colors text-neutral-700 text-sm font-medium"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg sm:text-xl font-semibold text-neutral-900">
                        {currency}{(productData.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {cartData.length === 0 && (
              <div className="text-center py-16 bg-neutral-50/50 rounded-xl border border-dashed border-neutral-200">
                <p className="text-neutral-500 mb-4">Your collection basket is currently empty.</p>
                <button 
                  onClick={() => navigate('/')} 
                  className="text-sm font-medium underline hover:text-neutral-700 focus:outline-none"
                >
                  Explore Plants
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Wholesale Banner */}
          {totalUnits > 0 && (
            <div className="mt-8 md:mt-12 p-6 md:p-8 bg-emerald-50 text-emerald-950 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-100">
              <div className="max-w-md">
                <h4 className="text-lg font-semibold text-emerald-900 mb-1 md:mb-2">Planning a Larger Landscape?</h4>
                <p className="text-sm text-emerald-800/90 leading-relaxed">Orders exceeding 10 units are eligible for custom wholesale pricing and specialized logistics handling.</p>
              </div>
              <button className="w-full md:w-auto whitespace-nowrap bg-emerald-900 text-white text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-emerald-950 transition-all transform active:scale-98 duration-200 shadow-xs">
                Wholesale Inquiry
              </button>
            </div>
          )}
        </div>

        {/* Cart Summary Sidebar */}
        <aside className="w-full lg:w-[400px] mt-4 lg:mt-0">
          <div className="lg:sticky lg:top-8 bg-neutral-50 border border-neutral-200/60 rounded-2xl p-5 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif text-neutral-900 mb-6 tracking-tight flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-700 stroke-[1.5]" />
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Subtotal ({totalUnits} {totalUnits === 1 ? 'item' : 'items'})</span>
                <span className="font-medium text-neutral-900">{currency}{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-neutral-600">
                <span>Shipping Estimate</span>
                <span className="text-emerald-700 font-semibold text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Free Nursery Pickup
                </span>
              </div>

              <div className="flex justify-between text-sm text-neutral-600">
                <span>Estimated Tax</span>
                <span className="font-medium text-neutral-900">{currency}{tax.toFixed(2)}</span>
              </div>

              <hr className="border-neutral-200/80 my-4" />

              <div className="flex justify-between items-baseline">
                <span className="text-base font-medium text-neutral-900">Total</span>
                <span className="text-2xl font-semibold text-neutral-900 tracking-tight">
                  {currency}{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/shipping")}
              disabled={cartData.length === 0}
              className="w-full bg-neutral-950 text-white px-6 py-4 rounded-xl font-medium text-sm mb-4 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-neutral-950/5 hover:bg-emerald-700 hover:shadow-emerald-700/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <div className="text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5 py-1">
              <Lock className="w-3.5 h-3.5 text-neutral-400 stroke-[2]" />
              <span>Secure 256-bit SSL encrypted checkout</span>
            </div>

            {/* Nursery Operational Info Notice */}
            <div className="mt-6 sm:mt-8 pt-6 border-t border-neutral-200/60">
              <div className="bg-white p-4 rounded-xl border border-neutral-100 flex gap-3.5 shadow-xs">
                <div className="p-2 bg-emerald-50 rounded-lg h-fit text-emerald-700">
                  <Clock className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Nursery Gate Open 24/7</p>
                  <p className="text-[11px] text-neutral-400 leading-normal mt-0.5">
                    Your unique local digital pickup pass will be generated instantly upon payment confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Suggested Add-ons Bento Grid */}
      <section className="mt-16 md:mt-24">
        <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-6 md:mb-8 text-center">Frequently Bought Together</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Item 1 */}
          <div className="bg-white p-4 md:p-5 rounded-xl border border-neutral-100 shadow-xs group flex flex-col justify-between">
            <div>
              <div className="h-44 md:h-48 mb-4 overflow-hidden rounded-lg bg-neutral-50">
                <img 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                  src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=600&q=80" 
                  alt="Potting Mix" 
                />
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Premium Care</p>
              <h4 className="text-base font-medium text-neutral-800 mb-2">Organic Botanical Potting Mix</h4>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-semibold text-neutral-900">$18.00</span>
              <button className="p-2 bg-neutral-50 text-neutral-700 hover:bg-emerald-700 hover:text-white rounded-lg transition-colors group/btn">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-4 md:p-5 rounded-xl border border-neutral-100 shadow-xs group flex flex-col justify-between">
            <div>
              <div className="h-44 md:h-48 mb-4 overflow-hidden rounded-lg bg-neutral-50">
                <img 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                  src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80" 
                  alt="Ceramic Pot" 
                />
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Accessories</p>
              <h4 className="text-base font-medium text-neutral-800 mb-2">Nordic Terracotta Ceramic Pot</h4>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-semibold text-neutral-900">$32.00</span>
              <button className="p-2 bg-neutral-50 text-neutral-700 hover:bg-emerald-700 hover:text-white rounded-lg transition-colors group/btn">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white p-4 md:p-5 rounded-xl border border-neutral-100 shadow-xs group flex flex-col justify-between sm:col-span-2 md:col-span-1">
            <div>
              <div className="h-44 md:h-48 mb-4 overflow-hidden rounded-lg bg-neutral-50">
                <img 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80" 
                  alt="Watering Can" 
                />
              </div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">Tools</p>
              <h4 className="text-base font-medium text-neutral-800 mb-2">Heritage Brass Watering Can</h4>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-semibold text-neutral-900">$55.00</span>
              <button className="p-2 bg-neutral-50 text-neutral-700 hover:bg-emerald-700 hover:text-white rounded-lg transition-colors group/btn">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Cart;