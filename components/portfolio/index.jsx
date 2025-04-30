"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import Image from "next/image";
import { getImageInfo } from "@/lib/sanity/utils";
import Link from "next/link";
import DecryptedText from "./DecryptedText";
import "./styles.css";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, DoubleSide, LinearFilter } from 'three';
import * as THREE from 'three';
import { OrbitControls, Environment } from "@react-three/drei";
import Sphere from "../sphere/ShaderSphere";

// 不需要创建备用纹理，直接使用图片

// 圆环上的曲面图片组件
const CurvedImage = ({ imageUrl, index, totalItems, radius, width, height }) => {
  const meshRef = useRef();
  
  // 直接使用useLoader加载图片纹理
  const texture = useLoader(TextureLoader, imageUrl);
  
  // 设置纹理属性
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  
  // 计算此图片在圆环上的位置
  const angle = (index / totalItems) * Math.PI * 2;
  const segmentAngle = (1 / totalItems) * Math.PI*1.5  ;
  
  // 创建一个弧形平面几何体
  const geometry = useMemo(() => {
    // 分段数 - 越高越平滑
    const segments = 32;
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    const uvs = [];
    const indices = [];
    
    // 创建环形的一个扇段
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        // UV 坐标 (0-1范围内)
        const u = i / segments;
        const v = j / segments;
        
        // 计算在圆环上的位置
        // u 控制围绕圆环的位置
        // v 控制垂直位置
        const theta = angle - segmentAngle/2 + u * segmentAngle;
        const y = (v - 0.5) * height;  // 图片高度
        
        // 圆环坐标
        const x = radius * Math.sin(theta);
        const z = radius * Math.cos(theta);
        
        // 添加顶点和UV
        vertices.push(x, y, z);
        uvs.push(u, v);
        
        // 创建面（两个三角形形成一个矩形）
        if (i < segments && j < segments) {
          const a = i * (segments + 1) + j;
          const b = a + 1;
          const c = a + (segments + 1);
          const d = c + 1;
          
          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }
    }
    
    // 设置几何体的属性
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    
    return geo;
  }, [angle, segmentAngle, radius, height]);
  
  // 动画效果
  useFrame((state) => {
    if (meshRef.current) {
      // 这里可以添加悬停、选中等交互效果
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial 
        map={texture} 
        side={DoubleSide}
        transparent={true}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

// 整个画廊组件
const GalleryRing = ({ portfolio, setCurrentIndex }) => {
  const { camera } = useThree();
  const groupRef = useRef();
  const totalItems = portfolio.length;
  
  // 设置相机初始位置
  useEffect(() => {
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // 旋转动画和检测当前项
  useFrame((state) => {
    if (groupRef.current) {
      // 缓慢自动旋转
      groupRef.current.rotation.y += 0.001;
      
      // 计算当前显示的项目索引
      const currentAngle = groupRef.current.rotation.y;
      const normalizedAngle = ((currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const itemAngle = (Math.PI * 2) / totalItems;
      const index = Math.floor(normalizedAngle / itemAngle) % totalItems;
      setCurrentIndex((totalItems - index) % totalItems); // 反向，因为旋转和索引方向相反
    }
  });
  
  return (
    <group ref={groupRef}>
      {portfolio.map((item, i) => {
        // 使用本地图片代替Sanity图片
        // 使用索引+1来匹配文件名 1.png, 2.png, ..., 9.png
        const imageIndex = (i % 9) + 1; // 如果超过9张图片，循环使用
        const imageUrl = `/${imageIndex}.png`;
        
        // 打印URL以便于调试
        console.log('Loading local image:', imageUrl);
        
        return (
          <Suspense key={item.slug} fallback={null}>
            <CurvedImage 
              key={item.slug}
              imageUrl={imageUrl}
              index={i}
              totalItems={totalItems}
              radius={6}  // 圆环半径
              width={4}   // 图片宽度
              height={2}  // 图片高度
            />
          </Suspense>
        );
      })}
    </group>
  );
};

const HorizontalScroll = ({ portfolio }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rotation = useMotionValue(0);
  
  // 监听旋转变化来更新当前索引
  useEffect(() => {
    const unsubscribe = rotation.onChange(value => {
      const normalizedValue = ((value % 360) + 360) % 360;
      const itemAngle = 360 / portfolio.length;
      const index = Math.round(normalizedValue / itemAngle) % portfolio.length;
      setCurrentIndex(index);
    });
    return unsubscribe;
  }, [rotation, portfolio.length]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 h-screen w-screen overflow-hidden gallery-container"
    >
      <div className="gallery-content">
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 45 }}
          className="gallery-canvas"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Suspense fallback={null}>
                  {/* Sphere in the exact center */}
                  <group scale={1} position={[0, 0, 0]}>
              <Sphere />
            </group>
            <GalleryRing portfolio={portfolio} setCurrentIndex={setCurrentIndex} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 2} 
            maxPolarAngle={Math.PI / 2}
            onChange={(e) => {
              // 当用户旋转时，更新rotation值
              if (e.target) {
                const angle = e.target.getAzimuthalAngle() * (180 / Math.PI);
                rotation.set(angle);
              }
            }}
          />
        </Canvas>
        
        {/* 说明文本区域 */}
        <div className="description-container">
          {portfolio.map((item, i) => (
            <div 
              key={`desc-${item.slug}`}
              className="item-description"
              style={{
                opacity: i === currentIndex ? 1 : 0
              }}
            >
              <h2 className="item-title">
                <DecryptedText 
                  text={item.title}
                  speed={60}
                  maxIterations={20}
                  animateOn="view"
                  key={`title-${item.slug}-${i === currentIndex}`}
                />
              </h2>
              <p className="item-text">
                {item.description ? (
                  <DecryptedText 
                    text={item.description}
                    speed={60}
                    maxIterations={20}
                    animateOn="view"
                    key={`desc-${item.slug}-${i === currentIndex}`}
                  />
                ) : (
                  <DecryptedText 
                    text="View this project for more details"
                    speed={60}
                    maxIterations={20}
                    animateOn="view"
                    key={`default-${item.slug}-${i === currentIndex}`}
                  />
                )}
              </p>
              <Link href={`/portfolio/${item.slug}`} className="view-more-btn">
                <DecryptedText 
                  text="View Project"
                  speed={60}
                  maxIterations={20}
                  animateOn="view"
                  key={`btn-${item.slug}-${i === currentIndex}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;

  