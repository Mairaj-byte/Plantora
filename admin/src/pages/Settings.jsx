import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Shield, 
  CheckCircle, 
  Image as ImageIcon, 
  UploadCloud, 
  Trash2, 
  Eye 
} from 'lucide-react';

const Settings = () => {
  // Profile Information State
  const [profile, setProfile] = useState({
    name: "Aman Chauhan",
    role: "Senior Nursery Administrator",
    email: "aman@chauhannursery.com",
    phone: "+91 98765 43210",
    location: "Seohara, Uttar Pradesh, India",
    bio: "Managing multi-acre botanical stock, hybrid crop variations, and wholesale logistical pipelines since 2016.",
    status: "Active"
  });

  // Nursery Showcase Gallery State
  const [gallery, setGallery] = useState([
    { id: 1, title: "Areca Palm Rows", size: "2.4 MB", url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "Urban Jungle Greenhouse", size: "4.1 MB", url: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "Bonsai Collection Desk", size: "1.8 MB", url: "https://images.unsplash.com/photo-1613143323051-118329a268c6?auto=format&fit=crop&q=80&w=600" }
  ]);

  const [activePreview, setActivePreview] = useState(gallery[0]?.url);

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("Profile configurations synchronized securely.");
  };

  return (
    <div className="flex-grow overflow-y-auto h-screen bg-[#f9faf7] text-[#191c1b] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <main className="px-4 md:px-8 lg:px-12 pb-20 pt-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 h-full">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-['EB_Garamond'] font-medium text-[#061b0e] tracking-tight">Admin Profile & Settings</h1>
              <p className="text-xs md:text-sm text-[#434843] mt-1">Manage nursery operator identities, profile credentials, and digital catalog banner assets.</p>
            </div>
            
            <div className="flex items-center gap-2 bg-[#ccebc7]/40 text-[#506b4f] border border-[#c3c8c1]/20 px-3 py-1.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-sm">
              <Shield className="w-3.5 h-3.5" />
              <span>Verified SuperAdmin</span>
            </div>
          </div>

          {/* MAIN 2-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* LEFT PROFILE INFO COLUMN (Occupies 2 Spans) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Profile Bio & Account Card */}
              <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-[#061b0e] to-[#4a6549] relative" />
                
                <div className="px-6 pb-6 relative">
                  {/* Avatar wrapper */}
                  <div className="absolute -top-14 left-6 group">
                    <div className="w-24 h-24 rounded-2xl bg-white p-1 border border-[#c3c8c1]/30 shadow-md overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
                        alt="Profile Avatar" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-14 md:flex justify-between items-start gap-4">
                    <div className="mt-2">
                      <h2 className="font-['EB_Garamond'] text-2xl font-medium text-[#061b0e] flex items-center gap-2">
                        {profile.name}
                        <CheckCircle className="w-4 h-4 text-[#4a6549] fill-[#ccebc7]" />
                      </h2>
                      <p className="text-xs font-semibold text-[#434843] uppercase tracking-wider">{profile.role}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-2 flex gap-2">
                      <span className="text-[11px] font-bold bg-[#ccebc7] text-[#506b4f] px-3 py-1 rounded-full uppercase tracking-wider">
                        ● System Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Input fields */}
                <form onSubmit={handleProfileSave} className="p-6 border-t border-[#c3c8c1]/20 bg-[#f3f4f1]/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Full Operator Name</label>
                      <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm text-[#191c1b] font-medium shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Contact Email Address</label>
                      <input 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm text-[#191c1b] font-medium shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Phone Link</label>
                      <input 
                        type="text" 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm text-[#191c1b] font-medium shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Hub Location</label>
                      <input 
                        type="text" 
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm text-[#191c1b] font-medium shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#434843] uppercase tracking-wider">Professional Bio / Scope</label>
                    <textarea 
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full px-4 py-2 bg-white border border-[#c3c8c1]/30 rounded-xl focus:ring-2 focus:ring-[#4a6549]/20 outline-none text-sm text-[#191c1b] leading-relaxed shadow-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      type="submit" 
                      className="px-5 py-2.5 bg-[#061b0e] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#4a6549] transition-colors shadow-sm"
                    >
                      Update Profile Identity
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* RIGHT AESTHETIC INTERACTIVE MEDIA VIEW COLUMN */}
            <div className="space-y-6">
              
              {/* Image Preview Dynamic Aspect Card */}
              <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(74,101,73,0.08)] border border-[#c3c8c1]/20 p-4 flex flex-col">
                <div className="text-[10px] font-bold text-[#434843] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#4a6549]" /> Live Aspect Sandbox Preview
                </div>

                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#f3f4f1] border border-[#c3c8c1]/30 group shadow-inner">
                  {activePreview ? (
                    <img 
                      src={activePreview} 
                      alt="Active Digital Canvas View" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#434843] text-xs italic">
                      No active image loaded.
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    4:3 Showcase View
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#f3f4f1]/50 border border-[#c3c8c1]/20 rounded-lg text-[11px] text-[#434843] leading-relaxed">
                  <strong>Dashboard Placement Note:</strong> This selected asset will map directly onto client welcome banners and regional B2B wholesale quotation portal sliders.
                </div>
              </div>

              {/* Quick Operational Info Cards */}
              <div className="bg-[#061b0e] text-white rounded-xl p-6 relative overflow-hidden shadow-sm">
                <div 
                  className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=400')` }}
                />
                <div className="relative z-10 space-y-4">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#ccebc7] uppercase">Infrastructure Specs</span>
                    <h3 className="text-xl font-['EB_Garamond'] text-white mt-0.5 leading-tight">System Node Status</h3>
                  </div>

                  <div className="text-xs text-[#c3c8c1] space-y-2 leading-relaxed">
                    <p className="flex justify-between border-b border-white/10 pb-1">
                      <span>Server Cluster:</span> <span className="font-semibold text-white">UP-East Edge</span>
                    </p>
                    <p className="flex justify-between border-b border-white/10 pb-1">
                      <span>Database Ping:</span> <span className="font-semibold text-emerald-400">14ms Operational</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Media Storage:</span> <span className="font-semibold text-white">78.2 GB / 100 GB</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>


        </div>
      </main>
    </div>
  );
};

export default Settings;