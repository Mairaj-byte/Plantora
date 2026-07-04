import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { 
  Lock, 
  ArrowRight, 
//   Eco, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MapPin, 
  Phone 
} from "lucide-react"; // Using lucide-react to match your Cart design icons

const Shipping = () => {
  const {
    products,
    currency,
    cartItems,
    navigate
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: ""
  });

  // Synthesize Context items into local cart view data
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass the filled form data as router state while navigating
    navigate("/payment", { state: { addressData: formData } });
  };

  
  // Pricing Calculations
  const subtotal = cartData.reduce((acc, item) => {
    const product = products.find((p) => p._id === item._id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const shippingFee = deliveryMethod === "delivery" ? 150 : 0;
  const tax = subtotal * 0.048; // ~4.8% Estimated Tax matching target blueprint ratios
  const total = subtotal + shippingFee + tax;

  return (
    <div className="bg-[#f9faf7] text-[#191c1b] min-h-screen antialiased selection:bg-[#ccebc7]">
      {/* TopNavBar (Checkout Specific View) */}
      <header className="bg-[#f9faf7]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#c3c8c1]/20 h-20 flex items-center">
        <div className="flex justify-between items-center w-full px-4 sm:px-12 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate("/")} 
            className="text-xl sm:text-2xl font-serif font-medium text-[#061b0e] tracking-tight bg-transparent border-none cursor-pointer"
          >
            Chauhan Traders & Nursery
          </button>
          <div className="flex items-center gap-2 text-[#434843]">
            <Lock className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium tracking-wide">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form and Checkout Progress */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Progress Stepper */}
            <nav className="flex items-center gap-6 sm:gap-8 border-b border-[#c3c8c1]/30 pb-4 mb-8">
              <div className="flex items-center gap-2 pb-4 border-b-2 border-[#061b0e] text-[#061b0e]">
                <span className="w-7 h-7 rounded-full bg-[#061b0e] text-white flex items-center justify-center text-xs font-semibold">1</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Shipping</span>
              </div>
              <div className="flex items-center gap-2 pb-4 text-[#434843]/50">
                <span className="w-7 h-7 rounded-full bg-[#e2e3e0] flex items-center justify-center text-xs font-semibold">2</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Payment</span>
              </div>
              <div className="flex items-center gap-2 pb-4 text-[#434843]/50">
                <span className="w-7 h-7 rounded-full bg-[#e2e3e0] flex items-center justify-center text-xs font-semibold">3</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Review</span>
              </div>
            </nav>

            {/* Form Section */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#061b0e]">Shipping Address</h1>
                <p className="text-[#434843] text-sm italic">Fields marked with * are required</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="firstName">First Name *</label>
                    <input 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                      id="firstName" name="firstName" required type="text" placeholder="Enter your first name"
                      value={formData.firstName} onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="lastName">Last Name *</label>
                    <input 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                      id="lastName" name="lastName" required type="text" placeholder="Enter your last name"
                      value={formData.lastName} onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="address">Street Address *</label>
                  <input 
                    className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                    id="address" name="address" required type="text" placeholder="House number and street name"
                    value={formData.address} onChange={handleInputChange}
                  />
                </div>

                {/* Optional Suite Line */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="apartment">Apartment, suite, unit (optional)</label>
                  <input 
                    className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                    id="apartment" name="apartment" type="text" placeholder="Apt 4B, Building C"
                    value={formData.apartment} onChange={handleInputChange}
                  />
                </div>

                {/* Regional/Location Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="city">Town / City *</label>
                    <input 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                      id="city" name="city" required type="text" placeholder="City"
                      value={formData.city} onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="state">State *</label>
                    <select 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm text-neutral-700"
                      id="state" name="state" required value={formData.state} onChange={handleInputChange}
                    >
                      <option value="" disabled>Select State</option>
                      <option value="DL">Delhi</option>
                      <option value="HR">Haryana</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="PB">Punjab</option>
                      <option value="UK">Uttarakhand</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="zip">PIN Code *</label>
                    <input 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                      id="zip" name="zip" required type="text" placeholder="6 digits"
                      value={formData.zip} onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Contact Data Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="phone">Phone Number *</label>
                    <input 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                      id="phone" name="phone" required type="tel" placeholder="+91"
                      value={formData.phone} onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#434843] tracking-wide" htmlFor="email">Email Address *</label>
                    <input 
                      className="bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-lg p-3 focus:outline-none focus:border-[#4a6549] focus:ring-2 focus:ring-[#4a6549]/10 transition-all text-sm"
                      id="email" name="email" required type="email" placeholder="example@email.com"
                      value={formData.email} onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Delivery Method Selection Block */}
                <div className="mt-10 p-6 bg-[#ccebc7]/20 rounded-xl border border-[#ccebc7]/50">
                  <h3 className="font-serif text-lg text-[#4a6549] mb-4">Delivery Method</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer p-4 rounded-lg bg-white hover:bg-[#f3f4f1] transition-colors border border-transparent hover:border-[#c3c8c1]/20">
                      <input 
                        className="text-[#4a6549] focus:ring-[#4a6549] h-4 w-4" 
                        type="radio" name="delivery" value="delivery"
                        checked={deliveryMethod === "delivery"}
                        onChange={() => setDeliveryMethod("delivery")}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-semibold text-[#191c1b]">
                          <span>Nursery Delivery (Organic Handling)</span>
                          <span className="text-[#4a6549]">{currency}150.00</span>
                        </div>
                        <p className="text-xs text-[#434843] mt-0.5">Arrives in 2-3 business days. Specialized handling for delicate plants.</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer p-4 rounded-lg bg-white hover:bg-[#f3f4f1] transition-colors border border-transparent hover:border-[#c3c8c1]/20">
                      <input 
                        className="text-[#4a6549] focus:ring-[#4a6549] h-4 w-4" 
                        type="radio" name="delivery" value="pickup"
                        checked={deliveryMethod === "pickup"}
                        onChange={() => setDeliveryMethod("pickup")}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-semibold text-[#191c1b]">
                          <span>In-Nursery Pickup</span>
                          <span className="text-[#4a6549]">FREE</span>
                        </div>
                        <p className="text-xs text-[#434843] mt-0.5">Ready within 4 hours. Visit our nursery at any time (Open 24 Hours).</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Navigation Submit Button */}
                <div className="pt-8">
                  <button 
                    className="w-full md:w-auto px-12 py-4 bg-[#061b0e] text-white text-sm font-semibold rounded-lg hover:-translate-y-0.5 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 group"
                    type="submit"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Right Column: Dynamic Order Summary Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[#f3f4f1] rounded-xl p-6 sm:p-8 border border-[#c3c8c1]/20 shadow-xs relative overflow-hidden">
              
              {/* Subtle Botanical Watermark Accent */}
              <div className="absolute top-0 right-0 opacity-5 pointer-events-none -translate-y-6 translate-x-6 text-[#4a6549]">
                {/* <Eco className="w-32 h-32" /> */}
              </div>

              <h2 className="font-serif text-xl text-[#061b0e] mb-8 relative">Order Summary</h2>

              {/* Dynamic Scrollable Item Summary List */}
              <div className="space-y-6 mb-8 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                {cartData.map((item, index) => {
                  const product = products.find((p) => p._id === item._id);
                  if (!product) return null;

                  return (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-neutral-200/50">
                        <img 
                          className="w-full h-full object-cover" 
                          src={product.image[0]} 
                          alt={product.name} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#191c1b] truncate">{product.name}</h4>
                        <p className="text-[11px] text-[#434843] mt-0.5">Premium Selection Grade</p>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-xs text-[#434843]">Qty: {item.quantity}</span>
                          <span className="text-sm font-semibold text-[#4a6549]">{currency}{(product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {cartData.length === 0 && (
                  <p className="text-xs text-neutral-400 text-center py-4">No items chosen for summary.</p>
                )}
              </div>

              {/* Totals Section */}
              <div className="border-t border-[#c3c8c1]/30 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-[#434843]">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-800">{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#434843]">
                  <span>Shipping</span>
                  <span className="font-medium text-neutral-800">
                    {shippingFee > 0 ? `${currency}${shippingFee.toFixed(2)}` : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#434843]">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-neutral-800">{currency}{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-[#c3c8c1]/30">
                  <span className="font-serif text-lg text-[#061b0e]">Total</span>
                  <span className="text-2xl font-semibold text-[#061b0e] tracking-tight">
                    {currency}{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Coupon / Promo Entry Input Row */}
              <div className="mt-8 flex gap-2">
                <input 
                  className="flex-1 bg-white border border-[#c3c8c1]/40 rounded-lg p-3 text-xs focus:outline-none focus:border-[#4a6549] focus:ring-1 focus:ring-[#4a6549]/10 text-[#191c1b]" 
                  placeholder="Promo Code" type="text"
                  value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="px-4 py-2 border border-[#4a6549] text-[#4a6549] text-xs font-semibold rounded-lg hover:bg-[#4a6549]/5 transition-colors whitespace-nowrap">
                  Apply
                </button>
              </div>

              {/* Security Metrics Badges */}
              <div className="mt-8 flex items-center justify-center gap-6 text-[#434843]/60 border-t border-[#c3c8c1]/20 pt-6">
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                  <span className="text-[9px] uppercase font-bold tracking-widest mt-1.5">Secure</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-5 h-5 stroke-[1.5]" />
                  <span className="text-[9px] uppercase font-bold tracking-widest mt-1.5">Insured</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="w-5 h-5 stroke-[1.5]" />
                  <span className="text-[9px] uppercase font-bold tracking-widest mt-1.5">7-Day Return</span>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </main>

      {/* Footer Block */}
      <footer className="bg-[#f3f4f1] border-t border-[#c3c8c1]/30 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-12 py-16 max-w-7xl mx-auto">
          <div className="md:col-span-1">
            <h3 className="font-serif text-lg font-medium text-[#061b0e] tracking-tight">Chauhan Traders & Nursery</h3>
            <p className="mt-4 text-sm text-[#434843] leading-relaxed">Nurturing growth since 1985. Open 24 Hours.</p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-[#ccebc7] text-[#07200b] rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4a6549] animate-pulse"></span>
              24/7 Support Available
            </div>
          </div>
          <div>
            <h5 className="text-xs font-semibold text-[#4a6549] mb-6 uppercase tracking-widest">Customer Service</h5>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#privacy">Privacy Policy</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#terms">Terms of Service</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#shipping">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-semibold text-[#4a6549] mb-6 uppercase tracking-widest">Business</h5>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#wholesale">Wholesale Inquiry</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#landscaping">Landscaping Services</a></li>
              <li><a className="text-[#434843] hover:text-[#061b0e] transition-colors" href="#bulk">Bulk Orders</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-semibold text-[#4a6549] mb-6 uppercase tracking-widest">Contact</h5>
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4a6549] flex-shrink-0 mt-0.5" />
                <span className="text-[#434843]">Main Nursery Road, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4a6549] flex-shrink-0" />
                <span className="text-[#434843]">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#c3c8c1]/10 py-8 px-4 sm:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#434843]/70">© 2026 Chauhan Traders & Nursery. All rights reserved.</p>
          <div className="flex gap-4 opacity-40 items-center">
            <span className="text-xs font-semibold tracking-wider text-neutral-600">VISA</span>
            <span className="text-xs font-semibold tracking-wider text-neutral-600">MASTERCARD</span>
            <span className="text-xs font-semibold tracking-wider text-neutral-600">UPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shipping;