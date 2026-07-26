import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, Settings } from 'lucide-react';

const WaitingRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  
  return (
    <div className="min-h-[calc(100vh-80px)] bg-darker flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Video Preview */}
        <div className="bg-card border border-gray-800 rounded-3xl p-4 shadow-xl">
          <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative flex items-center justify-center">
            {videoOn ? (
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Camera Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500">N</div>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`p-4 rounded-full ${micOn ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'} backdrop-blur-sm transition-all`}
              >
                {micOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>
              <button 
                onClick={() => setVideoOn(!videoOn)}
                className={`p-4 rounded-full ${videoOn ? 'bg-gray-800/80 text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'} backdrop-blur-sm transition-all`}
              >
                {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Meeting Info */}
        <div className="space-y-6 lg:pl-8">
          <h1 className="text-4xl font-bold text-white">Ready to join?</h1>
          <p className="text-gray-400 text-lg">Meeting ID: <span className="font-mono text-primary">{id || 'new-meeting-123'}</span></p>
          
          <div className="bg-card border border-gray-800 rounded-2xl p-6">
            <h3 className="font-medium text-white mb-4">Select Audio & Video Settings</h3>
            <div className="space-y-4">
               <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors bg-dark/50">
                  <div className="flex items-center gap-3">
                    <Settings className="text-gray-400" size={20} />
                    <span className="text-gray-300">Device Settings</span>
                  </div>
               </button>
            </div>
          </div>
          
          <button 
            onClick={() => navigate(`/room/${id || 'default-room'}`)}
            className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 transition-all text-lg"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
