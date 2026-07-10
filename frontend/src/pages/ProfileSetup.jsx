import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Calendar, Users, MapPin, Camera, Loader2 } from 'lucide-react';

const ProfileSetup = ({ token }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(''); 
    const [formData, setFormData] = useState({
        name: '',
        email: '', 
        phone: '',
        dob: '',
        gender: '',
        image: null, 
        address: { line1: '', line2: '', city: '', state: '', pincode: '' }
    });

    const loadUserProfile = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/getuserdata`, { headers: { token } });
            if (response.data.success) {
                const user = response.data.user;
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    dob: user.dob || '',
                    gender: user.gender || '',
                    image: null, 
                    address: user.address || { line1: '', line2: '', city: '', state: '', pincode: '' }
                });
                setImagePreview(user.image || '');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load user data");
        }
    };

    useEffect(() => {
        if (token) {
            loadUserProfile();
        }
        
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
            
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSend = new FormData();
            dataToSend.append('name', formData.name);
            dataToSend.append('phone', formData.phone);
            dataToSend.append('dob', formData.dob);
            dataToSend.append('gender', formData.gender);
            dataToSend.append('address', JSON.stringify(formData.address));

            if (formData.image) {
                dataToSend.append('image', formData.image);
            }

            const response = await axios.post(
                `${backendUrl}/api/user/profilesetup`, 
                dataToSend, 
                { headers: { token, 'Content-Type': 'multipart/form-data' } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                loadUserProfile(); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f9faf7] text-[#2c302b] antialiased">
            <div className="w-full max-w-5xl mx-auto px-4 py-10 md:px-8">
                
                {/* Header Title */}
                <div className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-serif text-[#061b0e] tracking-tight font-medium">
                        Profile Settings
                    </h1>
                    <p className="text-sm text-[#555b54] mt-1">
                        Update your garden profile identity, communication preferences, and default delivery channels.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Image Card */}
                    <div className="lg:col-span-4 bg-white border border-[#c3c8c1]/30 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#737973] self-start mb-4">
                            Profile Media
                        </span>
                        
                        <div className="relative group w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden bg-[#ccebc7]/40 border-2 border-[#4a6549]/10 shadow-sm transition-all duration-300 ring-4 ring-transparent hover:ring-[#4a6549]/20 mb-5">
                            {imagePreview ? (
                                <img 
                                    src={imagePreview} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-serif font-bold text-[#061b0e]">
                                    {formData.name ? formData.name.charAt(0).toUpperCase() : <User className="w-8 h-8 text-[#4a6549]" />}
                                </div>
                            )}
                            
                            <label className="absolute inset-0 bg-[#061b0e]/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200 cursor-pointer text-white">
                                <Camera className="w-5 h-5 mb-1" />
                                <span className="text-[10px] font-bold tracking-wider uppercase">Upload</span>
                                <input 
                                    type="file" 
                                    name="image" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="w-full text-left bg-[#f9faf7] rounded-xl p-3.5 border border-[#c3c8c1]/20">
                            <span className="block text-[10px] font-bold text-[#737973] uppercase tracking-wider mb-1">
                                Photo Guidelines
                            </span>
                            <p className="text-[11px] text-[#555b54] leading-relaxed">
                                Aspect ratios scaled perfectly square function best. Under 5MB files accepted (JPEG, PNG, WEBP).
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Forms split cleanly */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Personal Details */}
                        <div className="bg-white border border-[#c3c8c1]/30 rounded-2xl p-5 sm:p-7 shadow-sm">
                            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
                                <User className="w-4 h-4 text-[#4a6549]" />
                                <h3 className="text-base font-serif font-medium text-[#061b0e]">Personal Profile</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            disabled 
                                            className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-[#f3f4f1] border border-[#c3c8c1]/40 rounded-xl cursor-not-allowed text-gray-400 font-normal" 
                                        />
                                        <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Mobile Number</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            name="phone" 
                                            placeholder="Enter phone line"
                                            value={formData.phone} 
                                            onChange={handleInputChange} 
                                            className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                        <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737973]" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Date of Birth</label>
                                        <input 
                                            type="date" 
                                            name="dob" 
                                            value={formData.dob} 
                                            onChange={handleInputChange} 
                                            className="w-full px-2.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Gender</label>
                                        <div className="relative">
                                            <select 
                                                name="gender" 
                                                value={formData.gender} 
                                                onChange={handleInputChange} 
                                                className="w-full pl-3.5 pr-8 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e] appearance-none"
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <Users className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737973]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Address Details */}
                        <div className="bg-white border border-[#c3c8c1]/30 rounded-2xl p-5 sm:p-7 shadow-sm">
                            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
                                <MapPin className="w-4 h-4 text-[#4a6549]" />
                                <h3 className="text-base font-serif font-medium text-[#061b0e]">Primary Shipping Destination</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Address Line 1</label>
                                        <input 
                                            type="text" 
                                            name="line1" 
                                            placeholder="Flat, Appt No, Premise Details" 
                                            value={formData.address.line1} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Address Line 2</label>
                                        <input 
                                            type="text" 
                                            name="line2" 
                                            placeholder="Colony, Landmark, Locality" 
                                            value={formData.address.line2} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Town / City</label>
                                        <input 
                                            type="text" 
                                            name="city" 
                                            placeholder="City" 
                                            value={formData.address.city} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">State</label>
                                        <input 
                                            type="text" 
                                            name="state" 
                                            placeholder="State" 
                                            value={formData.address.state} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737973] mb-1.5">Pincode</label>
                                        <input 
                                            type="text" 
                                            name="pincode" 
                                            placeholder="Zip Area Code" 
                                            value={formData.address.pincode} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#c3c8c1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6549]/10 focus:border-[#4a6549] transition-all text-[#061b0e]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Action Bar */}
                        <div className="flex justify-end pt-2">
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 text-xs tracking-wider uppercase font-bold bg-[#061b0e] text-white hover:bg-[#15341e] active:bg-[#061b0e] rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    "Save Dashboard Setup"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;