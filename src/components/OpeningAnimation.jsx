import React, { useState, useEffect } from 'react';
import { Database, BarChart3 } from 'lucide-react';

const OpeningAnimation = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      if (onComplete) onComplete();
    }, 4000); // Animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="w-2 h-2 bg-blue-300 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl px-8">
        {/* Logo animation */}
        <div className="mb-8 animate-bounce" style={{ animationDuration: '2s' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full shadow-lg transform animate-pulse">
            <Database className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Main title with typewriter effect */}
        <div className="mb-4 overflow-hidden">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-2 animate-slide-up">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              Survey
            </span>
            <span className="inline-block animate-fade-in-up mx-4" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              API
            </span>
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
              Gateway
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Ministry of Statistics and Programme Implementation
          </p>
        </div>

        {/* Loading animation */}
        <div className="animate-fade-in" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600 animate-bounce" style={{ animationDelay: '0s' }} />
            <BarChart3 className="w-6 h-6 text-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <BarChart3 className="w-6 h-6 text-blue-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-gray-500 text-lg animate-pulse">Loading your data insights...</p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '2.5s', animationFillMode: 'both' }}>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-loading-bar"
              style={{ 
                width: '0%',
                animation: 'loading-bar 1.5s ease-in-out forwards',
                animationDelay: '2.5s'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom animations styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes loading-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OpeningAnimation;