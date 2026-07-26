// OAuth Utility for MeetVerse
// This handles Google and GitHub OAuth flows from the frontend

// -----------------------------------------------
// GOOGLE OAUTH SETUP INSTRUCTIONS (for real use):
// 1. Go to https://console.cloud.google.com/
// 2. Create OAuth 2.0 Client ID (Web application)
// 3. Set Authorized JavaScript origins: http://localhost:5173
// 4. Copy your Client ID and paste below
// -----------------------------------------------
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

// -----------------------------------------------
// GITHUB OAUTH SETUP INSTRUCTIONS (for real use):
// 1. Go to https://github.com/settings/developers
// 2. Create a new OAuth App
// 3. Set Homepage URL: http://localhost:5173
// 4. Set Callback URL: http://localhost:5173/auth/github/callback
// 5. Copy your Client ID and paste below
// -----------------------------------------------
const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const GITHUB_REDIRECT_URI = `${window.location.origin}/auth/github/callback`;

// --------------------------------------------------
// Google Sign-In using Google Identity Services (GSI)
// --------------------------------------------------
export const initGoogleOAuth = (onSuccess) => {
  // Load Google GSI script dynamically
  if (window.google) {
    _initGoogleSignIn(onSuccess);
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => _initGoogleSignIn(onSuccess);
  document.body.appendChild(script);
};

const _initGoogleSignIn = (onSuccess) => {
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => {
      // Decode the JWT credential to get user info
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
      );
      const userInfo = JSON.parse(jsonPayload);
      onSuccess({
        name: userInfo.name,
        email: userInfo.email,
        profilePicture: userInfo.picture,
        provider: 'google',
        id: 'google_' + userInfo.sub
      });
    }
  });

  window.google.accounts.id.prompt();
};

// --------------------------------------------------
// GitHub OAuth via Redirect Flow
// --------------------------------------------------
export const initiateGitHubOAuth = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=read:user,user:email`;
  window.location.href = githubAuthUrl;
};

// --------------------------------------------------
// Simulated OAuth for Demo/Development
// (Used when real Client IDs are not configured)
// --------------------------------------------------
export const simulateGoogleLogin = (navigate, setSuccessMsg, setLoading) => {
  setLoading(true);
  
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  
  const popup = window.open(
    '/mock-google-oauth',
    'Google Sign-In',
    `width=${width},height=${height},top=${top},left=${left}`
  );

  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return;
    
    if (event.data && event.data.type === 'OAUTH_SUCCESS' && event.data.user.provider === 'google') {
      const user = event.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      setSuccessMsg('Google Sign-In Successful! Redirecting...');
      setLoading(false);
      setTimeout(() => navigate('/dashboard'), 1000);
      window.removeEventListener('message', handleMessage);
    }
  };

  window.addEventListener('message', handleMessage);
};

export const simulateGitHubLogin = (navigate, setSuccessMsg, setLoading) => {
  setLoading(true);
  
  const width = 500;
  const height = 650;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  
  const popup = window.open(
    '/mock-github-oauth',
    'GitHub Authorization',
    `width=${width},height=${height},top=${top},left=${left}`
  );

  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return;
    
    if (event.data && event.data.type === 'OAUTH_SUCCESS' && event.data.user.provider === 'github') {
      const user = event.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      setSuccessMsg('GitHub Sign-In Successful! Redirecting...');
      setLoading(false);
      setTimeout(() => navigate('/dashboard'), 1000);
      window.removeEventListener('message', handleMessage);
    }
  };

  window.addEventListener('message', handleMessage);
};
