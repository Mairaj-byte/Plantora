import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const UserDashboard = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [greeting, setGreeting] = useState("Hello");
  const [userData, setUserData] = useState({
    name: "Rohan Sharma",
    profilePic: "" // Holds the URL string for the user profile picture
  });


  const backendUrl = "http://localhost:4000"; // Replace with your actual backend URL

  // Fetch both order history and user details
  const fetchDashboardData = async () => {
    try {
      if (!token) return;

      // 1. Load Orders Data
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

      // 2. Load User Profile Data (Adjust API endpoint path as needed for your backend setup)
      const userResponse = await axios.get(
        backendUrl + "/api/user/getuserdata", 
        { headers: { token } }
      );
      
      if (userResponse.data.success) {
        setUserData({
          name: userResponse.data.user.name || "Rohan Sharma",
          profilePic: userResponse.data.user.profilePic || ""
        });
      }

    } catch (error) {
      console.log("Error loading dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Time of day greeting dynamic updater logic
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 18) timeGreeting = "Good Afternoon";
    else timeGreeting = "Good Evening";
    
    setGreeting(timeGreeting);
  }, [token]);

  return (
    <div className="text-gray-900 font-sans min-h-screen bg-[#f9faf7]">
      {/* Top Navigation Bar */}
      
      {/* Main Container */}
      <main className="pt-4 pb-2 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Header: Welcome Greeting */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Profile Picture Display */}
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#ccebc7] border-2 border-[#4a6549]/20 flex items-center justify-center flex-shrink-0 shadow-sm">
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
                <h1 className="text-3xl md:text-4xl font-serif text-[#061b0e] mb-1">
                  {greeting}, {userData.name}
                </h1>
                <p className="text-sm md:text-base text-[#434843]">
                  Welcome back to your garden sanctuary. Here is what's happening today.
                </p>
              </div>
            </div>
            
            <div className="bg-[#ccebc7] text-[#07200b] px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 self-start md:self-auto">
              <span className="material-symbols-outlined text-[18px]">nest_eco_leaf</span>
              Open 24 Hours For Your Garden Needs
            </div>
          </div>

          {/* Bento Grid Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#f3f4f1] p-6 rounded-xl border border-[#c3c8c1]/20 hover:shadow-sm transition-all hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#4a6549] text-3xl">local_shipping</span>
                <span className="text-sm text-[#4a6549] font-bold">{orderData.filter(o => o.status !== "Delivered").length} Active</span>
              </div>
              <h3 className="text-xs text-[#737973] uppercase tracking-wider font-semibold">Garden Status</h3>
              <p className="text-xl md:text-2xl font-serif text-[#061b0e] mt-1">In Transit</p>
            </div>
            <div className="bg-[#f3f4f1] p-6 rounded-xl border border-[#c3c8c1]/20 hover:shadow-sm transition-all hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#4a6549] text-3xl">loyalty</span>
                <span className="text-sm text-[#4a6549] font-bold">+1200</span>
              </div>
              <h3 className="text-xs text-[#737973] uppercase tracking-wider font-semibold">Growth Points</h3>
              <p className="text-xl md:text-2xl font-serif text-[#061b0e] mt-1">Nurturer Tier</p>
            </div>
            <div className="bg-[#f3f4f1] p-6 rounded-xl border border-[#c3c8c1]/20 hover:shadow-sm transition-all hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#4a6549] text-3xl">favorite</span>
                <span className="text-sm text-[#4a6549] font-bold">8 Items</span>
              </div>
              <h3 className="text-xs text-[#737973] uppercase tracking-wider font-semibold">Wishlist</h3>
              <p className="text-xl md:text-2xl font-serif text-[#061b0e] mt-1">Saved Greenery</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content Columns */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Recent Orders Section Integration */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#061b0e]">Recent Orders</h2>
                <button className="text-sm text-[#4a6549] font-semibold hover:underline">View All Orders</button>
              </div>

              <div className="space-y-4">
                {orderData.length === 0 ? (
                  <p className="text-sm text-gray-500">No orders found.</p>
                ) : (
                  orderData.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-xl flex flex-col md:flex-row items-center gap-6 group hover:-translate-y-0.5 transition-all border border-[#c3c8c1]/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                    >
                      <div className="w-20 h-20 bg-[#e7e8e6] rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ac1_Py5RdN7rw-PSJ5QOiF0jVRZFq1imSeswUFDTnEpWTUFP_PHR_x8DXXI3g_Loeqg_GNfy5vfkoIiVlgfUDKjeruBX3m-foKu9_ktu_6JjsCDTVg8c858I3imwgN_7c0Z0aijJV1Ezm1JCJB1HNMLbX16RO7cDMiRkAonTcBMEj6-FUB8WRQh0agHmSOUdwVKaeLPUifysSL4leX-hOB2iYN7xI_c6v8UQbcIu_pK4ZV6hXXyrJgND2oigMCi-SSaJluTQcsaq"}
                        />
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <p className="text-xs text-[#737973] mb-1">
                          Ordered on {new Date(item.date).toDateString()}
                        </p>
                        <h4 className="text-lg font-serif text-[#061b0e]">{item.name}</h4>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-1 text-sm text-[#434843]">
                          <p className="font-medium text-[#061b0e]">{currency}{item.price}</p>
                          <p>Qty: {item.quantity}</p>
                          <p className="text-xs text-gray-400">({item.paymentMethod})</p>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                          <span className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-[#737973]' : 'bg-[#4a6549]'}`}></span>
                          <span className={`text-sm ${item.status === 'Delivered' ? 'text-[#737973]' : 'text-[#4a6549]'}`}>{item.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={fetchDashboardData}
                          className="px-5 py-2 rounded-full bg-[#061b0e] text-white text-sm font-semibold hover:bg-[#061b0e]/90 transition-colors"
                        >
                          Track Order
                        </button>
                        <button className="p-2 rounded-full border border-[#c3c8c1] hover:bg-[#f3f4f1] transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* My Greenery Static Grid Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#061b0e]">My Greenery</h2>
                <div className="flex gap-2">
                  <span className="bg-[#ffdbcc] text-[#2c160b] px-3 py-1 rounded-full text-xs">Indoor Favorites</span>
                  <span className="bg-[#e7e8e6] text-[#434843] px-3 py-1 rounded-full text-xs">Outdoor Hardy</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#f3f4f1] mb-3 relative">
                    <img alt="Monstera" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC46mvbR55bF3vBa8eXAIWE5Q89cQJWae02fQ8Y90-roaSxphJievTZJE1TvMH-Av0AEGfe3LsrTLYCf7XCiLSzcLuU49rznvoB3FUb_J8Rje8QWWHKwbVLrbRGQ-phqvgFoWBjLbHC82WcfOQ9RRGGXRvXHPy6wDP20CuSorqEVNJzZg3_vmHB4UCoyBsoiDbsLfkduwO2NYaUFolQUrBzMiTjIUin8cnGYSxCW_UGGWgOXvUc7mA4QXA9VvdseLNC5ZReD9Dhnqt"/>
                    <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md text-red-500 hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </button>
                  </div>
                  <h5 className="font-serif text-[#061b0e] text-lg">Monstera Deliciosa</h5>
                  <p className="text-xs text-[#737973]">Lush Green • Low Light</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#f3f4f1] mb-3 relative">
                    <img alt="Snake Plant" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa04pEtG4tQ3fo5leYxaf9tcQYvwbtKU29_0x3X-kcQ5my_zhKi0iNDJJhfzyuyKyS2a5Xmm_xv9bkidrtXtqom_Y-eRmGfDNIyz9qF8_Crzf3ssyjU8zLb6YIM6nA-DEPwo_p45HGBqG_lZGvVciRQy-7r6LlWM49wdWp-R8jwC2Obb4LRUr4fpUhs1B8qdamQnTJDf8GlsXzNk-zha4PJFCfHCStvlDDvMnKTc7HGqIMHg0NnA0fwEi8-MGIbXENnO0dBsfh8itF"/>
                    <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md text-red-500 hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </button>
                  </div>
                  <h5 className="font-serif text-[#061b0e] text-lg">Snake Plant Zeylanica</h5>
                  <p className="text-xs text-[#737973]">Hardy • Air Purifying</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#f3f4f1] mb-3 relative">
                    <img alt="Olive Tree" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBi58z7csAjHYpuSuu2sZE7vu8n8DaL_8fd-8xIHxJA2APiJHIauE24O4T-2SgAj9-qjlQHm2kPsmWF79txGEWaZ7AP54GW4ijqLYbuQXPm3JSAnn8-jHm67RN6e-hZ7ZfWCfbfctslmuoIbJZTdvkajWSor_DyBZcyDTGEwbxC0sELDVzAgdluEMKOJzGQsYh9f1Z2-YZvk5BMOajILL0UA1QFs2vpf7_kiPbs8enIADCk7Aw--lkjrpBYsVBACUOMQj7CeyEs0fN"/>
                    <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md text-[#737973] hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <h5 className="font-serif text-[#061b0e] text-lg">Miniature Olive Tree</h5>
                  <p className="text-xs text-[#737973]">Mediterranean • Bright Light</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Sidebar Column */}
          <aside className="space-y-8">
            <div className="bg-[#edeeeb] p-6 rounded-xl space-y-4">
              <h2 className="text-2xl font-serif text-[#061b0e] mb-2">Account Hub</h2>
              <a className="flex items-center gap-4 p-3 rounded-lg bg-white hover:bg-[#ccebc7] transition-colors group" href="#">
                <div className="p-2 rounded bg-[#e7e8e6] text-[#4a6549] group-hover:bg-white">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <span className="block text-sm text-[#061b0e] font-bold">Shipping Addresses</span>
                  <span className="text-xs text-[#737973]">2 locations saved</span>
                </div>
              </a>
              <a className="flex items-center gap-4 p-3 rounded-lg bg-white hover:bg-[#ccebc7] transition-colors group" href="#">
                <div className="p-2 rounded bg-[#e7e8e6] text-[#4a6549] group-hover:bg-white">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <span className="block text-sm text-[#061b0e] font-bold">Payment Methods</span>
                  <span className="text-xs text-[#737973]">Visa ending in 4242</span>
                </div>
              </a>
              <a className="flex items-center gap-4 p-3 rounded-lg bg-[#3e261a] text-[#ffdbcc] hover:opacity-90 transition-opacity" href="#">
                <div className="p-2 rounded bg-white/10 text-[#e6bead]">
                  <span className="material-symbols-outlined">business_center</span>
                </div>
                <div>
                  <span className="block text-sm font-bold">Wholesale Profile</span>
                  <span className="text-xs opacity-70">Exclusive B2B pricing</span>
                </div>
              </a>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-lg group">
              <img alt="Care Tips" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTaq-VBdueoj2TAVjUb_8uWY5GF1JZXCWjge15q8OFh7TJ_ndLcpibsPgvQ1t91VePWn9LEIBOtGkL3SQOT003rM9QB_YpIQbCPiX5YL2Lf5y4f-RbYNDrwQGB0P8WijovuuB82qSFReAgJiboxVAGXmOkoTV5_v_meJ894TCLPJ6cjZle48e2MutO9NDOjw3NED9TD0xLiRzBVimCx1za2i2eB6u2nJiGLn9wlmcLgLbo3tecqfbxG4gks6ozQbnYiAd0Hi8drd3k"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#061b0e]/90 via-[#061b0e]/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-[#ffdbcc] text-xs mb-2 font-bold uppercase tracking-widest">Nurturer's Guide</span>
                <h3 className="font-serif text-white text-2xl leading-tight mb-4">Winter Care Tips for your Indoor Jungle</h3>
                <button className="bg-[#ccebc7] text-[#07200b] w-full py-3 rounded-full text-sm font-bold hover:bg-white transition-colors">Read Full Guide</button>
              </div>
            </div>

            <div className="border border-[#c3c8c1]/30 p-6 rounded-xl bg-[#f9faf7]">
              <h4 className="text-sm text-[#061b0e] font-bold mb-2">Need Expert Advice?</h4>
              <p className="text-xs text-[#434843] mb-4">Our botanists are available 24/7 for urgent plant care consultations.</p>
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-[#061b0e] text-[#061b0e] hover:bg-[#061b0e] hover:text-white transition-all text-sm font-semibold">
                <span className="material-symbols-outlined">call</span>
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