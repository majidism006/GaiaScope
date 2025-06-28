import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function LandingGlobe() {
  const globeRef = useRef();
  // Load Earth texture
  const earthMap = useLoader(THREE.TextureLoader, '/image.jpg');

  // Create sphere geometry with rotation
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  sphereGeometry.rotateY(Math.PI);

  // Slow rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh geometry={sphereGeometry}>
        <meshStandardMaterial map={earthMap} />
      </mesh>
    </group>
  );
}

const LandingPage = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 animate-pulse" style={{ animationDuration: '4s' }}></div>
      
      {/* Background stars */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 3, 5]} intensity={0.3} />
          <Stars radius={20} depth={100} count={1500} factor={1} fade />
        </Canvas>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          backgroundSize: '100px 100px, 150px 150px',
          animation: 'pulse 3s ease-in-out infinite alternate'
        }}></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Title with enhanced animations */}
        <h1 className={`text-6xl md:text-8xl font-bold text-white mb-8 tracking-wider transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
            GaiaScope
          </span>
        </h1>
        
        {/* Subtitle with staggered animation */}
        <p className={`text-xl md:text-2xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Explore the world through the lens of sustainable development. 
          Discover SDGs, pollution data, and climate insights across the globe.
        </p>

        {/* Enhanced Start Button */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <button
            onClick={onStart}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xl font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-800"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Exploring
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${buttonHovered ? 'translate-x-1' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>
        </div>
      </div>

      {/* Enhanced Rotating Earth */}
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 md:w-[500px] md:h-[500px] opacity-90 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-90 scale-100' : 'opacity-0 scale-95'}`}>
        <Canvas camera={{ position: [0, 0, 2.5] }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 3, 5]} intensity={0.8} />
          <LandingGlobe />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              animation: 'float 6s ease-in-out infinite'
            }}
          />
        ))}
      </div>

      {/* Additional animated elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-blue-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-20 right-20 w-16 h-16 border border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 border border-pink-400/30 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>

      {/* Pulse rings around the globe */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 md:w-[500px] md:h-[500px] pointer-events-none">
        <div className="absolute inset-0 border border-blue-400/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-0 border border-purple-400/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 border border-pink-400/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default LandingPage; 