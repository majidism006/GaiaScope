import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Helper to load GeoJSON
function useGeoJson(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error loading GeoJSON:', err));
  }, [url]);
  return data;
}

function CountryBorders({ geojson, onCountrySelect }) {
  if (!geojson || !geojson.features) return null;
  
  return geojson.features.map((feature, idx) => {
    const coords = feature.geometry.coordinates;
    const type = feature.geometry.type;
    const countryName = feature.properties.name;
    const countryCode = feature.properties.ISO_A2;
    
    // MultiPolygon or Polygon
    const polygons = type === 'Polygon' ? [coords] : coords;
    
    return polygons.map((poly, i) => {
      if (!poly || !poly[0]) return null;
      
      const positions = poly[0].flatMap(([lng, lat]) => {
        // Convert [lng, lat] to 3D sphere coords
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (-lng - 90) * (Math.PI / 180);
        const r = 1.01; // slightly above sphere
        return [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ];
      });

      return (
        <lineSegments
          key={idx + '-' + i}
          onClick={e => {
            e.stopPropagation();
            onCountrySelect && onCountrySelect({ name: countryName, code: countryCode });
          }}
        >
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={new Float32Array(positions)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#00ffcc" linewidth={1} />
        </lineSegments>
      );
    });
  });
}

function RotatingGlobe({ onCountrySelect, mode }) {
  const globeRef = useRef();
  // Get texture based on mode
  const getTexturePath = (mode) => {
    switch (mode) {
      case 'pollution':
        return '/pollution.jpg';
      case 'climate':
        return '/climate.jpg';
      case 'sdg':
        return '/sdj.jpg';
      default:
        return '/earth.jpg'; // Base mode
    }
  };
  
  // Load Earth texture based on mode
  const earthMap = useLoader(THREE.TextureLoader, getTexturePath(mode));
  
  const geojson = useGeoJson('/countries.geojson');

  // Create sphere geometry WITH 180-degree rotation
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  sphereGeometry.rotateY(Math.PI/2); // Rotate -180 degrees around Y-axis

  return (
    <group ref={globeRef}>
      {/* Earth sphere with geometry to align texture with borders */}
      <mesh geometry={sphereGeometry}>
        <meshStandardMaterial map={earthMap} />
      </mesh>
      
      {/* Country borders */}
      {geojson && <CountryBorders geojson={geojson} onCountrySelect={onCountrySelect} />}
    </group>
  );
}

const GlobeView = ({ onCountrySelect, mode }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 3, 5]} intensity={0.7} />
        <RotatingGlobe onCountrySelect={onCountrySelect} mode={mode} />
        <Stars radius={10} depth={50} count={500} factor={0.5} fade />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default GlobeView;
