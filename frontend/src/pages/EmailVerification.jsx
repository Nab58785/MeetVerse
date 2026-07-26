import React from 'react';
import { Mail } from 'lucide-react';

const EmailVerification = () => {
  return (
    <div className="min-h-screen bg-darker flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8 text-center relative z-10">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="text-primary" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Verify your email</h2>
        <p className="text-gray-400 text-sm mb-8">
          We've sent a 6-digit verification code to your email address.
        </p>
        <div className="flex justify-center gap-2 mb-8">
          {[1,2,3,4,5,6].map(i => (
            <input key={i} type="text" maxLength="1" className="w-12 h-12 text-center text-xl bg-dark/50 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          ))}
        </div>
        <button className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
          Verify Email
        </button>
        <p className="mt-6 text-sm text-gray-400">
          Didn't receive the code? <button className="text-primary hover:text-blue-400 hover:underline transition-colors ml-1">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
