import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Upload, Eye, EyeOff, ChevronDown, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { simulateGoogleLogin, simulateGitHubLogin } from '../utils/oauth';

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: 'PK',
    timeZone: 'Asia/Karachi'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("File size must be under 5MB");
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg("Please fill in Name, Email and Password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    if (!agreed) {
      setErrorMsg("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          profilePicture
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccessMsg('Register successfully');
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      // Fallback local save if server isn't reachable
      const fallbackUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        username: formData.username,
        profilePicture
      };
      localStorage.setItem('user', JSON.stringify(fallbackUser));
      setSuccessMsg('Register successfully');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8 sm:p-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-tight">
            MeetVerse
          </h1>
          <p className="text-gray-400 text-lg">Create Your Account</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name *</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="@johndoe" 
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address *</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone Number (Optional)</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900" 
                className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password *</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Confirm Password *</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Country</label>
              <div className="relative">
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 cursor-pointer"
                >
                  <option value="PK">Pakistan</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Time Zone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Time Zone</label>
              <div className="relative">
                <select 
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 cursor-pointer"
                >
                  <option value="Asia/Karachi">Asia/Karachi</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Profile Picture Upload Section */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-gray-300">Profile Picture</label>
            
            {/* Hidden Input File */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoChange} 
              accept="image/*" 
              className="hidden" 
            />

            <div 
              onClick={handlePhotoClick}
              className="flex items-center gap-4 p-4 border border-dashed border-gray-700 rounded-xl bg-dark/30 hover:bg-dark/50 hover:border-primary/50 transition-all cursor-pointer group"
            >
              {profilePicture ? (
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary shrink-0 shadow-md">
                  <img src={profilePicture} alt="Avatar Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <Camera size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              )}
              
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  {fileName ? fileName : 'Upload Image'}
                </p>
                <p className="text-xs text-gray-500">
                  {profilePicture ? 'Click to change photo' : 'JPG, PNG or GIF (Max 5MB)'}
                </p>
              </div>
              
              <Upload size={20} className="text-gray-500 group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ${agreed ? 'bg-primary border-primary' : 'bg-dark/50 border-gray-700 hover:border-gray-500'}`}
            >
              {agreed && <Check size={14} className="text-white" />}
            </button>
            <span className="text-sm text-gray-400 select-none cursor-pointer" onClick={() => setAgreed(!agreed)}>
              I agree to the <a href="#" className="text-primary hover:text-blue-400 hover:underline transition-colors" onClick={(e)=>e.stopPropagation()}>Terms & Conditions</a>
            </span>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
            {googleLoading ? 'Connecting...' : 'Sign up with Google'}
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
            {githubLoading ? 'Connecting...' : 'Sign up with GitHub'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-blue-400 font-medium hover:underline transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
