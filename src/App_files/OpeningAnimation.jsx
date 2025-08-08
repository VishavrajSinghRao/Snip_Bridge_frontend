import React, { useEffect, useState } from 'react';
import { Database, BarChart3 } from 'lucide-react';
import OpeningAnimationScene from './OpeningAnimationScene';

const OpeningAnimation = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      if (onComplete) onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showAnimation) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      overflow: 'hidden'
    }}>
      <OpeningAnimationScene />
      <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '900px', padding: '0 32px' }}>
        <div style={{ marginBottom: '32px', animation: 'bounce 2s infinite' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            animation: 'pulse 2s infinite'
          }}>
            <Database style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
        </div>
        <div style={{ marginBottom: '16px', overflow: 'hidden' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px',
            lineHeight: 1.1
          }}>
            <span style={{ display: 'inline-block', animation: 'fadeInUp 0.8s ease-out 0.5s both' }}>Survey</span>
            <span style={{ display: 'inline-block', margin: '0 16px', animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>API</span>
            <span style={{ display: 'inline-block', animation: 'fadeInUp 0.8s ease-out 1.1s both' }}>Gateway</span>
          </h1>
        </div>
        <div style={{ marginBottom: '32px', animation: 'fadeIn 0.8s ease-out 1.5s both' }}>
          <p style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#6b7280', fontWeight: '500' }}>
            Ministry of Statistics and Programme Implementation
          </p>
        </div>
        <div style={{ animation: 'fadeIn 0.8s ease-out 2s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <BarChart3 style={{ width: '24px', height: '24px', color: '#2563eb', animation: 'bounce 1s infinite 0s' }} />
            <BarChart3 style={{ width: '24px', height: '24px', color: '#2563eb', animation: 'bounce 1s infinite 0.2s' }} />
            <BarChart3 style={{ width: '24px', height: '24px', color: '#2563eb', animation: 'bounce 1s infinite 0.4s' }} />
          </div>
          <p style={{ color: '#6b7280', fontSize: '18px', animation: 'pulse 1s infinite' }}>
            Loading your data insights...
          </p>
        </div>
        <div style={{ marginTop: '32px', animation: 'fadeIn 0.8s ease-out 2.5s both' }}>
          <div style={{ width: '100%', maxWidth: '384px', margin: '0 auto', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)', borderRadius: '9999px', width: '0%', animation: 'loadingBar 1.5s ease-in-out 2.5s forwards' }} />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes loadingBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
          40%, 43% { transform: translate3d(0, -20px, 0); }
          70% { transform: translate3d(0, -10px, 0); }
          90% { transform: translate3d(0, -4px, 0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default OpeningAnimation;