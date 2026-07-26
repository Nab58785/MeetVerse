import React from 'react';

const MockGitHubOAuth = () => {
  const handleAuthorize = () => {
    // Send message back to parent window
    window.opener.postMessage({
      type: 'OAUTH_SUCCESS',
      user: {
        id: 'github_' + Date.now(),
        name: 'Nabeel Ahmad',
        email: 'nabeel@github.com',
        profilePicture: '',
        provider: 'github'
      }
    }, window.location.origin);
    
    // Close the popup
    window.close();
  };

  const handleCancel = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex flex-col items-center pt-8 px-4 font-sans">
      {/* GitHub Logo SVG */}
      <svg className="w-12 h-12 mb-6 text-[#24292f]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      
      <div className="w-full max-w-md bg-white border border-[#d0d7de] rounded-md shadow-sm text-center">
        <div className="p-4 border-b border-[#d0d7de] bg-[#f6f8fa] rounded-t-md">
          <p className="text-sm text-[#57606a]">Sign in to GitHub to continue to</p>
          <h1 className="text-xl font-semibold text-[#24292f] mt-1">MeetVerse</h1>
        </div>
        
        <div className="p-6 text-left">
          <p className="text-sm text-[#24292f] font-medium mb-4">MeetVerse wants to access your GitHub account.</p>
          
          <div className="border border-[#d0d7de] rounded-md p-3 mb-6 flex items-start gap-3">
             <div className="w-8 h-8 bg-gray-200 rounded-md shrink-0 flex items-center justify-center font-bold text-gray-500">M</div>
             <div>
                <p className="text-sm font-semibold text-[#24292f]">MeetVerse Web Application</p>
                <p className="text-xs text-[#57606a]">MeetVerse would like permission to read your public profile data and email address.</p>
             </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-[#24292f] text-sm font-medium hover:bg-[#f3f4f6] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAuthorize}
              className="flex-1 px-4 py-2 bg-[#2da44e] border border-transparent rounded-md text-white text-sm font-medium hover:bg-[#2c974b] transition-colors"
            >
              Authorize MeetVerse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockGitHubOAuth;
