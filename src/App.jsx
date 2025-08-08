
 import OpeningAnimation from './App_files/OpeningAnimation';
import AdminLogin from './App_files/AdminLogin';
import OpeningAnimationScene from './App_files/OpeningAnimationScene.jsx';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Database, BarChart3, UserCheck, LogIn, UserPlus } from 'lucide-react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import DatasetExplorer from './components/Query/DatasetExplorer';
import Manual from './components/Manual';
import Datasets from './components/Datasets';
import Settings from './components/Settings';
import Users from './components/Users';
import axios from 'axios';


import * as THREE from 'three';

import './App.css';

// previously in the app.jsx


import LoginSignup from './App_files/LoginSignup';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [loading, setLoading] = useState(false);

  // Example data for the dashboard
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
  const [queryResults, setQueryResults] = useState(null);



  

  const executeQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setQueryResults([{ id: 1, state: 'Test', value: 100 }]);
      setLoading(false);
    }, 2000);
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleGuest = () => {
    setIsLoggedIn(true);
    setIsGuest(true);
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
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
      <AmbientBackground />
      {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} />}
      <div 
        className="app"
        style={{ 
          opacity: showAnimation ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: showAnimation ? 'none' : 'all',
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
        {/* Main login/signup route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainApp role={isGuest ? 'guest' : 'user'} />
            ) : (
              <LoginSignup onLogin={handleLogin} onGuest={handleGuest} onSignupSuccess={() => {}} />
            )
          }
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

        
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};


export default App;