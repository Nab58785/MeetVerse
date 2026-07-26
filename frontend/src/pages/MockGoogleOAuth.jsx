import React from 'react';

const MockGoogleOAuth = () => {
  const accounts = [
    { name: 'Nabeel Ahmad', email: 'nabeel@gmail.com', avatar: 'N' },
    { name: 'Developer User', email: 'dev.user@gmail.com', avatar: 'D' }
  ];

  const handleSelectAccount = (acc) => {
    // Send message back to parent window
    window.opener.postMessage({
      type: 'OAUTH_SUCCESS',
      user: {
        id: 'google_' + Date.now(),
        name: acc.name,
        email: acc.email,
        profilePicture: '',
        provider: 'google'
      }
    }, window.location.origin);
    
    // Close the popup
    window.close();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 px-4 font-sans">
      <div className="w-full max-w-md border border-gray-300 rounded-lg p-10 shadow-sm text-center">
        {/* Google Logo SVG */}
        <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <h1 className="text-2xl text-gray-800 font-normal mb-2">Sign in with Google</h1>
        <p className="text-gray-600 mb-8">Choose an account to continue to <b>MeetVerse</b></p>
        
        <div className="text-left border border-gray-200 rounded-md overflow-hidden">
          {accounts.map((acc, idx) => (
            <div 
              key={idx} 
              onClick={() => handleSelectAccount(acc)}
              className={`flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${idx !== accounts.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {acc.avatar}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm">{acc.name}</p>
                <p className="text-gray-500 text-sm">{acc.email}</p>
              </div>
            </div>
          ))}
          
          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-t border-gray-200 transition-colors">
             <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
             </div>
             <p className="text-gray-600 text-sm font-medium">Use another account</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          To continue, Google will share your name, email address, and profile picture with MeetVerse.
        </p>
      </div>
    </div>
  );
};

export default MockGoogleOAuth;
