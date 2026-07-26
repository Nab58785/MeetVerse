import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Key, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@meetverse.com');
  const [password, setPassword] = useState('admin123');
  const [secretKey, setSecretKey] = useState('ADMIN-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password || !secretKey) {
      setErrorMsg("All fields including Security Key are required!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Validate credentials
      if (
        (email.toLowerCase() === 'admin@meetverse.com' || email.toLowerCase() === 'admin') &&
        password === 'admin123' &&
        secretKey === 'ADMIN-2026'
      ) {
        setSuccessMsg("Admin Authentication Successful! Redirecting...");
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify({ email, role: 'Administrator' }));
        
        setTimeout(() => {
          navigate('/admin');
        }, 1200);
      } else {
        setErrorMsg("Invalid Admin Credentials or Security Key!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-card/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-500/20 p-8 sm:p-10 relative z-10">
        
        {/* Header Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/10">
            <Shield className="text-red-500" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-xs mt-1">MeetVerse Restricted Management Access</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 p-3.5 rounded-xl bg-dark/60 border border-gray-800 text-xs text-gray-400 space-y-1">
          <p className="font-semibold text-gray-300 flex items-center gap-1.5">
            <Lock size={12} className="text-red-400" /> Default Admin Credentials:
          </p>
          <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] text-gray-300">
            <div><span className="text-gray-500">Email:</span> admin@meetverse.com</div>
            <div><span className="text-gray-500">Pass:</span> admin123</div>
            <div><span className="text-gray-500">Key:</span> ADMIN-2026</div>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3 animate-in fade-in duration-300">
            <CheckCircle2 size={24} className="shrink-0" />
            <span className="font-semibold text-sm">{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 animate-in fade-in duration-300">
            <AlertCircle size={24} className="shrink-0" />
            <span className="font-semibold text-sm">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-5">
          
          {/* Admin Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@meetverse.com"
              className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Admin Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Security Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Security Admin Key</label>
            <div className="relative">
              <input 
                type="text"
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="ADMIN-XXXX"
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-all tracking-widest font-mono"
              />
              <Key size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Login to Admin Panel'}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back to User Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
