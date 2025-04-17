"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import Image from "next/image";
import { getImageInfo } from "@/lib/sanity/utils";
import Link from "next/link";
import Card from "./Card";
import "./styles.css";

const HorizontalScroll = ({ portfolio }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cylinderWidth = 4000; // Reduced width for smaller images
  const faceCount = portfolio.length;
  const radius = cylinderWidth / ( 2* Math.PI);
  const dragFactor = 0.05;

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
    });
  };

  // Calculate current index based on rotation
  useEffect(() => {
    const calculateCurrentIndex = () => {
      // Convert rotation to positive value between 0-360
      const currentRotation = ((rotation.get() % 360) + 360) % 360;
      // Calculate which item is at the front based on rotation
      const itemAngle = 360 / faceCount;
      const index = Math.round(currentRotation / itemAngle) % faceCount;
      setCurrentIndex(index);
    };

    // Subscribe to rotation changes
    const unsubscribe = rotation.onChange(calculateCurrentIndex);
    return unsubscribe;
  }, [rotation, faceCount]);

  // 自动旋转效果
  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    let currentRotation = rotation.get();
    const rotationSpeed = 6; // degrees per second

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate continuous rotation based on time
      currentRotation = -(elapsed * rotationSpeed / 1000);
      
      // Update rotation
      rotation.set(currentRotation);
      controls.set({ rotateY: currentRotation });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [controls, rotation]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 h-screen w-screen overflow-hidden gallery-container"
    >
      <div className="gallery-content">
        {/* 3D Rotating Images */}
        <motion.div
          ref={cardsRef}
          drag="x"
          className="gallery-track"
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {portfolio.map((item, i) => (
            <div
              key={item.slug}
              className="gallery-item"
              style={{
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                width: '600px',
                height: '240px'
              }}
            >
              <div className="image-container transition-transform duration-300 hover:scale-105">
                {/* Only show the image part of the card */}
                <div className="image-only" style={{ width: '100%', height: '100%' }}>
                  {item.cover && (
                    <div className="relative w-full h-full">
                      <Image 
                        src={getImageInfo(item.cover).imgUrl}
                        alt={item.title}
                        fill
                        className="gallery-image"
                        style={{ borderRadius: 0, objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Text Description (only shown for current item) */}
        <div className="description-container">
          {portfolio.map((item, i) => (
            <div 
              key={`desc-${item.slug}`}
              className={`item-description ${i === currentIndex ? 'active' : ''}`}
            >
              <h2 className="item-title">{item.title}</h2>
              <p className="item-text">{item.description ? item.description : 'View this project for more details'}</p>
              <Link href={`/portfolio/${item.slug}`} className="view-more-btn">
                View Project
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
