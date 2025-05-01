"use client";
import { useState, useRef, useEffect } from "react";
import Experience from "@/components/sphere/Experience";
import Above from "@/components/above";
import About from "@/components/about";
import HorizontalScroll from "@/components/portfolio";
import Waves from "@/components/wavebg/Wave";
import Circle3D from "@/components/Circle3D";
export default function ClientPage({ portfolio, about }) {
  const [showWaves, setShowWaves] = useState(false);
  const aboutSectionRef = useRef(null);
  const mainRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (index) => {
    if (isScrolling) return; // Prevent multiple scroll events
    
    setIsScrolling(true);
    const sections = mainRef.current?.children;
    if (sections && sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
      setCurrentSection(index);
      
      // Reset scrolling lock after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Adjust timing to match scroll animation duration
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling) return; // Prevent scroll during animation
      
      // Only move one section at a time
      if (e.deltaY > 0 && currentSection < 3) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isScrolling]);

  useEffect(() => {
    if (!aboutSectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // 当 about 部分进入视口时显示 Waves
        if (entries[0].isIntersecting) {
          setShowWaves(true);
        } else {
          setShowWaves(false);
        }
      },
      { threshold: 0.8 } // 当 10% 的元素可见时触发
    );

    observer.observe(aboutSectionRef.current);

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);

  return (
    <main ref={mainRef} className="flex snap-x snap-mandatory overflow-x-hidden">
      
      <div className="relative w-screen h-screen flex-none snap-start">
        <div className="fixed inset-0 z-0">
          <Above />  
        </div>
        <div className="relative z-10">
          <Experience />
        </div>
      </div>

      <div className="relative w-screen h-screen flex-none snap-start">
        <HorizontalScroll portfolio={portfolio} />
      </div>

      <div className="relative w-screen h-screen flex-none snap-start">
        <Circle3D />
      </div>

      <div className="relative w-screen h-screen flex-none snap-start" ref={aboutSectionRef}>
        <div className="relative z-[10]">
          <ul>
            {about.map((item, index) => {
              return <About key={index} item={item} />;
            })}
          </ul>
        </div>
        <div className="absolute inset-0 z-[5]">
          {showWaves && <Waves  waveSpeedX={0.02}
                  waveSpeedY={0.01}
                  waveAmpX={40}
                  waveAmpY={20}
                  friction={0.9}
                  tension={0.01}
                  maxCursorMove={120}
                  xGap={12}
                  yGap={36} style={{ pointerEvents: 'auto', zIndex: 5 }} />}
        </div>
      </div>
    </main>
  );
}
