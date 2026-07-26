import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Video, HardDrive, UserX, LineChart, BarChart, Activity, LogOut, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-darker text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                <Shield size={24} />
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                MeetVerse <span className="bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent">Admin Panel</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm mt-1">Manage users, meetings, analytics and system configuration.</p>
          </div>

          <button 
            onClick={handleAdminLogout}
            className="self-start sm:self-auto flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <LogOut size={16} />
            Admin Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <h3 className="text-3xl font-bold text-white">1,245</h3>
            </div>
          </div>

          {/* Meetings Today */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Video size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Meetings Today</p>
              <h3 className="text-3xl font-bold text-white">86</h3>
            </div>
          </div>

          {/* Storage Used */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
              <HardDrive size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Storage Used</p>
              <h3 className="text-3xl font-bold text-white">320 GB</h3>
            </div>
          </div>

          {/* Suspended Users */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
              <UserX size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Suspended Users</p>
              <h3 className="text-3xl font-bold text-white">12</h3>
            </div>
          </div>
        </div>

        {/* Bottom Panels / Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* User Growth Chart */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <LineChart className="text-primary" size={20} />
              <h3 className="font-bold text-white text-lg">User Growth Chart</h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] border border-gray-700/50 rounded-xl bg-dark/30 border-dashed">
              <LineChart size={48} className="text-gray-600 mb-2" />
              <span className="text-gray-500 text-sm">Chart visualization area</span>
            </div>
          </div>

          {/* Meeting Analytics */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <BarChart className="text-indigo-400" size={20} />
              <h3 className="font-bold text-white text-lg">Meeting Analytics</h3>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] border border-gray-700/50 rounded-xl bg-dark/30 border-dashed">
              <BarChart size={48} className="text-gray-600 mb-2" />
              <span className="text-gray-500 text-sm">Chart visualization area</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-gray-800 rounded-2xl p-6 shadow-lg flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-green-400" size={20} />
              <h3 className="font-bold text-white text-lg">Recent Activity</h3>
            </div>
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-[200px]">
              {[
                { text: "New user John Doe registered.", time: "2 mins ago" },
                { text: "Meeting 'Weekly Sync' ended.", time: "15 mins ago" },
                { text: "System backup completed successfully.", time: "1 hour ago" },
                { text: "User Jane Smith suspended.", time: "3 hours ago" },
              ].map((act, i) => (
                <div key={i} className="flex flex-col gap-1 pb-3 border-b border-gray-800/50 last:border-0">
                  <p className="text-sm text-gray-300">{act.text}</p>
                  <span className="text-xs text-gray-500">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
