import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-darker flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8 sm:p-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-tight">
            MeetVerse
          </h1>
          <p className="text-gray-400 text-sm mb-6">Connect • Collaborate • Create</p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-white">Forgot Password?</h2>
            <Lock className="text-primary" size={24} />
          </div>
          
          <p className="text-gray-400 text-sm">
            Enter your registered email address below<br />
            to directly reset your password.
          </p>
        </div>

        <form className="space-y-6">
          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" placeholder="example@gmail.com" required className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" />
          </div>

          {/* Submit */}
          <Link to="/reset-password" className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 text-center block">
            Continue to Reset Password
          </Link>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
