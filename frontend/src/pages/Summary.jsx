import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Summary = () => {
  const location = useLocation();
  const { navigate, currency } = useContext(ShopContext);

  // Safely extract the state sent via navigation routes
  const { order, paymentMethod } = location.state || {};

  // Protection fallback: If user reloads or hits /summary directly without order state data, send home.
  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="bg-[#f9faf7] text-[#191c1b] min-h-screen antialiased selection:bg-[#ccebc7]">
      {/* Dynamic Font Styling Loaders */}
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Work+Sans:wght@400;500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" rel="stylesheet" />

      {/* TopNavBar */}
      <header className="sticky top-0 z-50 w-full bg-[#f9faf7]/80 backdrop-blur-md border-b border-[#c3c8c1]/20 h-20 flex items-center px-4 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <h1 onClick={() => navigate("/")} className="font-serif text-2xl font-medium text-[#061b0e] tracking-tight cursor-pointer">
            Chauhan Traders & Nursery
          </h1>
          <div className="flex items-center gap-4 text-[#434843] text-sm font-medium">
            <span className="flex items-center gap-1 text-emerald-800">
              <span className="material-symbols-outlined text-[20px]">verified</span> Order Confirmed
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-12 py-12">
        {/* Progress Indicator Complete State */}
        <div className="flex items-center justify-center mb-12 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4a6549] text-white flex items-center justify-center text-sm font-semibold">✓</div>
            <span className="text-sm font-semibold text-[#4a6549]">Shipping</span>
          </div>
          <div className="w-12 h-px bg-[#4a6549]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4a6549] text-white flex items-center justify-center text-sm font-semibold">✓</div>
            <span className="text-sm font-semibold text-[#4a6549]">Payment</span>
          </div>
          <div className="w-12 h-px bg-[#4a6549]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#061b0e] text-white flex items-center justify-center text-sm font-semibold">3</div>
            <span className="text-sm font-semibold text-[#061b0e]">Confirmation</span>
          </div>
        </div>

        {/* Success Banner Message */}
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-[56px] text-[#4a6549] mb-2 animate-pulse">check_circle</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#061b0e] font-medium tracking-tight">Your Greenery is Secured!</h2>
          <p className="text-[#434843] text-sm mt-2 max-w-md mx-auto">
            Thank you for shopping with us. Your botanical order has been recorded successfully and is transitioning to processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Block: Purchased Manifest & Shipping Destination Details */}
          <div className="md:col-span-7 space-y-6">
            <section className="bg-[#f3f4f1] p-6 rounded-xl">
              <h3 className="font-serif text-xl text-[#061b0e] mb-4">Items Summary</h3>
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center bg-[#f9faf7] p-3 rounded-lg border border-[#c3c8c1]/20">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-[#e2e3e0] flex-shrink-0">
                      <img className="w-full h-full object-cover" src={item.image[0]} alt={item.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#191c1b] truncate">{item.name}</p>
                      <p className="text-xs text-[#434843]">Qty: {item.quantity} • Premium Live Stock</p>
                      <p className="text-xs font-semibold text-[#061b0e] mt-1">{currency}{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#f3f4f1] p-6 rounded-xl">
              <h3 className="font-serif text-xl text-[#061b0e] mb-3">Shipping Destination</h3>
              <p className="text-base font-medium text-[#191c1b]">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-[#434843] text-sm leading-relaxed mt-1">
                {order.address.address}{order.address.apartment ? `, ${order.address.apartment}` : ""}<br />
                {order.address.city}, {order.address.state} - {order.address.zip}
              </p>
              <p className="mt-2 text-[#434843] text-sm font-medium">{order.address.phone}</p>
            </section>
          </div>

          {/* Right Block: Transaction Pricing Invoices & Navigation Flows */}
          <div className="md:col-span-5 space-y-6">
            <section className="bg-[#edeeeb] border border-[#c3c8c1]/30 rounded-xl p-6">
              <h3 className="font-serif text-xl text-[#061b0e] mb-4">Transaction Details</h3>
              
              <div className="space-y-2 text-sm text-[#434843] mb-4">
                <div className="flex justify-between">
                  <span>Payment Strategy:</span>
                  <span className="font-medium text-[#191c1b]">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Carrier:</span>
                  <span className="font-medium text-[#191c1b]">Nursery Freight Delivery</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-[#c3c8c1]/30 pt-4">
                <div className="flex justify-between text-sm text-[#434843]">
                  <span>Subtotal</span>
                  <span>{currency}{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#434843]">
                  <span>Freight Charges</span>
                  <span>{currency}{order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#434843]">
                  <span>GST (18%)</span>
                  <span>{currency}{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif text-lg text-[#061b0e] pt-3 border-t border-[#c3c8c1]/40">
                  <span>Grand Total</span>
                  <span>{currency}{order.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-[#061b0e] text-white py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#061b0e]/90 transition-all active:scale-95 shadow-md shadow-[#061b0e]/10"
                >
                  <span className="material-symbols-outlined text-[18px]">yard</span> Continue Shopping
                </button>
                <button
                  onClick={() => navigate("/userdashboard")}
                  className="w-full border border-[#c3c8c1] text-[#061b0e] bg-white py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f3f4f1] transition-all"
                >
                  View All Orders
                </button>
                
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Copy */}
      <footer className="bg-[#f3f4f1] border-t border-[#c3c8c1]/30 mt-20 py-8 text-center">
        <p className="text-xs text-[#4a6549]">© 2026 Chauhan Traders & Nursery. Nurturing growth since 1985.</p>
      </footer>
    </div>
  );
};

export default Summary;