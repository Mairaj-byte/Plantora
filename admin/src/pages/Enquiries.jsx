import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Trash2, Search, MessageSquare, Inbox } from 'lucide-react';

const Enquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // 1. Fetch inquiries on component mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch(backendUrl + "/api/enquiry/list");
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      
      const jsonResponse = await response.json();
      
      if (jsonResponse.success) {
        setInquiries(jsonResponse.data || []);
      } else {
        throw new Error(jsonResponse.message || 'Failed to extract data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle status change request (enum: 'Completed' / 'Not-Completed')
  const handleStatusChange = async (id, newStatus) => {
    const previousInquiries = [...inquiries];
    
    setInquiries(prev =>
      prev.map(item => (item._id === id ? { ...item, status: newStatus || 'Not-Completed' } : item))
    );

    try {
      const response = await fetch(backendUrl + "/api/enquiry/status", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const jsonResponse = await response.json();
      if (!response.ok || !jsonResponse.success) {
        throw new Error(jsonResponse.message || 'Could not update status');
      }
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
      setInquiries(previousInquiries); 
    }
  };

  // 3. Handle delete inquiry request
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(backendUrl + "/api/enquiry/delete", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const jsonResponse = await response.json();
      if (!response.ok || !jsonResponse.success) {
        throw new Error(jsonResponse.message || 'Could not delete inquiry');
      }
      
      setInquiries(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      alert(`Error deleting inquiry: ${err.message}`);
    }
  };

  // Dynamic Bento Grid Metrics
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(i => i.status !== 'Completed').length;
  const completedInquiries = inquiries.filter(i => i.status === 'Completed').length;

  // Filter Logic
  const filteredInquiries = inquiries.filter(enquiry => {
    const matchesSearch =
      enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.plantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'All Statuses' || 
      (statusFilter === 'Completed' && enquiry.status === 'Completed') ||
      (statusFilter === 'Not-Completed' && (enquiry.status === 'Not-Completed' || !enquiry.status));

    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="text-center py-20 text-sm font-medium text-[#434843]">Loading inquiries...</div>;
  if (error) return <div className="text-center py-20 text-sm font-semibold text-[#93000a]">Error: {error}</div>;

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 h-full">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">Customer Inquiries</h1>
              <p className="text-xs md:text-sm text-[#434843] mt-1">Review plant questions, wholesale requests, and digital customer support submissions.</p>
            </div>
          </div>

          {/* Bento Stats matched exactly to Dashboard Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Total Inquiries</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{totalInquiries}</span>
                <span className="text-[#4a6549] text-xs font-bold">Inbox Total</span>
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Pending Action</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{pendingInquiries}</span>
                {pendingInquiries > 0 && <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">ATTENTION</span>}
              </div>
            </div>

            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] p-6 rounded-xl border border-[#c3c8c1]/10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider mb-2">Resolved Requests</p>
              <div className="flex items-end justify-between">
                <span className="text-xl md:text-2xl font-['EB_Garamond'] font-medium text-[#061b0e]">{completedInquiries}</span>
                <span className="text-[#4a6549] text-xs font-bold">Completed</span>
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
                  placeholder="Search by Client, Plant Name or Email..."
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
                  <option value="Not-Completed">Not-Completed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* List Layout */}
            <div className="divide-y divide-[#c3c8c1]/20">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((enquiry, index) => (
                  <div 
                    className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr_1fr] gap-6 items-start p-6 hover:bg-[#f3f4f1]/30 transition-colors" 
                    key={enquiry._id || index}
                  >
                    
                    {/* Customer Info Metadata block */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold bg-[#ccebc7] text-[#506b4f] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Plant: {enquiry.plantName || "General"}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-[#191c1b]">
                        {enquiry.name}
                      </div>

                      <div className="text-xs text-[#434843] leading-relaxed space-y-1">
                        <p className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 text-[#434843]/70" /> {enquiry.email}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#434843]/70" /> {enquiry.contactNumber}
                        </p>
                        <p className="flex items-center gap-1.5 text-[11px] text-[#434843]/80 pt-1">
                          <Calendar className="w-3.5 h-3.5 text-[#434843]/60" />
                          {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Message Details Content Block */}
                    <div className="space-y-3 text-sm w-full">
                      <div className="bg-[#f3f4f1]/50 p-4 rounded-xl border border-[#c3c8c1]/20 space-y-2">
                        <p className="text-[10px] font-bold text-[#434843] uppercase tracking-tight flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" /> Customer Message
                        </p>
                        <p className="text-xs text-[#191c1b] leading-relaxed whitespace-pre-line">
                          "{enquiry.message}"
                        </p>
                      </div>
                      
                      {enquiry.address && (
                        <div className="text-xs text-[#434843] px-1 flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#434843]/60 flex-shrink-0 mt-0.5" />
                          <span><span className="font-medium text-[#191c1b]">Location:</span> {enquiry.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Action Tools & Selection Dropdowns */}
                    <div className="flex md:flex-col justify-between md:justify-center items-center md:items-end gap-4 md:h-full w-full self-center">
                      <div className="w-full max-w-[150px]">
                        <select 
                          onChange={(e) => handleStatusChange(enquiry._id, e.target.value)} 
                          value={enquiry.status || 'Not-Completed'} 
                          className={`w-full text-xs font-semibold border rounded-lg p-2.5 outline-none shadow-sm transition-all focus:ring-2 focus:ring-[#4a6549]/20 cursor-pointer ${
                            enquiry.status === 'Completed' 
                              ? 'bg-[#ccebc7]/40 text-[#506b4f] border-[#c3c8c1]/40' 
                              : 'bg-[#ffdad6]/40 text-[#93000a] border-[#ffdad6]/60'
                          }`}
                        >
                          <option value="Not-Completed">⏳ Not-Completed</option>
                          <option value="Completed">✅ Completed</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleDelete(enquiry._id)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#ffdad6]/20 text-[#93000a] border border-[#ffdad6] rounded-lg text-xs font-medium transition-all shadow-sm"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-16 text-center text-[#434843] text-sm italic flex flex-col items-center justify-center gap-2">
                  <Inbox className="w-8 h-8 text-[#434843]/40 stroke-[1.25]" />
                  No customer inquiries match your active layout views.
                </div>
              )}
            </div>
            
            {/* Table Footer Layout indicator */}
            <div className="p-4 md:p-6 border-t border-[#c3c8c1]/20 flex justify-between items-center bg-[#f3f4f1]/30 text-xs font-medium text-[#434843]">
              <p>Showing {filteredInquiries.length} of {inquiries.length} total entry listings</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Enquiries;