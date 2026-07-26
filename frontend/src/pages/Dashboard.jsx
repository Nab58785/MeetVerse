import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, Plus, Calendar, Clock, FileText, BellRing, Users, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'User' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  const displayName = user.name || user.username || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {displayName} 👋</h1>
        <p className="text-gray-400">Here's your meeting overview for today.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        <Link to="/create-meeting" className="flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5">
          <Plus size={20} /> Create Meeting
        </Link>
        <Link to="/join-meeting" className="flex items-center gap-2 bg-card border border-gray-700 hover:border-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all">
          <Video size={20} /> Join Meeting
        </Link>
        <button className="flex items-center gap-2 bg-card border border-gray-700 hover:border-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all">
          <Calendar size={20} /> Schedule
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Wider) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Upcoming Meetings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Upcoming Meetings</h2>
              <button className="text-primary text-sm hover:underline font-medium">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border border-gray-800 rounded-2xl p-5 hover:border-primary/50 transition-colors group">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Video size={20} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-1">AI Team Meeting</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                  <Clock size={14} /> Today 10:00 AM
                </p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-card flex items-center justify-center text-xs font-bold text-white">JD</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-card flex items-center justify-center text-xs font-bold text-white">AS</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-card flex items-center justify-center text-xs font-bold text-white">+3</div>
                </div>
              </div>
              <div className="bg-card border border-gray-800 rounded-2xl p-5 hover:border-primary/50 transition-colors group">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 text-orange-400 group-hover:scale-110 transition-transform">
                  <Video size={20} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-1">Project Review</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                  <Clock size={14} /> Tomorrow 2:00 PM
                </p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-card flex items-center justify-center text-xs font-bold text-white">MK</div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-card flex items-center justify-center text-xs font-bold text-white">RT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-card border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-dark/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300">Recent Files</span>
            </div>
            <div className="bg-card border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-dark/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform relative">
                <BellRing size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <span className="text-sm font-medium text-gray-300">Notifications</span>
            </div>
            <div className="bg-card border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-dark/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300">Team Members</span>
            </div>
            <div className="bg-card border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-dark/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Calendar size={20} />
              </div>
              <span className="text-sm font-medium text-gray-300">Calendar</span>
            </div>
          </div>

          {/* Meeting Statistics */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2"><BarChart2 className="text-primary"/> Meeting Statistics</h2>
             </div>
             <div className="h-48 flex items-end justify-between gap-2 px-2">
                {/* Dummy Chart Bars */}
                {[40, 70, 45, 90, 60, 30, 80].map((height, i) => (
                  <div key={i} className="w-full bg-dark rounded-t-md relative group overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-md group-hover:opacity-80 transition-opacity" 
                      style={{height: `${height}%`}}
                    ></div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium px-2">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-card to-dark border border-gray-800 rounded-2xl p-6 text-center shadow-lg">
             <div className="w-20 h-20 bg-gradient-to-tr from-primary to-indigo-500 rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-white shadow-xl mb-4 border-4 border-dark overflow-hidden">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  initial
                )}
             </div>
             <h3 className="text-lg font-bold text-white">{displayName}</h3>
             <p className="text-sm text-gray-400 mb-6">Member</p>
             <div className="flex justify-center gap-4 text-sm">
                <div className="text-center">
                  <span className="block text-white font-bold text-lg">12</span>
                  <span className="text-gray-500">Meetings</span>
                </div>
                <div className="w-px bg-gray-800"></div>
                <div className="text-center">
                  <span className="block text-white font-bold text-lg">45h</span>
                  <span className="text-gray-500">Hours</span>
                </div>
             </div>
           </div>
           
           <div className="bg-card border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Join</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Meeting Code" className="w-full bg-dark/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-sm" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">Join</button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
