import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="text-primary" size={32} />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>
      
      <div className="bg-card border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h3 className="text-lg font-medium text-white">Dark Mode</h3>
            <p className="text-sm text-gray-400 mt-1">Toggle dark mode interface for the application.</p>
          </div>
          <div 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-primary' : 'bg-gray-600'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 ${darkMode ? 'translate-x-8' : 'translate-x-1'}`}></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pb-2">
          <div>
            <h3 className="text-lg font-medium text-white">Email Notifications</h3>
            <p className="text-sm text-gray-400 mt-1">Receive alerts for upcoming and scheduled meetings.</p>
          </div>
          <div 
            onClick={() => setNotifications(!notifications)}
            className={`w-14 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${notifications ? 'bg-primary' : 'bg-gray-600'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 ${notifications ? 'translate-x-8' : 'translate-x-1'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
