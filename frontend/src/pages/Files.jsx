import React, { useState, useRef } from 'react';
import { File, Folder, MoreHorizontal, Download, UploadCloud, Search, CheckCircle2 } from 'lucide-react';

const initialFiles = [
  { name: 'Q3_Roadmap_Final.pdf', date: 'Oct 24, 2023', size: '2.4 MB', folder: 'Project Assets', icon: <File className="text-red-400" size={20} /> },
  { name: 'UI_Design_System.fig', date: 'Oct 22, 2023', size: '15.1 MB', folder: 'Project Assets', icon: <File className="text-purple-400" size={20} /> },
  { name: 'Meeting_Notes_Oct20.docx', date: 'Oct 20, 2023', size: '124 KB', folder: 'Shared Documents', icon: <File className="text-blue-400" size={20} /> },
  { name: 'Sprint_Planning_Recording.mp4', date: 'Oct 18, 2023', size: '245 MB', folder: 'Meeting Recordings', icon: <File className="text-green-400" size={20} /> },
];

const folders = ['Project Assets', 'Meeting Recordings', 'Shared Documents', 'Personal'];

const Files = () => {
  const [files, setFiles] = useState(initialFiles);
  const [activeFolder, setActiveFolder] = useState('All');
  const [dragActive, setDragActive] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    const newFile = {
      name: file.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      folder: activeFolder === 'All' ? 'Personal' : activeFolder,
      icon: <File className="text-blue-400" size={20} />
    };
    setFiles([newFile, ...files]);
    setSuccessMsg(`${file.name} uploaded successfully!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const filteredFiles = activeFolder === 'All' ? files : files.filter(f => f.folder === activeFolder);

  return (
    <div 
      className="max-w-6xl mx-auto space-y-8 p-2 md:p-4"
      onDragEnter={handleDrag}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Files & Resources</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search files..." className="w-full bg-card border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors" />
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <button onClick={handleUploadClick} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-primary/25 shrink-0">
            <UploadCloud size={18} />
            Upload
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3">
          <CheckCircle2 size={24} className="shrink-0" />
          <span className="font-semibold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Drag & Drop Overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-primary"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <UploadCloud size={64} className="text-primary mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-white">Drop files here to upload</h2>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Folders */}
        <div className="col-span-1 md:col-span-4 mb-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-300">Folders</h2>
            {activeFolder !== 'All' && (
              <button onClick={() => setActiveFolder('All')} className="text-primary text-sm hover:underline">
                View All Files
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder, i) => {
              const count = files.filter(f => f.folder === folder).length;
              const isActive = activeFolder === folder;
              return (
                <div 
                  key={i} 
                  onClick={() => setActiveFolder(folder)}
                  className={`bg-card border p-4 rounded-2xl cursor-pointer transition-all group ${isActive ? 'border-primary ring-1 ring-primary/50' : 'border-gray-800 hover:border-primary/50'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Folder className={`${isActive ? 'text-primary' : 'text-indigo-400'} group-hover:text-primary transition-colors`} size={32} />
                    <button className="text-gray-500 hover:text-white" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={18} /></button>
                  </div>
                  <h3 className="font-semibold text-white truncate">{folder}</h3>
                  <p className="text-xs text-gray-400 mt-1">{count} items</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Files */}
        <div className="col-span-1 md:col-span-4">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">{activeFolder === 'All' ? 'Recent Files' : `Files in ${activeFolder}`}</h2>
          <div className="bg-card border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark/50 border-b border-gray-800">
                  <th className="px-6 py-4 text-sm font-medium text-gray-400">Name</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400 hidden md:table-cell">Date Modified</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400 hidden md:table-cell">Size</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredFiles.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No files found in this folder.
                    </td>
                  </tr>
                ) : (
                  filteredFiles.map((file, i) => (
                    <tr key={i} className="hover:bg-dark/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-dark rounded-lg group-hover:bg-gray-800 transition-colors">
                            {file.icon}
                          </div>
                          <span className="font-medium text-gray-200">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">{file.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">{file.size}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-gray-500 hover:text-white transition-colors" title="Download">
                            <Download size={18} />
                          </button>
                          <button className="text-gray-500 hover:text-white transition-colors" onClick={() => {
                            setFiles(files.filter(f => f !== file));
                          }}>
                            <Trash2 size={18} className="text-red-400 hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
