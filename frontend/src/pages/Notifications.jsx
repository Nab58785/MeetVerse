import React from 'react';
import { Bell, Calendar, MessageSquare, Video, CheckCircle2 } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <button className="text-sm text-primary hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
          <CheckCircle2 size={16} />
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {/* Unread Notification */}
        <div className="bg-card border-l-4 border-primary border-y border-r border-y-gray-800 border-r-gray-800 p-6 rounded-r-2xl shadow-lg relative overflow-hidden group hover:bg-gray-800/50 transition-colors cursor-pointer">
          <div className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full"></div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Meeting Reminder</h3>
              <p className="text-gray-400 mt-1">"Sprint Planning" is starting in 15 minutes.</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-xs text-gray-500 font-medium">Just now</span>
                <button className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-medium hover:bg-primary/30 transition-colors">Join Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Read Notifications */}
        <div className="bg-card border border-gray-800 p-6 rounded-2xl hover:bg-gray-800/50 transition-colors cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Video size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-200 text-lg">Recording Available</h3>
              <p className="text-gray-400 mt-1">The recording for "Weekly Standup" is now ready to view and download.</p>
              <span className="text-xs text-gray-500 font-medium mt-2 block">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-gray-800 p-6 rounded-2xl hover:bg-gray-800/50 transition-colors cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-200 text-lg">New Message</h3>
              <p className="text-gray-400 mt-1">Sarah sent a message in "Design Team" chat.</p>
              <span className="text-xs text-gray-500 font-medium mt-2 block">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
