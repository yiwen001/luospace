"use client";
import { useState, useRef, useEffect } from "react";
import Experience from "@/components/sphere/Experience";
import Above from "@/components/above";
import About from "@/components/about";
import HorizontalScroll from "@/components/portfolio";
import Waves from "@/components/wavebg/Wave";
 
export default function ClientPage({ portfolio, about }) {
  const [showWaves, setShowWaves] = useState(false);
  const aboutSectionRef = useRef(null);

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
    <main>
      
      <div className="relative w-screen h-screen">
        <div className="fixed inset-0">
        <Above />  
        </div>
       <Experience />
      </div>

      <div className="relative w-screen h-screen">
        <HorizontalScroll portfolio={portfolio} />
      </div>

      <div className="relative w-screen h-screen" ref={aboutSectionRef}>
        <div className="absolute inset-0 z-[5]">
          {showWaves && <Waves style={{ pointerEvents: 'auto', zIndex: 5 }} />}
        </div>
        <div className="relative z-[10]">
          <ul>
            {about.map((item, index) => {
              return <About key={index} item={item} />;
            })}
          </ul>
        </div>
      </div>
      
    

    </main>
  );
}
