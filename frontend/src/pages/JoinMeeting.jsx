import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from 'lucide-react';

const JoinMeeting = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  
  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Video className="text-indigo-400" size={32} />
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Join a Meeting</h1>
      <p className="text-gray-400 mb-8">Enter the meeting code or link provided by the host.</p>
      
      <div className="bg-card border border-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={code} 
            onChange={(e)=>setCode(e.target.value)} 
            placeholder="abc-defg-hij" 
            className="flex-1 bg-dark/50 border border-gray-700 rounded-xl p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center text-lg tracking-widest transition-all" 
          />
        </div>
        <button 
          onClick={()=> code && navigate(`/waiting-room/${code}`)}
          className="w-full mt-6 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 transition-all"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default JoinMeeting;
