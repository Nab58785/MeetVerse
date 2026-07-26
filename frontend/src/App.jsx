import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Video, Settings as SettingsIcon, User, Search, Bell, MessageSquare, Folder, PenTool, History, LogOut, MessageCircle, ChevronDown, Shield } from 'lucide-react';

// Import all pages
import SplashScreen from './pages/SplashScreen';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import CreateMeeting from './pages/CreateMeeting';
import JoinMeeting from './pages/JoinMeeting';
import MeetingRoom from './pages/MeetingRoom';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import WaitingRoom from './pages/WaitingRoom';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Chat from './pages/Chat';
import Whiteboard from './pages/Whiteboard';
import Files from './pages/Files';
import Notifications from './pages/Notifications';
import MeetingHistory from './pages/MeetingHistory';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import MockGoogleOAuth from './pages/MockGoogleOAuth';
import MockGitHubOAuth from './pages/MockGitHubOAuth';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary text-white font-medium shadow-lg shadow-primary/25' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
    <Icon size={20} />
    {label}
  </Link>
);

const AppLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="h-screen bg-darker text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800 shrink-0">
          <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
            MeetVerse
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={path === '/dashboard'} />
          <SidebarLink to="/create-meeting" icon={Video} label="Meetings" active={path === '/create-meeting' || path === '/schedule-meeting'} />
          <SidebarLink to="/join-meeting" icon={Video} label="Join Meeting" active={path === '/join-meeting'} />
          <SidebarLink to="/chat" icon={MessageCircle} label="Chat" active={path === '/chat'} />
          <SidebarLink to="/files" icon={Folder} label="Files" active={path === '/files'} />
          <SidebarLink to="/whiteboard" icon={PenTool} label="Whiteboard" active={path === '/whiteboard'} />
          <SidebarLink to="/history" icon={History} label="History" active={path === '/history'} />
        </div>

        <div className="p-4 border-t border-gray-800 space-y-1 shrink-0">
          <SidebarLink to="/profile" icon={User} label="Profile" active={path === '/profile'} />
          <SidebarLink to="/settings" icon={SettingsIcon} label="Settings" active={path === '/settings'} />
          <SidebarLink to="/login" icon={LogOut} label="Logout" active={false} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-card border-b border-gray-800 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search..." className="w-full bg-dark/50 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/notifications" className="text-gray-400 hover:text-white transition-colors relative block mt-1.5">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MessageSquare size={20} />
            </button>
            <div className="flex items-center gap-3 border-l border-gray-700 pl-6 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
                N
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm group-hover:text-primary transition-colors">Nabeel</span>
                <ChevronDown size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-darker p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />

        {/* Admin Login Route (Separate) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Mock OAuth Routes */}
        <Route path="/mock-google-oauth" element={<MockGoogleOAuth />} />
        <Route path="/mock-github-oauth" element={<MockGitHubOAuth />} />

        {/* Authenticated User Routes */}
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/create-meeting" element={<AppLayout><CreateMeeting /></AppLayout>} />
        <Route path="/schedule-meeting" element={<AppLayout><ScheduleMeeting /></AppLayout>} />
        <Route path="/join-meeting" element={<AppLayout><JoinMeeting /></AppLayout>} />
        <Route path="/chat" element={<AppLayout><Chat /></AppLayout>} />
        <Route path="/files" element={<AppLayout><Files /></AppLayout>} />
        <Route path="/whiteboard" element={<AppLayout><Whiteboard /></AppLayout>} />
        <Route path="/history" element={<AppLayout><MeetingHistory /></AppLayout>} />
        <Route path="/notifications" element={<AppLayout><Notifications /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
        
        {/* Separate Admin Dashboard Route */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Waiting Room & Meeting Room */}
        <Route path="/waiting-room/:id" element={<AppLayout><WaitingRoom /></AppLayout>} />
        <Route path="/room/:id" element={<MeetingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
