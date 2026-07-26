import React from 'react';
import { Link } from 'react-router-dom';
import { Key, ArrowRight } from 'lucide-react';

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-darker flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md bg-card border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="w-16 h-16 bg-gradient-to-tr from-primary to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
          <Key className="text-white" size={32} />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-gray-400 mb-8">Enter your new password below to regain access to your account.</p>
        
        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-dark/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-dark/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <Link to="/login" className="w-full mt-2 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group block text-center">
            Reset Password
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
