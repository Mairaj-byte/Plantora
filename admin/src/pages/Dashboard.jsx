import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b]">
      
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 bg-[#f9faf7]/80 backdrop-blur-md px-12 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-['EB_Garamond'] font-medium text-[#061b0e]">Overview</h1>
          <p className="text-sm text-[#434843]">Welcome back to the Nursery Hub.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#434843]">search</span>
            <input 
              className="bg-[#f3f4f1] border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#4a6549]/20 w-64 outline-none" 
              placeholder="Search data..." 
              type="text"
            />
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e2e3e0] text-[#434843] relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
          <div className="h-8 w-[1px] bg-[#c3c8c1]/30 mx-2"></div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#ccebc7] text-[#07200b] rounded-full">
            <span className="material-symbols-outlined text-[18px]">access_time</span>
            <span className="text-xs font-bold">OPEN 24H</span>
          </div>
        </div>
      </header>

      {/* Primary Dashboard Content Canvas */}
      <div className="px-12 pb-20">
        
        {/* Bento Grid Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 pt-8">
          
          {/* Total Sales */}
          <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#ccebc7]/30 flex items-center justify-center text-[#4a6549]">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="text-[#4a6549] font-bold text-xs">+12.5% ↑</span>
            </div>
            <div>
              <p className="text-[#434843] text-sm font-semibold tracking-wide mb-1">Total Sales</p>
              <h3 className="text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">₹4,28,500</h3>
            </div>
          </div>

          {/* Active Wholesale Orders */}
          <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#d0e9d4]/30 flex items-center justify-center text-[#061b0e]">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <span className="text-[#061b0e] font-bold text-xs">8 Pending</span>
            </div>
            <div>
              <p className="text-[#434843] text-sm font-semibold tracking-wide mb-1">Wholesale Orders</p>
              <h3 className="text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">34 Active</h3>
            </div>
          </div>

          {/* New Inquiries */}
          <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#ffdbcc]/30 flex items-center justify-center text-[#5c4033]">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">URGENT</span>
            </div>
            <div>
              <p className="text-[#434843] text-sm font-semibold tracking-wide mb-1">New Inquiries</p>
              <h3 className="text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">12 Today</h3>
            </div>
          </div>

          {/* Published Articles */}
          <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#e2e3e0] flex items-center justify-center text-[#434843]">
                <span className="material-symbols-outlined">description</span>
              </div>
            </div>
            <div>
              <p className="text-[#434843] text-sm font-semibold tracking-wide mb-1">Published Blog</p>
              <h3 className="text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">156 Articles</h3>
            </div>
          </div>

        </div>

        {/* Asymmetric Split Layout: Recent Orders & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Orders Table Component (Col-Span 2) */}
          <div className="lg:col-span-2 bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] rounded-xl overflow-hidden border border-[#c3c8c1]/10">
            <div className="p-6 border-b border-[#c3c8c1]/20 flex justify-between items-center bg-white/50">
              <h4 className="text-xl font-['EB_Garamond'] font-medium text-[#061b0e]">Recent Orders</h4>
              <button className="text-sm font-medium text-[#4a6549] hover:underline transition-all">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table class="w-full text-left">
                <thead className="bg-[#f3f4f1] text-[#434843] text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Client / Order ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3c8c1]/10">
                  <tr className="hover:bg-[#f3f4f1]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm text-[#191c1b]">Green Valley Resort</div>
                      <div className="text-xs text-[#434843]">#ORD-2024-0891</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-[#ccebc7] text-[#506b4f] text-xs font-bold">Shipped</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#434843]">Landscaping</td>
                    <td className="px-6 py-4 text-right font-semibold text-[#061b0e]">₹84,200</td>
                  </tr>
                  <tr className="hover:bg-[#f3f4f1]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm text-[#191c1b]">Urban Terraces</div>
                      <div className="text-xs text-[#434843]">#ORD-2024-0892</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-[#d0e9d4] text-[#0b2013] text-xs font-bold">Processing</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#434843]">Indoor Plants</td>
                    <td className="px-6 py-4 text-right font-semibold text-[#061b0e]">₹12,450</td>
                  </tr>
                  <tr className="hover:bg-[#f3f4f1]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm text-[#191c1b]">Metropark Authority</div>
                      <div className="text-xs text-[#434843]">#ORD-2024-0893</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-[#e2e3e0] text-[#434843] text-xs font-bold">Invoiced</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#434843]">Bulk Saplings</td>
                    <td className="px-6 py-4 text-right font-semibold text-[#061b0e]">₹2,10,000</td>
                  </tr>
                  <tr className="hover:bg-[#f3f4f1]/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm text-[#191c1b]">Sun-Drenched Villas</div>
                      <div className="text-xs text-[#434843]">#ORD-2024-0894</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">Canceled</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#434843]">Ornamental</td>
                    <td className="px-6 py-4 text-right font-semibold text-[#061b0e]">₹5,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Trends Mini-Chart (Col-Span 1) */}
          <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] rounded-xl p-6 border border-[#c3c8c1]/10 flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-['EB_Garamond'] font-medium text-[#061b0e]">Inquiry Trends</h4>
              <p className="text-xs text-[#434843]">Weekly wholesale volume</p>
            </div>
            
            {/* Native Tailwind Visual Chart Grid */}
            <div className="flex-grow flex items-end justify-between gap-2 h-48 pb-2">
              {[
                { label: 'Mon', height: 'h-[40%]' },
                { label: 'Tue', height: 'h-[65%]' },
                { label: 'Wed', height: 'h-[90%]' },
                { label: 'Thu', height: 'h-[50%]' },
                { label: 'Fri', height: 'h-[75%]' },
                { label: 'Sat', height: 'h-[30%]' },
              ].map((bar, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-full bg-[#d0e9d4]/40 rounded-t-lg ${bar.height} transition-all duration-300 hover:bg-[#4a6549]`}></div>
                  <span className="text-[10px] text-[#434843]">{bar.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4a6549]"></span>
                  <span className="text-sm text-[#191c1b]">Conversion Rate</span>
                </div>
                <span className="font-bold text-[#061b0e]">68%</span>
              </div>
              <div className="p-4 bg-[#f3f4f1] rounded-xl">
                <p className="text-xs text-[#434843] italic">"Bulk palm inquiries are up 20% since the 'Urban Jungle' blog post."</p>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Banner Hero Component */}
        <div className="mt-6 relative rounded-2xl overflow-hidden h-64 flex items-center p-10 shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] group">
          <div className="absolute inset-0 bg-[#061b0e]/40 z-10 transition-colors duration-300 group-hover:bg-[#061b0e]/30"></div>
          <img 
            alt="Botanical Heritage" 
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" 
            src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1200" 
          />
          <div className="relative z-20 max-w-lg">
            <span className="text-[#ccebc7] text-xs font-bold uppercase tracking-widest mb-2 block">Nursery Operations</span>
            <h2 className="text-4xl font-['EB_Garamond'] font-semibold text-white mb-4 leading-tight">Managing Legacy Growth</h2>
            <button className="bg-white text-[#061b0e] px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#ccebc7] transition-colors duration-200">
              Run Heritage Report
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </button>
          </div>
        </div>

      </div>

      {/* Page Footer Component */}
      <footer className="bg-[#e7e8e6] border-t border-[#c3c8c1]/30 py-8 px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="text-lg font-['EB_Garamond'] font-medium text-[#061b0e]">Chauhan Traders & Nursery</span>
            <span className="text-sm text-[#434843] border-l border-[#c3c8c1]/30 pl-6 hidden md:inline">© 2026 Nurturing Growth Since 2016.</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a className="text-[#434843] hover:text-[#4a6549] transition-colors" href="#privacy">Privacy Policy</a>
            <a className="text-[#434843] hover:text-[#4a6549] transition-colors" href="#shipping">Shipping Info</a>
            <a className="text-[#434843] hover:text-[#4a6549] transition-colors" href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Mobile Quick Trigger */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#061b0e] text-white rounded-full shadow-xl flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-all">
        <span className="material-symbols-outlined">add</span>
      </button>

    </div>
  );
};

export default Dashboard;