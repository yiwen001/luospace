"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Sphere from "../sphere/ShaderSphere";

// Static elliptical orbit component
function EllipticalOrbit() {
  const orbitRef = useRef();
  
  useEffect(() => {
    // Set initial rotation to 45 degrees on the x-axis
    if (orbitRef.current) {
      orbitRef.current.rotation.x = Math.PI / 4; // 45 degrees in radians
    }
  }, []);

  return (
    <group ref={orbitRef} position={[0.55, -0.3, 0]}>
      {/* Create a static elliptical orbit using a custom curve */}
      <EllipticalLine 
        radiusX={5 } 
        radiusY={2.5} 
        segments={200} 
        lineWidth={1.5} 
        color="#808080" 
      />
      {/* Add objects that will move along the orbit */}
      <OrbitingObjects 
        radiusX={5.5} 
        radiusY={2.5} 
        count={3} 
      />
    </group>
  );
}

// Custom component to create an elliptical line
function EllipticalLine({ radiusX, radiusY, segments, lineWidth, color }) {
  const lineRef = useRef();
  
  useEffect(() => {
    if (lineRef.current) {
      // Create an elliptical curve
      const curve = new THREE.EllipseCurve(
        0, 0,             // Center x, y
        radiusX, radiusY, // x radius, y radius
        0, 2 * Math.PI,   // Start angle, end angle
        false,            // Clockwise
        0                 // Rotation
      );
      
      // Get points from the curve
      const points = curve.getPoints(segments);
      
      // Convert 2D points to 3D
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map(point => new THREE.Vector3(point.x, point.y, 0))
      );
      
      // Update the line geometry
      lineRef.current.geometry = geometry;
    }
  }, [radiusX, radiusY, segments]);

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} linewidth={lineWidth} />  
    </line>
  );
}

// Component for objects that orbit along the elliptical path
function OrbitingObjects({ radiusX, radiusY, count }) {
  const objectRefs = useRef([]);
  
  // Create a curve to calculate positions
  const curve = new THREE.EllipseCurve(
    0, 0,             // Center x, y
    radiusX, radiusY, // x radius, y radius
    0, 2 * Math.PI,   // Start angle, end angle
    false,            // Clockwise
    0                 // Rotation
  );
  
  // Animation for moving objects along the path
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    objectRefs.current.forEach((ref, index) => {
      if (ref) {
        // Calculate position offset for each object
        const offset = (index / count) * Math.PI * 2;
        const t = (time * 0.2 + offset) % 1;
        
        // Get position on the curve
        const point = curve.getPoint(t);
        
        // Update object position
        ref.position.x = point.x;
        ref.position.y = point.y;
      }
    });
  });
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <mesh 
          key={index}
          ref={(el) => (objectRefs.current[index] = el)}
          position={[0, 0, 0]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#333333" />
        </mesh>
      ))}
    </>
  );
}

// // Camera control component for smooth movement
// function CameraRig() {
//   const { camera } = useThree();
//   const mousePosition = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (e) => {
//       mousePosition.current = {
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: -(e.clientY / window.innerHeight) * 2 + 1
//       };
//     };

//     window.addEventListener('mousemove', updateMousePosition);
//     return () => window.removeEventListener('mousemove', updateMousePosition);
//   }, []);

//   useFrame(() => {
//     // Base camera position
//     const basePosition = new THREE.Vector3(-3, 2, 5);
    
//     // Add subtle movement based on mouse position
//     const targetPosition = basePosition.clone().add(
//       new THREE.Vector3(
//         mousePosition.current.x * 0.3,
//         mousePosition.current.y * 0.3,
//         0
//       )
//     );
    
//     // Smooth camera movement
//     camera.position.lerp(targetPosition, 0.05);
//     camera.lookAt(0, 0, 0);
//   });

//   return null;
// }

const Index = () => {
  return (
    <div className="orbit-container" style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      <Canvas camera={{ position: [-2, 2, 5], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <group 
          position={[0, 0.3, 0]} 
          scale={0.5}
          rotation={[-Math.PI / 4, 0, 0]} // -45 degrees around z-axis
        >
          <Sphere />
        </group>
        <EllipticalOrbit />
        {/* <CameraRig /> */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Index;