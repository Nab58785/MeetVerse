import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-darker flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      <div className="z-10 text-center animate-bounce">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-tight">
          MeetVerse
        </h1>
        <p className="text-gray-400 text-lg">Connect • Collaborate • Create</p>
      </div>
    </div>
  );
};

export default SplashScreen;
