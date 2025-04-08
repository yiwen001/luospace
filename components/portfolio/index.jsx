"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import Card from "./Card";
import "./styles.css";

const HorizontalScroll = ({ portfolio }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cylinderWidth =1800;
  const faceCount = portfolio.length;
  const radius =   cylinderWidth / (   Math.PI);
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

  // 自动旋转效果
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: 1, ease: "linear" },
      });
      rotation.set(rotation.get() - (360 / faceCount));
    }, 3000);

    return () => clearInterval(autoplayRef.current);
  }, [controls, faceCount, rotation]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 h-screen w-screen overflow-hidden gallery-container"
    >
           <div className="gallery-content">
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
              }}
            >
              <div className="w-[200px] transition-transform duration-300 hover:scale-105">
                <Card item={item} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
