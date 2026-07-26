import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Shield, Zap } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-darker text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl w-full text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">MeetVerse</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          The ultimate platform for seamless, high-quality video collaboration. Connect, share, and create with your team anywhere in the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-card/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
            <Video className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">HD Video & Audio</h3>
            <p className="text-gray-400">Crystal clear communication with adaptive streaming quality.</p>
          </div>
          <div className="bg-card/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
            <Shield className="text-indigo-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-400">End-to-end encryption ensures your meetings stay confidential.</p>
          </div>
          <div className="bg-card/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
            <Zap className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Interactive Tools</h3>
            <p className="text-gray-400">Built-in whiteboards, file sharing, and real-time chat.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-primary to-indigo-600 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:from-blue-500 hover:to-indigo-500 transition-all">
            Get Started Free
          </Link>
          <Link to="/login" className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-700 transition-all">
            Login to Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
