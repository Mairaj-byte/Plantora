import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const [method, setMethod] = useState("cod");
  const [addressData, setAddressData] = useState(null);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    currency,
  } = useContext(ShopContext);

  // Fallback protection check to verify address details are present
  useEffect(() => {
    if (location.state && location.state.addressData) {
      setAddressData(location.state.addressData);
    } else {
      toast.error("Please fill out your shipping address first");
      navigate("/shipping");
    }
  }, [location, navigate]);

  // Pricing Calculations matching layout targets
  const subtotal = getCartAmount();
  const tax = subtotal * 0.18; // 18% GST match from blueprint
  const total = subtotal + (delivery_fee || 150) + tax;

  const initPay = (order, orderDataSnapshot) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyData = {
            userId: localStorage.getItem("userId"),
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            verifyData,
            { headers: { token } }
          );

          if (data.success) {
            toast.success("Payment Successful");
            setCartItems({});
            navigate("/summary", { state: { order: orderDataSnapshot, paymentMethod: "Razorpay Online" } });
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
      theme: { color: "#4a6549" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async () => {
    if (!addressData) return;

    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        const itemInfo = structuredClone(
          products.find((product) => product._id === itemId)
        );
        if (itemInfo) {
          itemInfo.quantity = cartItems[itemId];
          orderItems.push(itemInfo);
        }
      }

      const orderData = {
        address: addressData,
        items: orderItems,
        subtotal: subtotal,
        tax: tax,
        deliveryFee: delivery_fee || 150,
        amount: total,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success("Order Placed Successfully");
            setCartItems({});
            navigate("/summary", { state: { order: orderData, paymentMethod: "Cash On Delivery (COD)" } });
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "stripe": {
          const response = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            window.location.replace(response.data.session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "razorpay": {
          const response = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            initPay(response.data.order, orderData);
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!addressData) return null;

  return (
    <div className="bg-[#f9faf7] text-[#191c1b] min-h-screen antialiased selection:bg-[#ccebc7]">
      {/* Dynamic Font Styling Loaders */}
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Work+Sans:wght@400;500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" rel="stylesheet" />

      {/* TopNavBar (Checkout Specific) */}
      <header className="sticky top-0 z-50 w-full bg-[#f9faf7]/80 backdrop-blur-md border-b border-[#c3c8c1]/20 h-20 flex items-center px-4 sm:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <h1 onClick={() => navigate("/")} className="font-serif text-2xl font-medium text-[#061b0e] tracking-tight cursor-pointer">
            Chauhan Traders & Nursery
          </h1>
          <div className="flex items-center gap-4 text-[#434843] text-sm font-medium">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px]">lock</span> Secure Checkout
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4a6549] text-white flex items-center justify-center text-sm font-semibold">1</div>
            <span className="text-sm font-semibold text-[#4a6549]">Shipping</span>
          </div>
          <div className="w-12 h-px bg-[#c3c8c1]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#061b0e] text-white flex items-center justify-center text-sm font-semibold">2</div>
            <span className="text-sm font-semibold text-[#061b0e]">Payment</span>
          </div>
          <div className="w-12 h-px bg-[#c3c8c1]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[#c3c8c1] text-[#434843]/50 flex items-center justify-center text-sm font-semibold">3</div>
            <span className="text-sm font-semibold text-[#434843]/50">Order Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Payment & Shipping Selection */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Shipping Review Section */}
            <section className="bg-[#f3f4f1] p-8 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-serif text-2xl text-[#061b0e]">Shipping Details</h2>
                <button onClick={() => navigate("/shipping")} className="text-[#4a6549] text-sm font-semibold flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold text-[#434843] mb-1 uppercase tracking-wider">Delivery Address</p>
                  <p className="text-lg text-[#191c1b]">{addressData.firstName} {addressData.lastName}</p>
                  <p className="text-[#434843] text-sm leading-relaxed mt-1">
                    {addressData.address}{addressData.apartment ? `, ${addressData.apartment}` : ""}<br />
                    {addressData.city}, {addressData.state} - {addressData.zip}
                  </p>
                  <p className="mt-2 text-[#434843] text-sm font-medium">{addressData.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#434843] mb-1 uppercase tracking-wider">Delivery Method</p>
                  <p className="text-lg text-[#191c1b]">Standard Nursery Freight</p>
                  <p className="text-[#434843] text-sm leading-relaxed mt-1">Estimated delivery: 2-3 business days. Safe-handling for live botanical stock guaranteed.</p>
                </div>
              </div>
            </section>

            {/* Payment Method Section */}
            <section>
              <h2 className="font-serif text-2xl text-[#061b0e] mb-6">Payment Method</h2>
              <div className="space-y-4">
                
                {/* Razorpay Options */}
                <label 
                  onClick={() => setMethod("razorpay")}
                  className={`group flex items-center p-6 bg-[#f9faf7] border rounded-xl cursor-pointer transition-all active:scale-[0.99] ${
                    method === "razorpay" ? "border-[#4a6549] bg-[#f3f4f1]" : "border-[#c3c8c1]/30"
                  }`}
                >
                  <input 
                    type="radio" name="payment" value="razorpay" 
                    checked={method === "razorpay"} onChange={() => setMethod("razorpay")}
                    className="w-5 h-5 text-[#4a6549] border-[#c3c8c1] focus:ring-[#4a6549]"
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-lg font-medium text-[#191c1b]">UPI / Online Checkout</p>
                    <p className="text-xs text-[#434843]">Instant payment using Razorpay gateway (GPay, PhonePe, Cards)</p>
                  </div>
                  <span className="material-symbols-outlined text-[#434843]">account_balance_wallet</span>
                </label>

                {/* Stripe Selection */}
                <label 
                  onClick={() => setMethod("stripe")}
                  className={`group flex items-center p-6 bg-[#f9faf7] border rounded-xl cursor-pointer transition-all active:scale-[0.99] ${
                    method === "stripe" ? "border-[#4a6549] bg-[#f3f4f1]" : "border-[#c3c8c1]/30"
                  }`}
                >
                  <input 
                    type="radio" name="payment" value="stripe" 
                    checked={method === "stripe"} onChange={() => setMethod("stripe")}
                    className="w-5 h-5 text-[#4a6549] border-[#c3c8c1] focus:ring-[#4a6549]"
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-lg font-medium text-[#191c1b]">International Credit / Debit Card</p>
                    <p className="text-xs text-[#434843]">Secure Stripe checkout for all major global networks</p>
                  </div>
                  <span className="material-symbols-outlined text-[#434843]">credit_card</span>
                </label>

                {/* Cash On Delivery Choice */}
                <label 
                  onClick={() => setMethod("cod")}
                  className={`group flex items-center p-6 bg-[#f9faf7] border rounded-xl cursor-pointer transition-all active:scale-[0.99] ${
                    method === "cod" ? "border-[#4a6549] bg-[#f3f4f1]" : "border-[#c3c8c1]/30"
                  }`}
                >
                  <input 
                    type="radio" name="payment" value="cod" 
                    checked={method === "cod"} onChange={() => setMethod("cod")}
                    className="w-5 h-5 text-[#4a6549] border-[#c3c8c1] focus:ring-[#4a6549]"
                  />
                  <div className="ml-4 flex-1">
                    <p className="text-lg font-medium text-[#191c1b]">Cash On Delivery (COD)</p>
                    <p className="text-xs text-[#434843]">Pay with cash or digital scanner at the time of botanical delivery</p>
                  </div>
                  <span className="material-symbols-outlined text-[#434843]">account_balance</span>
                </label>

              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#edeeeb] border border-[#c3c8c1]/20 rounded-xl p-8">
                <h3 className="font-serif text-xl text-[#061b0e] mb-6">Order Summary</h3>
                
                {/* Scrollable Items View */}
                <div className="space-y-4 mb-8 max-h-[240px] overflow-y-auto pr-1">
                  {Object.keys(cartItems).map((itemId, index) => {
                    const product = products.find((p) => p._id === itemId);
                    if (!product || cartItems[itemId] <= 0) return null;

                    return (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#e2e3e0]">
                          <img className="w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#191c1b] truncate">{product.name}</p>
                          <p className="text-xs text-[#434843]">Qty: {cartItems[itemId]} • Botanical Stock</p>
                          <p className="text-xs font-semibold text-[#061b0e] mt-1">{currency}{product.price * cartItems[itemId]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Calculations Breakdown */}
                <div className="space-y-3 border-t border-[#c3c8c1]/20 pt-6 mb-8">
                  <div className="flex justify-between text-sm text-[#434843]">
                    <span>Subtotal</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#434843]">
                    <span>Shipping (Freight)</span>
                    <span>{currency}{(delivery_fee || 150).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#434843]">
                    <span>GST (18%)</span>
                    <span>{currency}{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-lg text-[#061b0e] pt-3 border-t border-[#c3c8c1]/10">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Dynamic Submit Trigger */}
                <button 
        
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#061b0e] text-white py-4 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#061b0e]/90 transition-all active:scale-95 shadow-lg shadow-[#061b0e]/10"
                >
                  Place Order & Pay 
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <p className="text-center text-xs text-[#434843] mt-4">
                  By placing your order, you agree to our Terms of Sale and Privacy Policy.
                </p>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f3f4f1] p-4 rounded-xl flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[#4a6549] mb-2">verified</span>
                  <span className="text-xs font-semibold">Nursery Guarantee</span>
                </div>
                <div className="bg-[#f3f4f1] p-4 rounded-xl flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[#4a6549] mb-2">schedule</span>
                  <span className="text-xs font-semibold">Open 24 Hours</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer Ecosystem */}
      <footer className="bg-[#f3f4f1] border-t border-[#c3c8c1]/30 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 sm:px-12 py-20 max-w-7xl mx-auto">
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-medium text-[#061b0e] tracking-tight">Chauhan Traders & Nursery</h2>
            <p className="text-sm text-[#434843] leading-relaxed">Nurturing growth since 1985. We provide the finest botanical stock and landscaping solutions across the region.</p>
            <div className="flex items-center gap-2 text-[#4a6549] text-sm font-semibold">
              <span className="material-symbols-outlined">schedule</span> Open 24 Hours
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#061b0e] uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Our Story</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Wholesale Inquiry</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#061b0e] uppercase tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Shipping & Returns</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Care Tips</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">FAQs</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#061b0e] uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-12 py-8 border-t border-[#c3c8c1]/10 text-center">
          <p className="text-xs text-[#4a6549]">© 2026 Chauhan Traders & Nursery. Nurturing growth since 1985. Open 24 Hours.</p>
        </div>
      </footer>
    </div>
  );
};

export default Payment;