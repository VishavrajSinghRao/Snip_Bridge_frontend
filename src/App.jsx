// App.jsx
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Database, BarChart3 } from 'lucide-react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import DatasetExplorer from './components/Query/DatasetExplorer';
import Manual from './components/Manual';
import Datasets from './components/Datasets';
import Settings from './components/Settings';
import Users from './components/Users';

// three.js imports
import * as THREE from 'three';

import './App.css';

// three.js Opening Animation Scene
const OpeningAnimationScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // === three.js scene setup ===
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // --- Particle System ---
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#2563eb',
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // --- Animation Loop ---
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate particles
      particleSystem.rotation.y = elapsedTime * 0.1;
      particleSystem.rotation.x = elapsedTime * 0.05;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      currentMount.removeChild(renderer.domElement);
      
      // Dispose of three.js objects to free up memory
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />;
};


// Opening Animation Component
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
      {/* three.js background init */}
      <OpeningAnimationScene />

      {/* Main content */}
      <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '900px', padding: '0 32px' }}>
        {/* Logo animation */}
        <div style={{ 
          marginBottom: '32px',
          animation: 'bounce 2s infinite'
        }}>
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

        {/* Main title with staggered animation */}
        <div style={{ marginBottom: '16px', overflow: 'hidden' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '8px',
            lineHeight: 1.1
          }}>
            <span style={{
              display: 'inline-block',
              animation: 'fadeInUp 0.8s ease-out 0.5s both'
            }}>
              Survey
            </span>
            <span style={{
              display: 'inline-block',
              margin: '0 16px',
              animation: 'fadeInUp 0.8s ease-out 0.8s both'
            }}>
              API
            </span>
            <span style={{
              display: 'inline-block',
              animation: 'fadeInUp 0.8s ease-out 1.1s both'
            }}>
              Gateway
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{ 
          marginBottom: '32px',
          animation: 'fadeIn 0.8s ease-out 1.5s both'
        }}>
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Ministry of Statistics and Programme Implementation
          </p>
        </div>

        {/* Loading animation */}
        <div style={{ animation: 'fadeIn 0.8s ease-out 2s both' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <BarChart3 style={{
              width: '24px',
              height: '24px',
              color: '#2563eb',
              animation: 'bounce 1s infinite 0s'
            }} />
            <BarChart3 style={{
              width: '24px',
              height: '24px',
              color: '#2563eb',
              animation: 'bounce 1s infinite 0.2s'
            }} />
            <BarChart3 style={{
              width: '24px',
              height: '24px',
              color: '#2563eb',
              animation: 'bounce 1s infinite 0.4s'
            }} />
          </div>
          <p style={{
            color: '#6b7280',
            fontSize: '18px',
            animation: 'pulse 1s infinite'
          }}>
            Loading your data insights...
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ 
          marginTop: '32px',
          animation: 'fadeIn 0.8s ease-out 2.5s both'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '384px',
            margin: '0 auto',
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
              borderRadius: '9999px',
              width: '0%',
              animation: 'loadingBar 1.5s ease-in-out 2.5s forwards'
            }} />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -20px, 0);
          }
          70% {
            transform: translate3d(0, -10px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};


// Admin Login Component - Only for /admin route
const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    if (email === 'admin@gmail.com' && password === '1234') {
      onAdminLogin();
    } else {
      setError('Invalid admin credentials. Please check your email and password.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="login-subtitle">Ministry of Statistics and Programme Implementation</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
            required
            autoComplete="current-password"
          />
          {error && <p className="login-error" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{error}</p>}
          <button type="submit" className="login-button">
            Login as Admin
          </button>
        </form>
        
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          <p><strong>Admin Test Credentials:</strong></p>
          <p>Email: admin@gmail.com</p>
          <p>Password: 1234</p>
        </div>
        
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Main Website
          </a>
        </div>
      </div>
    </div>
  );
};

// three.js Ambient Background Component
const AmbientBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // === Scene, Camera, Renderer ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // === Particle System ===
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: '#a5b4fc',
        });
        const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleSystem);

        // === Mouse Interaction ===
        const mouse = new THREE.Vector2();
        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        // === Animation Loop ===
        let frameId;
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            
            // Subtle parallax effect
            camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            // Slow rotation
            particleSystem.rotation.y = elapsedTime * 0.02;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // === Resize Handler ===
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // === Cleanup ===
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(frameId);
            currentMount.removeChild(renderer.domElement);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  const dashboardStats = { totalQueries: 125670, activeDatasets: 24, totalUsers: 342, systemUptime: '99.8%' };
  const apiUsageData = [
    { month: 'Jan', queries: 8500, users: 120 },
    { month: 'Feb', queries: 9200, users: 135 },
    { month: 'Mar', queries: 7800, users: 115 },
    { month: 'Apr', queries: 10500, users: 150 },
    { month: 'May', queries: 11200, users: 165 },
    { month: 'Jun', queries: 9800, users: 140 }
  ];

  const queries = [
    { id: 1, query: 'SELECT * FROM plfs WHERE ...', dataset: 'PLFS 2023-24', timestamp: '2024-01-25 14:30', resultCount: 1250 },
    { id: 2, query: 'SELECT ...', dataset: 'NSS Consumer Expenditure', timestamp: '2024-01-25 13:45', resultCount: 36 },
  ];

  const [datasets] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState(null);

  const executeQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setQueryResults([{ id: 1, state: 'Test', value: 100 }]);
      setLoading(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            dashboardStats={dashboardStats}
            apiUsageData={isAdmin ? apiUsageData : null}
            queries={queries}
          />
        );
      case 'query':
        return (
          <DatasetExplorer
            currentQuery={currentQuery}
            setCurrentQuery={setCurrentQuery}
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
            datasets={datasets}
            loading={loading}
            executeQuery={executeQuery}
            queryResults={queryResults}
            queries={queries}
          />
        );
      case 'datasets':
        return <Datasets />;
      case 'users':
        return isAdmin ? <Users /> : null;
      case 'settings':
        return <Settings />;
      case 'Manual':
        return <Manual />;
      default:
        return <Dashboard dashboardStats={dashboardStats} apiUsageData={apiUsageData} queries={queries} />;
    }
  };

  // Main App Layout Component
  const MainApp = ({ role }) => (
    <>
      {/* three.js ambient background is now active for the main app */}
      <AmbientBackground />
      {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} />}
      <div 
        className="app"
        style={{ 
          opacity: showAnimation ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: showAnimation ? 'none' : 'all',
          // Ensure the app background is transparent to see the canvas
          background: 'transparent'
        }}
      >
        <Header />
        <div className="app-body">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
          <main className="main-content">{renderContent()}</main>
        </div>
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Default Route - Direct access to main website (no login required) */}
        <Route
          path="/"
          element={<MainApp role="user" />}
        />

        {/* Admin Login Route */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <MainApp role="admin" />
            ) : (
              <AdminLogin onAdminLogin={handleAdminLogin} />
            )
          }
        />

        {/* Catch all - redirect to home */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;





















































// // App.jsx
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Database, BarChart3 } from 'lucide-react';
// import Header from './components/Header.jsx';
// import Sidebar from './components/Sidebar.jsx';
// import Dashboard from './components/Dashboard/Dashboard';
// import DatasetExplorer from './components/Query/DatasetExplorer';
// import Manual from './components/Manual';
// import Datasets from './components/Datasets';
// import Settings from './components/Settings';
// import Users from './components/Users';

// import './App.css';

// // Opening Animation Component
// const OpeningAnimation = ({ onComplete }) => {
//   const [showAnimation, setShowAnimation] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowAnimation(false);
//       if (onComplete) onComplete();
//     }, 4000); // Animation duration

//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   if (!showAnimation) return null;

//   return (
//     <div style={{
//       position: 'fixed',
//       inset: 0,
//       zIndex: 9999,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
//       overflow: 'hidden'
//     }}>
//       {/* Background particles */}
//       <div style={{ position: 'absolute', inset: 0 }}>
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             style={{
//               position: 'absolute',
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: '8px',
//               height: '8px',
//               backgroundColor: '#93c5fd',
//               borderRadius: '50%',
//               opacity: 0.3,
//               animation: `pulse 2s infinite ${Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Main content */}
//       <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '900px', padding: '0 32px' }}>
//         {/* Logo animation */}
//         <div style={{ 
//           marginBottom: '32px',
//           animation: 'bounce 2s infinite'
//         }}>
//           <div style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '80px',
//             height: '80px',
//             backgroundColor: '#2563eb',
//             borderRadius: '50%',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//             animation: 'pulse 2s infinite'
//           }}>
//             <Database style={{ width: '40px', height: '40px', color: 'white' }} />
//           </div>
//         </div>

//         {/* Main title with staggered animation */}
//         <div style={{ marginBottom: '16px', overflow: 'hidden' }}>
//           <h1 style={{
//             fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
//             fontWeight: '700',
//             color: '#1f2937',
//             marginBottom: '8px',
//             lineHeight: 1.1
//           }}>
//             <span style={{
//               display: 'inline-block',
//               animation: 'fadeInUp 0.8s ease-out 0.5s both'
//             }}>
//               Survey
//             </span>
//             <span style={{
//               display: 'inline-block',
//               margin: '0 16px',
//               animation: 'fadeInUp 0.8s ease-out 0.8s both'
//             }}>
//               API
//             </span>
//             <span style={{
//               display: 'inline-block',
//               animation: 'fadeInUp 0.8s ease-out 1.1s both'
//             }}>
//               Gateway
//             </span>
//           </h1>
//         </div>

//         {/* Subtitle */}
//         <div style={{ 
//           marginBottom: '32px',
//           animation: 'fadeIn 0.8s ease-out 1.5s both'
//         }}>
//           <p style={{
//             fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
//             color: '#6b7280',
//             fontWeight: '500'
//           }}>
//             Ministry of Statistics and Programme Implementation
//           </p>
//         </div>

//         {/* Loading animation */}
//         <div style={{ animation: 'fadeIn 0.8s ease-out 2s both' }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '8px',
//             marginBottom: '24px'
//           }}>
//             <BarChart3 style={{
//               width: '24px',
//               height: '24px',
//               color: '#2563eb',
//               animation: 'bounce 1s infinite 0s'
//             }} />
//             <BarChart3 style={{
//               width: '24px',
//               height: '24px',
//               color: '#2563eb',
//               animation: 'bounce 1s infinite 0.2s'
//             }} />
//             <BarChart3 style={{
//               width: '24px',
//               height: '24px',
//               color: '#2563eb',
//               animation: 'bounce 1s infinite 0.4s'
//             }} />
//           </div>
//           <p style={{
//             color: '#6b7280',
//             fontSize: '18px',
//             animation: 'pulse 1s infinite'
//           }}>
//             Loading your data insights...
//           </p>
//         </div>

//         {/* Progress bar */}
//         <div style={{ 
//           marginTop: '32px',
//           animation: 'fadeIn 0.8s ease-out 2.5s both'
//         }}>
//           <div style={{
//             width: '100%',
//             maxWidth: '384px',
//             margin: '0 auto',
//             backgroundColor: '#e5e7eb',
//             borderRadius: '9999px',
//             height: '8px',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               height: '100%',
//               background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
//               borderRadius: '9999px',
//               width: '0%',
//               animation: 'loadingBar 1.5s ease-in-out 2.5s forwards'
//             }} />
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes loadingBar {
//           from { width: 0%; }
//           to { width: 100%; }
//         }

//         @keyframes bounce {
//           0%, 20%, 53%, 80%, 100% {
//             transform: translate3d(0, 0, 0);
//           }
//           40%, 43% {
//             transform: translate3d(0, -20px, 0);
//           }
//           70% {
//             transform: translate3d(0, -10px, 0);
//           }
//           90% {
//             transform: translate3d(0, -4px, 0);
//           }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Admin Login Component - Only for /admin route
// const AdminLogin = ({ onAdminLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
    
//     if (email === 'admin@gmail.com' && password === '1234') {
//       onAdminLogin();
//     } else {
//       setError('Invalid admin credentials. Please check your email and password.');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleLogin(e);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-card">
//         <h2>Admin Login</h2>
//         <p className="login-subtitle">Ministry of Statistics and Programme Implementation</p>
        
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Admin email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="login-input"
//             required
//             autoComplete="email"
//           />
//           <input
//             type="password"
//             placeholder="Admin password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="login-input"
//             required
//             autoComplete="current-password"
//           />
//           {error && <p className="login-error" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{error}</p>}
//           <button type="submit" className="login-button">
//             Login as Admin
//           </button>
//         </form>
        
//         <div style={{ marginTop: '15px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
//           <p><strong>Admin Test Credentials:</strong></p>
//           <p>Email: admin@gmail.com</p>
//           <p>Password: 1234</p>
//         </div>
        
//         <div style={{ marginTop: '10px', textAlign: 'center' }}>
//           <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
//             ← Back to Main Website
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [showAnimation, setShowAnimation] = useState(true);

//   const handleAdminLogin = () => {
//     setIsAdmin(true);
//   };

//   const handleAnimationComplete = () => {
//     setShowAnimation(false);
//   };

//   const dashboardStats = { totalQueries: 125670, activeDatasets: 24, totalUsers: 342, systemUptime: '99.8%' };
//   const apiUsageData = [
//     { month: 'Jan', queries: 8500, users: 120 },
//     { month: 'Feb', queries: 9200, users: 135 },
//     { month: 'Mar', queries: 7800, users: 115 },
//     { month: 'Apr', queries: 10500, users: 150 },
//     { month: 'May', queries: 11200, users: 165 },
//     { month: 'Jun', queries: 9800, users: 140 }
//   ];

//   const queries = [
//     { id: 1, query: 'SELECT * FROM plfs WHERE ...', dataset: 'PLFS 2023-24', timestamp: '2024-01-25 14:30', resultCount: 1250 },
//     { id: 2, query: 'SELECT ...', dataset: 'NSS Consumer Expenditure', timestamp: '2024-01-25 13:45', resultCount: 36 },
//   ];

//   const [datasets] = useState([]);
//   const [currentQuery, setCurrentQuery] = useState('');
//   const [selectedDataset, setSelectedDataset] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [queryResults, setQueryResults] = useState(null);

//   const executeQuery = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setQueryResults([{ id: 1, state: 'Test', value: 100 }]);
//       setLoading(false);
//     }, 2000);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return (
//           <Dashboard
//             dashboardStats={dashboardStats}
//             apiUsageData={isAdmin ? apiUsageData : null}
//             queries={queries}
//           />
//         );
//       case 'query':
//         return (
//           <DatasetExplorer
//             currentQuery={currentQuery}
//             setCurrentQuery={setCurrentQuery}
//             selectedDataset={selectedDataset}
//             setSelectedDataset={setSelectedDataset}
//             datasets={datasets}
//             loading={loading}
//             executeQuery={executeQuery}
//             queryResults={queryResults}
//             queries={queries}
//           />
//         );
//       case 'datasets':
//         return <Datasets />;
//       case 'users':
//         return isAdmin ? <Users /> : null;
//       case 'settings':
//         return <Settings />;
//       case 'Manual':
//         return <Manual />;
//       default:
//         return <Dashboard dashboardStats={dashboardStats} apiUsageData={apiUsageData} queries={queries} />;
//     }
//   };

//   // Main App Layout Component
//   const MainApp = ({ role }) => (
//     <>
//       {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} />}
//       <div 
//         className="app"
//         style={{ 
//           opacity: showAnimation ? 0 : 1, 
//           transition: 'opacity 0.5s ease-in-out',
//           pointerEvents: showAnimation ? 'none' : 'all'
//         }}
//       >
//         <Header />
//         <div className="app-body">
//           <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
//           <main className="main-content">{renderContent()}</main>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <Router>
//       <Routes>
//         {/* Default Route - Direct access to main website (no login required) */}
//         <Route
//           path="/"
//           element={<MainApp role="user" />}
//         />

//         {/* Admin Login Route */}
//         <Route
//           path="/admin"
//           element={
//             isAdmin ? (
//               <MainApp role="admin" />
//             ) : (
//               <AdminLogin onAdminLogin={handleAdminLogin} />
//             )
//           }
//         />

//         {/* Catch all - redirect to home */}
//         <Route
//           path="*"
//           element={<Navigate to="/" />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;