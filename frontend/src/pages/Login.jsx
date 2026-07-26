import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { simulateGoogleLogin, simulateGitHubLogin } from '../utils/oauth';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg("Please fill in both Email and Password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setSuccessMsg('Login successfully');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (err) {
      // If server fetch fails, allow demo login or show error
      const savedUserStr = localStorage.getItem('user');
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser.email === email) {
          setSuccessMsg('Login successfully');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
          return;
        }
      }
      setErrorMsg(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8 sm:p-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
            MeetVerse
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back to MeetVerse</h2>
          <p className="text-gray-400 text-sm">Connect, Collaborate & Communicate Securely</p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3 animate-in fade-in duration-300">
            <CheckCircle2 size={24} className="shrink-0" />
            <span className="font-semibold text-sm">{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 animate-in fade-in duration-300">
            <AlertCircle size={24} className="shrink-0" />
            <span className="font-semibold text-sm">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com" 
              className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ${rememberMe ? 'bg-primary border-primary' : 'bg-dark/50 border-gray-700 hover:border-gray-500'}`}
              >
                {rememberMe && <Check size={14} className="text-white" />}
              </button>
              <span className="text-sm text-gray-400 select-none cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                Remember Me
              </span>
            </div>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-blue-400 hover:underline transition-colors">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Social Logins */}
        <div className="flex flex-col gap-4 mb-8">
          <button 
            type="button"
            disabled={googleLoading}
            onClick={() => simulateGoogleLogin(navigate, setSuccessMsg, setGoogleLoading)}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-dark/50 border border-gray-700 hover:border-blue-500 rounded-xl text-white font-medium transition-all duration-300 hover:bg-dark/80 hover:shadow-md hover:shadow-blue-500/10 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {googleLoading ? 'Connecting...' : 'Continue with Google'}
          </button>
          <button 
            type="button"
            disabled={githubLoading}
            onClick={() => simulateGitHubLogin(navigate, setSuccessMsg, setGithubLoading)}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-dark/50 border border-gray-700 hover:border-gray-400 rounded-xl text-white font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-md hover:shadow-white/5 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            {githubLoading ? 'Connecting...' : 'Continue with GitHub'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-blue-400 font-medium hover:underline transition-colors">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
