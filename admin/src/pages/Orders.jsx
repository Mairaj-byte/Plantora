import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { Download, Plus, Search, Package, Phone, Image as ImageIcon } from 'lucide-react';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            token: token
          }
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
  const pendingFulfillment = orders.filter(o => o.status !== 'Delivered').length;
  const activeShipments = orders.filter(o => o.status === 'Shipped' || o.status === 'Out for delivery').length;

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.address?.firstName} ${order.address?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All Statuses' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 h-full">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">Order Management</h1>
              <p className="text-xs md:text-sm text-[#434843] mt-1">Review and manage your nursery's wholesale and retail distributions.</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Export Button */}
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-[#c3c8c1]/40 bg-white text-[#434843] px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f3f4f1] transition-all shadow-sm">
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              {/* Create Order Button */}
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#061b0e] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4a6549] transition-all shadow-md">
                <Plus className="w-4 h-4" />
                Create Order
              </button>
            </div>
          </div>

          {/* Bento Stats matched exactly to Dashboard Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Total Orders</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{orders.length}</span>
                <span className="text-[#4a6549] text-xs font-bold">Active</span>
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Pending Fulfillment</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{pendingFulfillment}</span>
                {pendingFulfillment > 0 && <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">PRIORITY</span>}
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Total Revenue</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{currency}{totalRevenue.toLocaleString('en-IN')}</span>
                <span className="text-[#4a6549] text-xs font-bold">Gross</span>
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Active Shipments</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{activeShipments}</span>
                <span className="text-[#434843] text-xs">In Transit</span>
              </div>
            </div>
          </div>

          {/* Table Controls & Filters Container */}
          <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 flex flex-col overflow-hidden">
            <div className="p-4 md:p-6 border-b border-[#c3c8c1]/20 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#f3f4f1]/50">

              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#434843] w-4 h-4" />
                <input
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm transition-all shadow-sm placeholder:text-[#434843]/60 text-[#191c1b]"
                  placeholder="Search by Order ID or Client Name..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <select
                  className="bg-white border border-[#c3c8c1]/30 rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#4a6549]/20 transition-all shadow-sm text-[#434843] cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>


            {/* Cards List Layout (Botanical Table Row Aesthetics) */}
            <div className="divide-y divide-[#c3c8c1]/20">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => {
                  // Safely fetch the primary image from the first ordered item to use as the main card display
                  const primaryItemImage = order.items?.[0]?.image?.[0];
                  const primaryItemName = order.items?.[0]?.name || "Product";

                  return (
                    <div
                      className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.2fr_1fr] gap-6 items-center p-6 hover:bg-[#f3f4f1]/30 transition-colors"
                      key={order._id || index}
                    >
                      {/* Prominent Primary Product Image Cover Display - Appears Only Once Here */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#f3f4f1] border border-[#c3c8c1]/30 shadow-sm overflow-hidden flex items-center justify-center flex-shrink-0 self-start md:self-center">
                        {primaryItemImage ? (
                          <img
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            src={primaryItemImage}
                            alt={primaryItemName}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <Package className="w-8 h-8 text-[#434843]/40 stroke-[1.25]" />
                        )}
                      </div>

                      {/* Customer, Order details & Address Column */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold bg-[#ccebc7] text-[#506b4f] px-2.5 py-0.5 rounded-full">
                            ID: {order._id ? order._id.slice(-6).toUpperCase() : `#${index}`}
                          </span>
                          <span className="text-xs text-[#434843]">
                            {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-[#191c1b]">
                          {order.address?.firstName} {order.address?.lastName}
                        </div>

                        <div className="text-xs text-[#434843] leading-relaxed max-w-xs space-y-0.5">
                          <p>{order.address?.street},</p>
                          <p>{order.address?.city}, {order.address?.state}, {order.address?.zipcode}</p>
                          <p className="mt-1 font-medium text-[#4a6549] flex items-center gap-1">
                            <Phone className="w-3 h-3 inline" /> {order.address?.phone}
                          </p>
                        </div>
                      </div>

                      {/* Dynamic Items Row Grid - Clean Typography Text View (No micro-images) */}
                      <div className="space-y-3 text-sm w-full">
                        <div className="bg-[#f3f4f1]/50 p-3 rounded-lg border border-[#c3c8c1]/20 space-y-2">
                          <p className="text-[10px] font-bold text-[#434843] uppercase tracking-tight">Products Purchased</p>
                          <div className="max-h-36 overflow-y-auto space-y-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="bg-white p-2 rounded-lg border border-[#c3c8c1]/10 shadow-sm">
                                {/* Clean Typography Layout */}
                                <div className="text-xs min-w-0">
                                  <p className="font-semibold text-[#191c1b] truncate">{item.name}</p>
                                  <p className="text-[#434843]/80 text-[11px] mt-0.5">
                                    Qty: <span className="font-bold text-[#191c1b]">{item.quantity}</span>
                                    {item.size && <span className="ml-2 px-1 py-0.5 bg-[#f3f4f1] text-[#4a6549] rounded font-bold text-[10px]">{item.size}</span>}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Meta Payment Data */}
                        <div className="text-xs space-y-1 px-1 flex justify-between items-center md:block">
                          <p className="text-[#434843]"><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                          <p className="text-[#434843]">
                            <span className="font-medium">Payment:</span>{' '}
                            <span className={`font-semibold ${order.payment ? 'text-[#4a6549]' : 'text-[#93000a]'}`}>
                              {order.payment ? 'Done' : 'Pending'}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Order Pricing & Custom Status Control Dropdown */}
                      <div className="flex md:flex-col justify-between md:justify-center items-center md:items-end gap-4 h-full w-full">
                        <div className="text-left md:text-right">
                          <p className="text-xs text-[#434843] font-medium">Total Billing</p>
                          <p className="text-lg font-bold font-['EB_Garamond'] text-[#061b0e]">{currency}{order.amount?.toLocaleString('en-IN')}</p>
                        </div>

                        <div className="w-full max-w-[160px]">
                          <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                            className="w-full text-xs font-semibold bg-white border border-[#c3c8c1]/30 text-[#191c1b] rounded-lg p-2.5 outline-none shadow-sm transition-all focus:ring-2 focus:ring-[#4a6549]/20 cursor-pointer"
                          >
                            <option value="Order Placed">📦 Order Placed</option>
                            <option value="Packing">⚙️ Packing</option>
                            <option value="Shipped">🚚 Shipped</option>
                            <option value="Out for delivery">🛵 Out for delivery</option>
                            <option value="Delivered">✅ Delivered</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-[#434843] text-sm italic">
                  No orders match your active filter metrics.
                </div>
              )}
            </div>

            {/* Table Footer Layout indicator */}
            <div className="p-4 md:p-6 border-t border-[#c3c8c1]/20 flex justify-between items-center bg-[#f3f4f1]/30 text-xs font-medium text-[#434843]">
              <p>Showing {filteredOrders.length} of {orders.length} total transactional entries</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;