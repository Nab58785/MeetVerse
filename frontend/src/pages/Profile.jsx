import React, { useState, useRef, useEffect } from 'react';
import { Camera, Check, Upload, Shield, Calendar, Clock, CheckCircle2, Key, Trash2, ChevronDown, User as UserIcon } from 'lucide-react';

const Profile = () => {
  const fileInputRef = useRef(null);

  // Load stored user or default
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const [formData, setFormData] = useState({
    fullName: savedUser.name || '',
    username: savedUser.username || '',
    email: savedUser.email || '',
    phone: savedUser.phone || '',
    country: savedUser.country || 'PK',
    timeZone: savedUser.timeZone || 'Asia/Karachi',
    bio: savedUser.bio || 'Passionate Full Stack Developer creating awesome collaboration tools with React & Node.js.'
  });

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const [profilePicture, setProfilePicture] = useState(savedUser.profilePicture || '');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...savedUser,
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      timeZone: formData.timeZone,
      bio: formData.bio,
      profilePicture
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setPwdMsg("Passwords do not match!");
      return;
    }
    setPwdMsg("Password changed successfully!");
    setTimeout(() => {
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
      setPwdMsg('');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Title */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
          USER PROFILE
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account information and preferences</p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle2 size={24} className="shrink-0" />
          <span className="font-semibold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Profile Picture Card */}
      <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="relative mb-4 group">
          {profilePicture ? (
            <img 
              src={profilePicture} 
              alt="Profile Avatar" 
              className="w-28 h-28 rounded-full object-cover border-4 border-primary/50 shadow-xl"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
              {formData.fullName ? formData.fullName.split(' ').map(n=>n[0]).join('').slice(0, 2) : 'NA'}
            </div>
          )}
          <button 
            type="button" 
            onClick={handlePhotoClick}
            className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-blue-600 rounded-full text-white shadow-lg transition-transform hover:scale-110"
          >
            <Camera size={16} />
          </button>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handlePhotoChange} 
          accept="image/*" 
          className="hidden" 
        />

        <p className="text-gray-300 font-semibold text-base mb-1">Profile Picture</p>
        <button 
          type="button"
          onClick={handlePhotoClick}
          className="px-5 py-2 rounded-xl bg-dark/60 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium flex items-center gap-2 transition-all"
        >
          <Upload size={16} />
          Upload Photo
        </button>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSaveChanges} className="space-y-6">
        <div className="bg-card border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nabeel Ahmad Mubarak Ali"
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="nabeel_ahmad"
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Email Address with Verified Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300 block">Email Address</label>
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <Check size={12} /> Verified
                </span>
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nabeel@gmail.com"
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">Phone Number</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">Country</label>
              <div className="relative">
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                >
                  <option value="PK">Pakistan</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Time Zone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">Time Zone</label>
              <div className="relative">
                <select 
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                >
                  <option value="Asia/Karachi">Asia/Karachi</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Bio */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-gray-300 block">Bio</label>
            <textarea 
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Passionate Full Stack Developer..."
              className="w-full bg-dark/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-card border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            Account Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
            <div className="flex items-center justify-between p-3 bg-dark/40 rounded-xl border border-gray-800">
              <span className="text-gray-400 flex items-center gap-2">
                <Shield size={16} className="text-primary" /> Role
              </span>
              <span className="font-semibold text-white">User</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-dark/40 rounded-xl border border-gray-800">
              <span className="text-gray-400 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" /> Account Status
              </span>
              <span className="font-semibold text-green-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-dark/40 rounded-xl border border-gray-800">
              <span className="text-gray-400 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-400" /> Member Since
              </span>
              <span className="font-semibold text-white">{currentDate}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-dark/40 rounded-xl border border-gray-800">
              <span className="text-gray-400 flex items-center gap-2">
                <Clock size={16} className="text-amber-400" /> Last Login
              </span>
              <span className="font-semibold text-white">Today {currentTime}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-4">
            <button 
              type="submit"
              className="bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Save Changes
            </button>

            <button 
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="bg-dark border border-gray-700 hover:border-gray-500 text-gray-200 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Key size={18} className="text-primary" />
              Change Password
            </button>
          </div>

          <button 
            type="button"
            onClick={() => alert('Account deletion request initiated.')}
            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-medium px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </form>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Key className="text-primary" size={22} />
              Change Password
            </h3>

            {pwdMsg && (
              <div className={`p-3 rounded-lg text-sm font-medium ${pwdMsg.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {pwdMsg}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">New Password</label>
                <input 
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">Confirm New Password</label>
                <input 
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 rounded-xl bg-dark border border-gray-700 text-gray-300 font-medium hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold shadow-lg shadow-primary/25"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
