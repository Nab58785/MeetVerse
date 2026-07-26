import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Paperclip, MoreVertical, Search, User as UserIcon } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Assuming backend runs on port 5000

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: 'You', id: 'user_' + Math.floor(Math.random() * 1000) });
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUserStr = localStorage.getItem('user');
    let uName = 'You';
    if (savedUserStr) {
      const parsed = JSON.parse(savedUserStr);
      uName = parsed.name || parsed.username || 'You';
      setCurrentUser({ name: uName, id: parsed.id || 'user_' + Math.floor(Math.random() * 1000) });
    }

    // Join the global/team chat room
    socket.emit('join-room', 'global-team-sync', uName);

    // Listen for incoming messages
    socket.on('receive-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      // socket.disconnect(); // Do not disconnect if user navigates away, or disconnect if preferred
      // For clean up we just remove listener
      socket.off('receive-message');
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Send to server
    socket.emit('send-message', newMessage);
    
    // Optimistically add to local state
    setMessages(prev => [...prev, { userId: currentUser.name, message: newMessage, time: new Date() }]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-card border border-gray-800 rounded-3xl overflow-hidden shadow-xl font-sans">
      
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-gray-800 flex flex-col bg-dark/30 hidden md:flex shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search chats..." className="w-full bg-dark border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Global Team Sync Chat (Active) */}
          <div className="p-4 border-b border-gray-800/50 flex gap-3 cursor-pointer bg-gray-800/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-indigo-500 shrink-0 flex items-center justify-center text-white font-bold text-lg">
              TS
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-white truncate">Team Sync Group</h4>
                <span className="text-xs text-primary font-medium">Now</span>
              </div>
              <p className="text-sm text-gray-300 truncate">Global realtime chat</p>
            </div>
          </div>
          
          {/* Dummy Inactive Chats */}
          {[2,3,4].map(i => (
            <div key={i} className="p-4 border-b border-gray-800/50 flex gap-3 cursor-pointer hover:bg-gray-800/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-dark border border-gray-700 shrink-0 flex items-center justify-center text-gray-500">
                <UserIcon size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-gray-300 truncate">User {i}</h4>
                  <span className="text-xs text-gray-600">Yesterday</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Offline...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-dark/10 overflow-hidden">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-card/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white font-bold">
              TS
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">Team Sync Group</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online (Real-time)
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* Welcome Message */}
          <div className="flex justify-center">
            <span className="text-xs bg-dark px-3 py-1 rounded-full text-gray-500 border border-gray-800">
              Welcome to the Real-Time Global Chat!
            </span>
          </div>

          {messages.map((msg, idx) => {
            const isMe = msg.userId === currentUser.name || msg.userId === 'You';
            return (
              <div key={idx} className={`flex gap-3 max-w-2xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto text-xs font-bold text-white shadow-md ${isMe ? 'bg-gradient-to-tr from-primary to-indigo-500' : 'bg-gray-700'}`}>
                  {isMe ? 'You' : msg.userId.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className={`p-4 rounded-2xl shadow-md ${isMe ? 'bg-primary text-white rounded-br-sm shadow-primary/20' : 'bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700'}`}>
                    {msg.message}
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 block ${isMe ? 'text-right' : 'text-left'}`}>
                    {isMe ? 'You' : msg.userId} • {new Date(msg.time || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Invisible div to auto-scroll to bottom */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="p-4 bg-card/50 border-t border-gray-800 shrink-0">
          <div className="flex items-center gap-2 bg-dark border border-gray-700 rounded-full p-2 pr-4 focus-within:border-primary transition-colors">
            <button className="p-2 text-gray-400 hover:text-primary transition-colors hidden sm:block">
              <Image size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary transition-colors hidden sm:block">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-transparent border-none focus:outline-none text-white px-2 py-1" 
            />
            <button 
              onClick={handleSendMessage}
              className="w-10 h-10 bg-primary hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors shadow-lg shadow-primary/25 shrink-0"
            >
              <Send size={18} className="ml-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
