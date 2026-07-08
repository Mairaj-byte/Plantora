import React from 'react';
import { 
  Truck, 
  Mail, 
  FileText, 
  Search, 
  Bell, 
  Clock, 
  ArrowUpRight,
  Inbox
} from 'lucide-react';

const Dashboard = () => {
  // Mock Data matching screenshots
  const metrics = [
    { 
      title: "Total Sales", 
      value: "₹4,28,500", 
      badge: "+12.5% ↑", 
      badgeType: "success",
      icon: <span className="text-lg">💵</span> 
    },
    { 
      title: "Wholesale Orders", 
      value: "34 Active", 
      badge: "8 Pending", 
      badgeType: "neutral",
      icon: <Truck className="w-4 h-4 text-[#4a6549]" /> 
    },
    { 
      title: "New Inquiries", 
      value: "12 Today", 
      badge: "URGENT", 
      badgeType: "error",
      icon: <Mail className="w-4 h-4 text-[#4a6549]" /> 
    },
    { 
      title: "Published Blog", 
      value: "156 Articles", 
      icon: <FileText className="w-4 h-4 text-[#4a6549]" /> 
    },
  ];

  const orders = [
    { id: "#ORD-2024-0891", client: "Green Valley Resort", status: "Shipped", category: "Landscaping", amount: "₹84,200", statusColor: "bg-[#ccebc7] text-[#506b4f]" },
    { id: "#ORD-2024-0892", client: "Urban Terraces", status: "Processing", category: "Indoor Plants", amount: "₹12,450", statusColor: "bg-[#f3f4f1] text-[#434843]" },
    { id: "#ORD-2024-0893", client: "Metropark Authority", status: "Invoiced", category: "Bulk Saplings", amount: "₹2,10,000", statusColor: "bg-gray-100 text-gray-700" },
    { id: "#ORD-2024-0894", client: "Sun-Drenched Villas", status: "Canceled", category: "Ornamental", amount: "₹5,200", statusColor: "bg-[#ffdad6] text-[#93000a]" },
  ];

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 h-full">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">Overview</h1>
              <p className="text-xs md:text-sm text-[#434843] mt-1">Welcome back to the Nursery Hub.</p>
            </div>

            {/* Header Controls (Matched to Enquiries panel style) */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#434843] w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search data..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all shadow-sm placeholder:text-[#434843]/60 text-[#191c1b]"
                />
              </div>
              
              <button className="p-2.5 bg-white border border-[#c3c8c1]/30 rounded-xl shadow-sm hover:bg-[#f3f4f1]/50 transition-all relative flex-shrink-0">
                <Bell className="w-4 h-4 text-[#434843]" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#93000a] rounded-full"></span>
              </button>

              <div className="flex items-center gap-1.5 bg-[#ccebc7]/40 text-[#506b4f] border border-[#c3c8c1]/20 px-3 py-2 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-sm flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>Open 24H</span>
              </div>
            </div>
          </div>

          {/* Bento Stats (Matched exactly to Enquiries Theme) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((item, index) => (
              <div key={index} className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-[#f3f4f1]/50 rounded-lg">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.badgeType === 'success' ? 'text-[#506b4f] bg-[#ccebc7]' :
                      item.badgeType === 'error' ? 'text-[#93000a] bg-[#ffdad6]':'text-[#434843] bg-[#f3f4f1]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-1">{item.title}</p>
                  <h3 className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{item.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Lower Content Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Orders List Card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 flex flex-col overflow-hidden">
              <div className="p-4 md:p-6 border-b border-[#c3c8c1]/20 flex justify-between items-center bg-[#f3f4f1]/50">
                <h2 className="font-['EB_Garamond'] text-lg font-medium text-[#061b0e]">Recent Orders</h2>
                <button className="text-xs font-semibold text-[#4a6549] hover:underline">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#c3c8c1]/20 text-[10px] font-bold tracking-wider uppercase text-[#434843] bg-[#f3f4f1]/20">
                      <th className="p-4">Client / Order ID</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c3c8c1]/20 text-sm">
                    {orders.map((order, i) => (
                      <tr key={i} className="group hover:bg-[#f3f4f1]/30 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-[#191c1b]">{order.client}</div>
                          <div className="text-xs text-[#434843] mt-0.5">{order.id}</div>
                        </td>
                        <td className="p-4">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-[#434843] text-xs">{order.category}</td>
                        <td className="p-4 font-semibold text-[#191c1b] text-right font-['EB_Garamond'] text-base">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-[#c3c8c1]/20 bg-[#f3f4f1]/30 text-xs font-medium text-[#434843] text-right">
                Showing {orders.length} processing entries
              </div>
            </div>

            {/* Right Analytics Column */}
            <div className="flex flex-col gap-6">
              
              {/* Conversion Display Card */}
              <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[11px] text-[#434843] font-semibold uppercase tracking-wider mb-4">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-[#c3c8c1]/20 pb-5 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4a6549]"></span>
                      <span className="text-sm font-semibold text-[#434843]">Conversion Rate</span>
                    </div>
                    <span className="text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">68%</span>
                  </div>
                </div>

                <div className="bg-[#f3f4f1]/50 border border-[#c3c8c1]/20 p-4 rounded-xl italic text-xs text-[#434843] leading-relaxed">
                  "Bulk palm inquiries are up 20% since the 'Urban Jungle' blog post."
                </div>
              </div>

              {/* Legacy Leaf Banner */}
              <div className="relative rounded-xl overflow-hidden shadow-sm group bg-[#061b0e] flex-1 min-h-[180px]">
                <div 
                  className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                <div className="relative h-full p-6 flex flex-col justify-between items-start z-10">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#ccebc7] uppercase">Nursery Operations</span>
                    <h3 className="text-2xl font-['EB_Garamond'] text-white mt-1 leading-tight max-w-[200px]">
                      Managing Legacy Growth
                    </h3>
                  </div>
                  
                  <button className="flex items-center gap-1.5 bg-white text-[#061b0e] px-4 py-2 border border-[#c3c8c1]/20 rounded-lg text-xs font-medium transition-all shadow-sm transform active:scale-95">
                    Run Heritage Report
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#434843]" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Consistent Layout Footer */}
          <footer className="mt-4 pt-6 border-t border-[#c3c8c1]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#434843]">
            <div className="flex items-center gap-6">
              <span className="font-semibold text-[#061b0e]">Chauhan Traders & Nursery</span>
              <span>© 2024 Nurturing Growth Since 2016.</span>
            </div>
            <div className="flex gap-4 font-semibold text-[#061b0e]">
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <a href="#shipping" className="hover:underline">Shipping Info</a>
              <a href="#terms" className="hover:underline">Terms of Service</a>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;