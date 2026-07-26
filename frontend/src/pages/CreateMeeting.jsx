import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateMeeting = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Create a New Meeting</h1>
      <div className="bg-card border border-gray-800 rounded-2xl p-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Meeting Title</label>
            <input type="text" placeholder="e.g. Project Discussion" className="w-full bg-dark/50 border border-gray-700 rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button 
               onClick={() => {
                 const newRoomId = 'MV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
                 navigate(`/room/${newRoomId}`);
               }} 
               className="flex-1 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 transition-all"
             >
               Start Instant Meeting
             </button>
             <button onClick={() => navigate('/schedule-meeting')} className="flex-1 bg-gray-700 text-white font-bold py-4 rounded-xl hover:bg-gray-600 transition-all border border-gray-600">
               Schedule for Later
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
