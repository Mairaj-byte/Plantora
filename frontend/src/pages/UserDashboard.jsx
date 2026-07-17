import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { 
  Leaf, 
  MapPin, 
  CreditCard, 
  BriefcaseBusiness, 
  PhoneCall, 
  Truck, 
  Sparkles, 
  Heart, 
  MoreVertical 
} from 'lucide-react';

const UserDashboard = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [greeting, setGreeting] = useState("Hello");
  const [userData, setUserData] = useState({
    name: "Rohan Sharma",
    profilePic: "" 
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchDashboardData = async () => {
    try {
      if (!token) return;

      const orderResponse = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (orderResponse.data.success) {
        let allOrdersItem = [];
        orderResponse.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }

      const userResponse = await axios.get(
        `${backendUrl}/api/user/getuserdata`,
        { headers: { token } }
      );

      if (userResponse.data.success) {
        const user = userResponse.data.user;
        setUserData({
          name: user.name || "Rohan Sharma",
          profilePic: user.image || user.profilePic || ""
        });
      }

    } catch (error) {
      console.log("Error loading dashboard data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }

    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 18) timeGreeting = "Good Afternoon";
    else timeGreeting = "Good Evening";

    setGreeting(timeGreeting);
  }, [token]);

  return (
    <div className="text-gray-900 font-sans min-h-screen bg-[#f9faf7] antialiased">
      <main className="pt-10 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#ccebc7] border-2 border-[#4a6549]/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                {userData.profilePic ? (
                  <img
                    src={userData.profilePic}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-serif font-bold text-[#061b0e]">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-serif text-[#061b0e] font-medium tracking-tight">
                  {greeting}, {userData.name}
                </h1>
                <p className="text-sm text-[#555b54] mt-0.5">
                  Welcome back to your garden sanctuary. Here is what's happening today.
                </p>
              </div>
            </div>

            <div className="bg-[#ccebc7]/60 text-[#07200b] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 self-start md:self-auto shadow-sm backdrop-blur-sm">
              <Leaf className="w-4 h-4 text-[#4a6549]" />
              Open 24 Hours For Your Garden Needs
            </div>
          </div>

          {/* Bento Grid Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
            <div className="bg-white p-6 rounded-2xl border border-[#c3c8c1]/30 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <Truck className="w-6 h-6 text-[#4a6549]" />
                <span className="text-xs bg-[#4a6549]/10 text-[#4a6549] px-2 py-0.5 rounded-full font-bold">
                  {orderData.filter(o => o.status !== "Delivered").length} Active
                </span>
              </div>
              <h3 className="text-xs text-[#737973] uppercase tracking-wider font-semibold">Garden Status</h3>
              <p className="text-xl font-serif text-[#061b0e] mt-1 font-medium">In Transit</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-[#c3c8c1]/30 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <Sparkles className="w-6 h-6 text-[#4a6549]" />
                <span className="text-xs bg-[#4a6549]/10 text-[#4a6549] px-2 py-0.5 rounded-full font-bold">+1200</span>
              </div>
              <h3 className="text-xs text-[#737973] uppercase tracking-wider font-semibold">Growth Points</h3>
              <p className="text-xl font-serif text-[#061b0e] mt-1 font-medium">Nurturer Tier</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-[#c3c8c1]/30 shadow-sm transition-all hover:shadow-md sm:col-span-2 md:col-span-1">
              <div className="flex justify-between items-start mb-4">
                <Heart className="w-6 h-6 text-[#4a6549]" />
                <span className="text-xs bg-[#4a6549]/10 text-[#4a6549] px-2 py-0.5 rounded-full font-bold">8 Items</span>
              </div>
              <h3 className="text-xs text-[#737973] uppercase tracking-wider font-semibold">Wishlist</h3>
              <p className="text-xl font-serif text-[#061b0e] mt-1 font-medium">Saved Greenery</p>
            </div>
          </div>
        </section>

        {/* Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Dashboard Feed */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Recent Orders */}
            <section>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-serif font-medium text-[#061b0e]">Recent Orders</h2>
                <button className="text-xs text-[#4a6549] font-semibold hover:underline">View All Orders</button>
              </div>

              <div className="space-y-4">
                {orderData.length === 0 ? (
                  <div className="bg-white border border-dashed border-[#c3c8c1] rounded-2xl p-8 text-center text-gray-500 text-sm">
                    No orders found.
                  </div>
                ) : (
                  orderData.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-5 border border-[#c3c8c1]/20 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="w-20 h-20 bg-[#e7e8e6] rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image?.[0] || "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=200&auto=format&fit=crop"}
                        />
                      </div>
                      
                      <div className="flex-grow text-center sm:text-left w-full">
                        <p className="text-xs text-[#737973] mb-1">
                          Ordered on {new Date(item.date).toDateString()}
                        </p>
                        <h4 className="font-serif text-[#061b0e] font-medium">{item.name}</h4>
                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-1 text-xs text-[#434843]">
                          <p className="font-semibold text-[#061b0e]">{currency}{item.price}</p>
                          <p>•</p>
                          <p>Qty: {item.quantity}</p>
                          <p>•</p>
                          <p className="text-gray-400">({item.paymentMethod})</p>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5">
                          <span className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-[#737973]' : 'bg-[#4a6549] animate-pulse'}`}></span>
                          <span className={`text-xs font-medium ${item.status === 'Delivered' ? 'text-[#737973]' : 'text-[#4a6549]'}`}>{item.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex sm:flex-col md:flex-row items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={fetchDashboardData}
                          className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#061b0e] text-white text-xs font-semibold hover:bg-[#122e1c] transition-colors whitespace-nowrap shadow-sm"
                        >
                          Track Order
                        </button>
                        <button className="p-2 rounded-full border border-[#c3c8c1]/60 hover:bg-[#f3f4f1] text-gray-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* My Greenery */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <h2 className="text-xl font-serif font-medium text-[#061b0e]">My Greenery</h2>
                <div className="flex gap-2">
                  <span className="bg-[#ffdbcc] text-[#2c160b] px-3 py-1 rounded-full text-xs font-medium">Indoor Favorites</span>
                  <span className="bg-[#e7e8e6] text-[#434843] px-3 py-1 rounded-full text-xs font-medium">Outdoor Hardy</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Monstera Deliciosa", desc: "Lush Green • Low Light", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC46mvbR55bF3vBa8eXAIWE5Q89cQJWae02fQ8Y90-roaSxphJievTZJE1TvMH-Av0AEGfe3LsrTLYCf7XCiLSzcLuU49rznvoB3FUb_J8Rje8QWWHKwbVLrbRGQ-phqvgFoWBjLbHC82WcfOQ9RRGGXRvXHPy6wDP20CuSorqEVNJzZg3_vmHB4UCoyBsoiDbsLfkduwO2NYaUFolQUrBzMiTjIUin8cnGYSxCW_UGGWgOXvUc7mA4QXA9VvdseLNC5ZReD9Dhnqt" },
                  { name: "Snake Plant Zeylanica", desc: "Hardy • Air Purifying", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa04pEtG4tQ3fo5leYxaf9tcQYvwbtKU29_0x3X-kcQ5my_zhKi0iNDJJhfzyuyKyS2a5Xmm_xv9bkidrtXtqom_Y-eRmGfDNIyz9qF8_Crzf3ssyjU8zLb6YIM6nA-DEPwo_p45HGBqG_lZGvVciRQy-7r6LlWM49wdWp-R8jwC2Obb4LRUr4fpUhs1B8qdamQnTJDf8GlsXzNk-zha4PJFCfHCStvlDDvMnKTc7HGqIMHg0NnA0fwEi8-MGIbXENnO0dBsfh8itF" },
                  { name: "Miniature Olive Tree", desc: "Mediterranean • Bright", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBi58z7csAjHYpuSuu2sZE7vu8n8DaL_8fd-8xIHxJA2APiJHIauE24O4T-2SgAj9-qjlQHm2kPsmWF79txGEWaZ7AP54GW4ijqLYbuQXPm3JSAnn8-jHm67RN6e-hZ7ZfWCfbfctslmuoIbJZTdvkajWSor_DyBZcyDTGEwbxC0sELDVzAgdluEMKOJzGQsYh9f1Z2-YZvk5BMOajILL0UA1QFs2vpf7_kiPbs8enIADCk7Aw--lkjrpBYsVBACUOMQj7CeyEs0fN" }
                ].map((plant, idx) => (
                  <div key={idx} className="group cursor-pointer bg-white p-3 rounded-2xl border border-[#c3c8c1]/20 shadow-sm">
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#f3f4f1] mb-3 relative">
                      <img alt={plant.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={plant.img} />
                      <button className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-transform">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </button>
                    </div>
                    <h5 className="font-serif text-[#061b0e] font-medium text-base truncate">{plant.name}</h5>
                    <p className="text-xs text-[#737973] mt-0.5">{plant.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            
            {/* Account Hub Menu Card */}
            <div className="bg-[#f0f1ee] p-6 rounded-2xl space-y-3.5 border border-[#c3c8c1]/30">
              <h2 className="text-lg font-serif font-medium text-[#061b0e] mb-1">Account Hub</h2>
              
              <a className="flex items-center gap-3.5 p-3 rounded-xl bg-white hover:bg-[#ccebc7]/50 transition-all border border-transparent hover:border-[#4a6549]/20 group shadow-sm" href="#">
                <div className="p-2 rounded-lg bg-[#f0f1ee] text-[#4a6549] group-hover:bg-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#061b0e]">Shipping Addresses</span>
                  <span className="text-[11px] text-[#737973]">2 locations saved</span>
                </div>
              </a>
              
              <a className="flex items-center gap-3.5 p-3 rounded-xl bg-white hover:bg-[#ccebc7]/50 transition-all border border-transparent hover:border-[#4a6549]/20 group shadow-sm" href="#">
                <div className="p-2 rounded-lg bg-[#f0f1ee] text-[#4a6549] group-hover:bg-white transition-colors">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#061b0e]">Payment Methods</span>
                  <span className="text-[11px] text-[#737973]">Visa ending in 4242</span>
                </div>
              </a>
              
              <a className="flex items-center gap-3.5 p-3 rounded-xl bg-[#3e261a] hover:bg-[#4d3021] text-[#ffdbcc] transition-all shadow-sm" href="#">
                <div className="p-2 rounded-lg bg-white/10 text-[#e6bead]">
                  <BriefcaseBusiness className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold">Wholesale Profile</span>
                  <span className="text-[11px] opacity-80">Exclusive B2B pricing</span>
                </div>
              </a>
            </div>

            {/* Guide Promo Banner */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md group">
              <img alt="Care Tips" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTaq-VBdueoj2TAVjUb_8uWY5GF1JZXCWjge15q8OFh7TJ_ndLcpibsPgvQ1t91VePWn9LEIBOtGkL3SQOT003rM9QB_YpIQbCPiX5YL2Lf5y4f-RbYNDrwQGB0P8WijovuuB82qSFReAgJiboxVAGXmOkoTV5_v_meJ894TCLPJ6cjZle48e2MutO9NDOjw3NED9TD0xLiRzBVimCx1za2i2eB6u2nJiGLn9wlmcLgLbo3tecqfbxG4gks6ozQbnYiAd0Hi8drd3k" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061b0e]/95 via-[#061b0e]/40 to-transparent flex flex-col justify-end p-5">
                <span className="text-[#ffdbcc] text-[10px] tracking-widest font-bold uppercase mb-1">Nurturer's Guide</span>
                <h3 className="font-serif text-white text-xl leading-snug mb-4">Winter Care Tips for your Indoor Jungle</h3>
                <button className="bg-[#ccebc7] text-[#07200b] py-2.5 rounded-full text-xs font-bold hover:bg-white transition-colors shadow-sm">Read Full Guide</button>
              </div>
            </div>

            {/* Micro Support Banner */}
            <div className="border border-[#c3c8c1]/50 p-5 rounded-2xl bg-white shadow-sm text-center lg:text-left">
              <h4 className="text-xs font-bold text-[#061b0e] uppercase tracking-wider mb-1">Need Expert Advice?</h4>
              <p className="text-xs text-[#555b54] mb-4 leading-relaxed">Our botanists are available 24/7 for urgent plant care consultations.</p>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#061b0e] text-[#061b0e] hover:bg-[#061b0e] hover:text-white transition-all text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                Call Our Experts Now
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;