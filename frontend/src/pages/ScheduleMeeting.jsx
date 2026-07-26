import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight } from 'lucide-react';

const ScheduleMeeting = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Schedule a Meeting</h1>
      
      <div className="bg-card border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">Meeting Title</label>
            <input 
              type="text" 
              placeholder="e.g., Weekly Sync" 
              className="w-full bg-dark/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="date" 
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="time" 
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">Invite Participants</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Enter email addresses separated by commas" 
                className="w-full bg-dark/50 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">Meeting Description (Optional)</label>
            <textarea 
              rows="4"
              placeholder="What is this meeting about?" 
              className="w-full bg-dark/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            ></textarea>
          </div>
          
          <div className="pt-4 flex justify-end gap-4">
            <button type="button" className="px-6 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-all">
              Cancel
            </button>
            <button type="button" className="px-8 py-4 bg-gradient-to-r from-primary to-indigo-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 transition-all flex items-center gap-2 group">
              Schedule Meeting
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
