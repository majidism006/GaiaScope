import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Shape, Vector2, Vector3 } from 'three';

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

function CountryBorders({ geojson }) {
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

function latLngToVector3(lng, lat, radius = 1.011) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (-lng - 90) * (Math.PI / 180);
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function projectShapeToSphere(shape, radius = 1.011) {
  // Project each point of the shape onto the sphere
  const points = shape.getPoints();
  return points.map(pt => {
    // pt is Vector2 (lng, lat)
    return latLngToVector3(pt.x, pt.y, radius);
  });
}

function CountryMeshes({ geojson }) {
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
      // Convert polygon to Shape in [lng, lat] space
      const shape = new Shape(poly[0].map(([lng, lat]) => new Vector2(lng, lat)));
      // Triangulate shape in 2D
      const geometry2D = new THREE.ShapeGeometry(shape);
      // Project 2D vertices to sphere
      const posAttr = geometry2D.getAttribute('position');
      const positions = [];
      for (let j = 0; j < posAttr.count; j++) {
        const lng = posAttr.getX(j);
        const lat = posAttr.getY(j);
        const v3 = latLngToVector3(lng, lat, 1.011);
        positions.push(v3.x, v3.y, v3.z);
      }
      // Create new BufferGeometry with projected positions
      const geometry3D = new THREE.BufferGeometry();
      geometry3D.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry3D.setIndex(geometry2D.getIndex());
      return (
        <mesh
          key={idx + '-' + i}
          geometry={geometry3D}
          // onClick and onPointerOver removed to disable info panel update
        >
          <meshBasicMaterial attach="material" color="#ffffff" opacity={0.01} transparent />
        </mesh>
      );
    });
  });
}

function getPolygonCentroid(polygon) {
  // polygon: array of [lng, lat]
  let x = 0, y = 0, z = 0;
  polygon.forEach(([lng, lat]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (-lng - 90) * (Math.PI / 180);
    x += Math.sin(phi) * Math.cos(theta);
    y += Math.cos(phi);
    z += Math.sin(phi) * Math.sin(theta);
  });
  const total = polygon.length;
  x /= total; y /= total; z /= total;
  // Normalize
  const len = Math.sqrt(x*x + y*y + z*z);
  return [x/len, y/len, z/len];
}

function animateCameraTo(camera, target, duration = 2000) {
  const start = new Vector3(camera.position.x, camera.position.y, camera.position.z);
  const end = new Vector3(target[0], target[1], target[2]);
  const radius = start.length();
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    // Ease in-out
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    // Slerp between start and end
    const slerped = start.clone().normalize().lerp(end.clone().normalize(), ease).normalize().multiplyScalar(radius);
    camera.position.set(slerped.x, slerped.y, slerped.z);
    camera.lookAt(0, 0, 0);
    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

function RotatingGlobe({ onCountrySelect, mode, searchedCountry }) {
  const globeRef = useRef();
  const { camera } = useThree();

  const getTexturePath = (mode) => {
    switch (mode) {
      case 'pollution':
        return '/pollution.jpg';
      case 'climate':
        return '/climate.jpg';
      case 'sdg':
        return '/sdj.jpg';
      default:
        return '/earth.jpg';
    }
  };

  // Load Earth texture
  const earthMap = useLoader(THREE.TextureLoader, getTexturePath(mode));
  const geojson = useGeoJson('/countries.geojson');

  // Create sphere geometry WITH 90-degree rotation
  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  sphereGeometry.rotateY(Math.PI/2); // Rotate -90 degrees around Y-axis

  // Animate camera to searched country
  useEffect(() => {
    if (!searchedCountry || !geojson) return;
    const feature = geojson.features.find(f => f.properties.name.toLowerCase() === searchedCountry.toLowerCase());
    if (!feature) return;
    // Get centroid of first polygon
    const coords = feature.geometry.type === 'Polygon' ? feature.geometry.coordinates[0] : feature.geometry.coordinates[0][0];
    const [x, y, z] = getPolygonCentroid(coords);
    // Use current camera distance from origin
    const camDist = camera.position.length();
    const newPos = [x * camDist, y * camDist, z * camDist];
    animateCameraTo(camera, newPos, 2000);
  }, [searchedCountry, geojson, camera]);

  return (
    <group ref={globeRef}>
      {/* Earth sphere with geometry to align texture with borders */}
      <mesh geometry={sphereGeometry}>
        <meshStandardMaterial map={earthMap} />
      </mesh>
      {/* Country meshes for accurate click/hover detection */}
      {geojson && <CountryMeshes geojson={geojson} />}
      {/* Country borders */}
      {geojson && <CountryBorders geojson={geojson} />}
    </group>
  );
}

const GlobeView = ({ onCountrySelect, mode, searchedCountry }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 3, 5]} intensity={0.7} />
        <RotatingGlobe onCountrySelect={onCountrySelect} mode={mode} searchedCountry={searchedCountry} />
        <Stars radius={10} depth={50} count={500} factor={0.5} fade />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default GlobeView;
