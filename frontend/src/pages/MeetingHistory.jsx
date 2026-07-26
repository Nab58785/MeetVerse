import React from 'react';
import { History, Video, Calendar, Clock, Download, Play, MoreVertical } from 'lucide-react';

const MeetingHistory = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Meeting History</h1>
      
      <div className="bg-card border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        {/* Filters/Tabs */}
        <div className="flex border-b border-gray-800 px-6 pt-4">
          <button className="px-4 py-3 text-primary border-b-2 border-primary font-medium">All Meetings</button>
          <button className="px-4 py-3 text-gray-400 hover:text-white font-medium transition-colors">Recorded</button>
          <button className="px-4 py-3 text-gray-400 hover:text-white font-medium transition-colors">Missed</button>
        </div>
        
        {/* History List */}
        <div className="divide-y divide-gray-800">
          {[
            { title: 'Project Kickoff', date: 'Oct 24, 2023', time: '10:00 AM - 11:30 AM', type: 'recorded', id: '1' },
            { title: 'Weekly Sync', date: 'Oct 22, 2023', time: '02:00 PM - 02:45 PM', type: 'normal', id: '2' },
            { title: 'Client Presentation', date: 'Oct 20, 2023', time: '04:00 PM - 05:00 PM', type: 'recorded', id: '3' },
          ].map((meeting) => (
            <div key={meeting.id} className="p-6 hover:bg-dark/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex items-start md:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meeting.type === 'recorded' ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'}`}>
                  {meeting.type === 'recorded' ? <Play size={24} /> : <Video size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{meeting.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {meeting.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {meeting.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-end md:self-auto">
                {meeting.type === 'recorded' && (
                  <button className="text-gray-400 hover:text-white flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
                    <Download size={16} />
                    Recording
                  </button>
                )}
                <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-800 flex justify-center">
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 font-medium hover:bg-gray-800 hover:text-white">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 font-medium hover:bg-gray-800 hover:text-white">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingHistory;
