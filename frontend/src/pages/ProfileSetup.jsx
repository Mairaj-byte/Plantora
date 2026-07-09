import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileSetup = ({ token }) => {
    const backendUrl = "http://localhost:4000"; 
    
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
        
        // Cleanup function: Revoke any dangling blob preview URLs when component unmounts
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
            
            // Critical Memory Fix: Clean up old local blob preview before setting a new one
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
        <div className="min-h-screen w-full bg-gradient-to-br from-zinc-50 to-zinc-100 text-zinc-800 antialiased">
            <div className="w-full max-w-7xl mx-auto px-4 py-12 md:px-8">
                
                {/* Header Title */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Profile Settings
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">
                        Update your personal information, profile photo, and default shipping addresses.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Profile Image Setup */}
                    <div className="lg:col-span-4 bg-[#ccebc7]/50 border border-zinc-200/80 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                        <label className="block text-sm font-semibold tracking-wide text-zinc-700 mb-6 w-full text-left">
                            Profile Photo
                        </label>
                        
                        <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-zinc-200 transition-all duration-300 hover:ring-emerald-500 mb-6">
                            <img 
                                src={imagePreview || "https://via.placeholder.com/250"} 
                                alt="Profile" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
                                <span className="text-white text-xs font-medium tracking-wide uppercase px-3 py-1.5 bg-zinc-900/60 backdrop-blur-sm rounded-full">
                                    Change Image
                                </span>
                            </div>
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="w-full text-left bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                            <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                Guidelines
                            </span>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Pick a square image file under 5MB. Formats accepted include JPG, PNG, and WEBP.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Information Forms */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Personal Info Block */}
                        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h3 className="text-lg font-semibold text-zinc-900 mb-6 pb-2 border-b border-zinc-100">
                                Personal Information
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        disabled 
                                        className="w-full px-4 py-3 text-sm bg-zinc-50 border border-zinc-200 rounded-xl cursor-not-allowed text-zinc-400 font-normal" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">Mobile Number</label>
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        placeholder="Enter 10-digit number"
                                        value={formData.phone} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">Date of Birth</label>
                                        <input 
                                            type="date" 
                                            name="dob" 
                                            value={formData.dob} 
                                            onChange={handleInputChange} 
                                            className="w-full px-3 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">Gender</label>
                                        <div className="relative">
                                            <select 
                                                name="gender" 
                                                value={formData.gender} 
                                                onChange={handleInputChange} 
                                                className="w-full px-3 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800 appearance-none"
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Block */}
                        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h3 className="text-lg font-semibold text-zinc-900 mb-6 pb-2 border-b border-zinc-100">
                                Delivery Address
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Address Line 1</label>
                                        <input 
                                            type="text" 
                                            name="line1" 
                                            placeholder="Flat, House no., Building" 
                                            value={formData.address.line1} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Address Line 2</label>
                                        <input 
                                            type="text" 
                                            name="line2" 
                                            placeholder="Area, Street, Sector" 
                                            value={formData.address.line2} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Town/City</label>
                                        <input 
                                            type="text" 
                                            name="city" 
                                            placeholder="City" 
                                            value={formData.address.city} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">State</label>
                                        <input 
                                            type="text" 
                                            name="state" 
                                            placeholder="State" 
                                            value={formData.address.state} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Pincode</label>
                                        <input 
                                            type="text" 
                                            name="pincode" 
                                            placeholder="Pincode" 
                                            value={formData.address.pincode} 
                                            onChange={handleAddressChange} 
                                            className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-zinc-800" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer Bar */}
                        <div className="flex justify-end pt-2">
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full sm:w-auto px-8 py-3.5 text-sm tracking-wide font-semibold bg-zinc-900 text-white hover:bg-emerald-600 active:bg-emerald-700 rounded-xl shadow-md shadow-zinc-900/10 hover:shadow-emerald-600/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? "Saving changes..." : "Save Profile Information"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;