"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import Image from "next/image";
import { getImageInfo } from "@/lib/sanity/utils";
import Link from "next/link";
import DecryptedText from "./DecryptedText";
import "./styles.css";

const HorizontalScroll = ({ portfolio }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [descriptionOpacity, setDescriptionOpacity] = useState(1);

  // Adjust dimensions for better 3D ring effect
  const faceCount = portfolio.length;
  const radius = 800; // Fixed radius for better control
  const dragFactor = 0.1; // Increased for more responsive dragging

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
      
      // Calculate opacity based on how centered the current item is
      const angleFromCenter = Math.abs(currentRotation - (index * itemAngle));
      const maxAngle = itemAngle / 2; // Half the angle between items
      const opacity = Math.max(0, 1 - (angleFromCenter / maxAngle));
      
      setCurrentIndex(index);
      setDescriptionOpacity(opacity);
    };

    // Subscribe to rotation changes
    const unsubscribe = rotation.onChange(calculateCurrentIndex);
    return unsubscribe;
  }, [rotation, faceCount]);

  // 自动旋转效果 - Continuous rotation with visible back side
  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    let currentRotation = rotation.get();
    const rotationSpeed = 8; // Slightly faster rotation

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

    // Pause animation on user interaction
    const handleUserInteraction = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const trackElement = cardsRef.current;
    if (trackElement) {
      trackElement.addEventListener('mousedown', handleUserInteraction);
      trackElement.addEventListener('touchstart', handleUserInteraction);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (trackElement) {
        trackElement.removeEventListener('mousedown', handleUserInteraction);
        trackElement.removeEventListener('touchstart', handleUserInteraction);
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
                width: '500px',
                height: '240px',
                opacity: 1 // Always visible
              }}
            >
              <div className="image-container transition-transform duration-300 hover:scale-105">
                {/* Only show the image part of the card */}
                <div className="image-only" style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {item.cover && (
                    <div className="relative w-full h-full film-frame">
                      <Image 
                        src={getImageInfo(item.cover).imgUrl}
                        alt={item.title}
                        fill
                        className="gallery-image"
                        style={{ borderRadius: 0, objectFit: 'cover', opacity: 0.9 }} // Slightly transparent for better 3D effect
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

  