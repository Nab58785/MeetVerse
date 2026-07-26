import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, MonitorUp, PenTool, MessageSquare, Folder, PhoneOff, Circle, Send } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Assuming backend runs on port 5000

const MeetingRoom = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activePanel, setActivePanel] = useState('chat'); // chat, files, whiteboard
  
  const myVideoRef = useRef();

  useEffect(() => {
    socket.emit('join-room', roomId || 'default-room', 'mock-user-id');

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    }).catch(err => console.log("Media not accessible", err));

    socket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('send-message', newMessage);
      setMessages(prev => [...prev, { userId: 'You', message: newMessage }]);
      setNewMessage('');
    }
  };

  const toggleMute = () => {
    const stream = myVideoRef.current?.srcObject;
    if (stream) {
      stream.getAudioTracks()[0].enabled = isMuted;
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    const stream = myVideoRef.current?.srcObject;
    if (stream) {
      stream.getVideoTracks()[0].enabled = isVideoOff;
    }
    setIsVideoOff(!isVideoOff);
  };

  const ParticipantCard = ({ name, color, initial, isYou }) => (
    <div className="flex-1 min-w-[200px] h-full bg-card rounded-2xl overflow-hidden border border-gray-800 relative flex flex-col items-center justify-center group shadow-lg">
      {isYou ? (
        <video ref={myVideoRef} muted autoPlay playsInline className="h-full w-full object-cover" />
      ) : (
        <div className={`w-24 h-24 ${color} rounded-full flex items-center justify-center text-3xl font-bold shadow-lg`}>
          {initial}
        </div>
      )}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
        {name} {isYou && isMuted && <MicOff size={14} className="text-red-400" />}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-darker flex flex-col overflow-hidden font-sans text-white">
      
      {/* Top Bar */}
      <div className="h-14 bg-card border-b border-gray-800 flex items-center justify-between px-6 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="text-primary font-bold text-lg tracking-tight">MeetVerse</span>
          <div className="w-px h-4 bg-gray-700"></div>
          <span className="text-gray-300">Meeting: AI Project</span>
          <div className="w-px h-4 bg-gray-700"></div>
          <span className="text-gray-400">Meeting ID: {roomId || 'MV-2026-001'}</span>
          
          {/* Copy Link Button */}
          <button 
            onClick={() => {
              const link = `${window.location.origin}/waiting-room/${roomId || 'MV-2026-001'}`;
              navigator.clipboard.writeText(link);
              // Show a small native alert or you can add a toast state here
              alert(`Meeting Link Copied!\n\n${link}`);
            }}
            className="flex items-center gap-1.5 ml-4 bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-primary/20 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Invite Link
          </button>
        </div>
        
        <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm font-medium animate-pulse border border-red-500/20">
          <Circle size={10} fill="currentColor" />
          Recording
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Participants Row */}
        <div className="h-64 p-4 flex gap-4 overflow-x-auto shrink-0 border-b border-gray-800 bg-dark custom-scrollbar">
          <ParticipantCard name="Participant 1 (You)" isYou={true} />
          <ParticipantCard name="Participant 2" color="bg-blue-500" initial="P2" />
          <ParticipantCard name="Participant 3" color="bg-green-500" initial="P3" />
          <ParticipantCard name="Participant 4" color="bg-purple-500" initial="P4" />
        </div>

        {/* Accordion Panels */}
        <div className="flex-1 flex flex-col overflow-hidden bg-dark/50">
          
          {/* Chat Panel */}
          <div className={`flex flex-col transition-all duration-300 ${activePanel === 'chat' ? 'flex-1 border-b border-gray-800' : 'shrink-0'}`}>
            <button onClick={() => setActivePanel('chat')} className="w-full flex flex-col items-end p-4 hover:bg-gray-800/50 transition-colors group cursor-pointer">
              <MessageSquare size={24} className={`mb-2 transition-colors ${activePanel === 'chat' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
              <div className="w-full border-t border-gray-700 border-dashed relative">
                <span className={`absolute right-0 top-0 -mt-3 bg-darker px-3 font-medium transition-colors ${activePanel === 'chat' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`}>Chat</span>
              </div>
            </button>
            
            {activePanel === 'chat' && (
              <div className="flex-1 overflow-hidden flex flex-col px-6 pb-4">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.userId === 'You' ? 'items-end' : 'items-start'}`}>
                      <span className="text-xs text-gray-500 mb-1 px-1">{msg.userId}</span>
                      <div className={`px-4 py-2 rounded-2xl max-w-[85%] shadow-md ${msg.userId === 'You' ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700'}`}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <MessageSquare size={40} className="mb-4 opacity-20" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2 items-center bg-card border border-gray-700 rounded-full p-1 pl-4 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm focus:outline-none text-white py-2"
                  />
                  <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-primary hover:bg-blue-500 flex items-center justify-center text-white transition-colors shrink-0">
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Files Panel */}
          <div className={`flex flex-col transition-all duration-300 ${activePanel === 'files' ? 'flex-1 border-b border-gray-800' : 'shrink-0'}`}>
            <button onClick={() => setActivePanel('files')} className="w-full flex flex-col items-end p-4 hover:bg-gray-800/50 transition-colors group cursor-pointer">
              <Folder size={24} className={`mb-2 transition-colors ${activePanel === 'files' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
              <div className="w-full border-t border-gray-700 border-dashed relative">
                <span className={`absolute right-0 top-0 -mt-3 bg-darker px-3 font-medium transition-colors ${activePanel === 'files' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`}>Files</span>
              </div>
            </button>
            
            {activePanel === 'files' && (
              <div className="flex-1 overflow-hidden flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                  <Folder size={40} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No files shared</h3>
                <p className="text-gray-400 max-w-sm mb-6">Upload documents, images, or presentation files to share with everyone in the meeting.</p>
                <button className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all">
                  Upload File
                </button>
              </div>
            )}
          </div>

          {/* Whiteboard Panel */}
          <div className={`flex flex-col transition-all duration-300 ${activePanel === 'whiteboard' ? 'flex-1' : 'shrink-0'}`}>
            <button onClick={() => setActivePanel('whiteboard')} className="w-full flex flex-col items-end p-4 hover:bg-gray-800/50 transition-colors group cursor-pointer">
              <PenTool size={24} className={`mb-2 transition-colors ${activePanel === 'whiteboard' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
              <div className="w-full border-t border-gray-700 border-dashed relative">
                <span className={`absolute right-0 top-0 -mt-3 bg-darker px-3 font-medium transition-colors ${activePanel === 'whiteboard' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`}>Whiteboard</span>
              </div>
            </button>
            
            {activePanel === 'whiteboard' && (
              <div className="flex-1 overflow-hidden flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                <div className="w-full max-w-4xl h-full border border-gray-700 rounded-2xl bg-[#1a1c23] shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Whiteboard Toolbar */}
                  <div className="h-12 border-b border-gray-700 bg-card/80 backdrop-blur-sm flex items-center px-4 gap-2 shrink-0">
                    <button className="p-1.5 hover:bg-gray-700 rounded text-gray-300"><PenTool size={16} /></button>
                    <button className="p-1.5 hover:bg-gray-700 rounded text-gray-300"><div className="w-3 h-3 border-2 border-current rounded-sm"></div></button>
                    <button className="p-1.5 hover:bg-gray-700 rounded text-gray-300"><div className="w-3 h-3 border-2 border-current rounded-full"></div></button>
                    <div className="w-px h-6 bg-gray-700 mx-2"></div>
                    <button className="text-xs bg-primary/20 text-primary px-3 py-1 rounded font-medium hover:bg-primary/30 ml-auto">Clear Canvas</button>
                  </div>
                  {/* Canvas Grid */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-gray-500 font-medium">Interactive Whiteboard</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="h-20 bg-card border-t border-gray-800 flex items-center justify-center gap-4 px-6 shrink-0 relative z-20 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5)]">
        
        <button onClick={toggleMute} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium ${isMuted ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-dark hover:bg-gray-800 text-white border border-gray-700'}`}>
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mic'}</span>
        </button>
        
        <button onClick={toggleVideo} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium ${isVideoOff ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-dark hover:bg-gray-800 text-white border border-gray-700'}`}>
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          <span className="hidden sm:inline">{isVideoOff ? 'Camera Off' : 'Camera'}</span>
        </button>

        <div className="w-px h-8 bg-gray-700 mx-2"></div>

        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark hover:bg-gray-800 text-white border border-gray-700 transition-all font-medium">
          <MonitorUp size={20} className="text-blue-400" />
          <span className="hidden sm:inline">Share Screen</span>
        </button>

        <button onClick={()=>setActivePanel('whiteboard')} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium border border-gray-700 ${activePanel === 'whiteboard' ? 'bg-primary text-white border-primary' : 'bg-dark hover:bg-gray-800 text-white'}`}>
          <PenTool size={20} />
          <span className="hidden md:inline">Whiteboard</span>
        </button>
        
        <button onClick={()=>setActivePanel('chat')} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium border border-gray-700 ${activePanel === 'chat' ? 'bg-primary text-white border-primary' : 'bg-dark hover:bg-gray-800 text-white'}`}>
          <MessageSquare size={20} />
          <span className="hidden md:inline">Chat</span>
        </button>

        <button onClick={()=>setActivePanel('files')} className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium border border-gray-700 ${activePanel === 'files' ? 'bg-primary text-white border-primary' : 'bg-dark hover:bg-gray-800 text-white'}`}>
          <Folder size={20} />
          <span className="hidden md:inline">Files</span>
        </button>

        <div className="w-px h-8 bg-gray-700 mx-2"></div>

        <button onClick={()=>navigate('/dashboard')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all font-bold shadow-lg shadow-red-500/25">
          <PhoneOff size={20} />
          End
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;
