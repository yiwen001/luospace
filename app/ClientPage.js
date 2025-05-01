"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Above from "@/components/above";
import About from "@/components/about";
import HorizontalScroll from "@/components/portfolio";
import Waves from "@/components/wavebg/Wave";

// 动态导入3D组件以减少初始加载时间
const Experience = dynamic(() => import("@/components/sphere/Experience"), {
  ssr: false,
  loading: () => <LoadingPlaceholder text="加载3D体验中..." />
});

const Circle3D = dynamic(() => import("@/components/Circle3D"), {
  ssr: false,
  loading: () => <LoadingPlaceholder text="加载3D模型中..." />
});

// 加载占位组件
const LoadingPlaceholder = ({ text }) => (
  <div className="flex items-center justify-center w-full h-full bg-black">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <p className="mt-4 text-white">{text}</p>
    </div>
  </div>
);
export default function ClientPage({ portfolio, about }) {
  const [showWaves, setShowWaves] = useState(false);
  const aboutSectionRef = useRef(null);
  const mainRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSection2, setIsLoadingSection2] = useState(true);
  const [isLoadingSection3, setIsLoadingSection3] = useState(true);

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

  // 控制波浪效果显示
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
  
  // 控制第2和第3页的资源加载状态
  useEffect(() => {
    // 模拟第2页资源预加载
    const timer1 = setTimeout(() => {
      setIsLoadingSection2(false);
    }, 2000);
    
    // 模拟第3页资源预加载
    const timer2 = setTimeout(() => {
      setIsLoadingSection3(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // 主加载屏幕
  const MainLoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-6 text-white text-xl font-light">加载作品集中...</p>
        <p className="mt-2 text-gray-400 text-sm">请稍候，正在准备3D体验</p>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && <MainLoadingScreen />}
      
      <main ref={mainRef} className="flex snap-x snap-mandatory overflow-x-hidden opacity-100">
        <div className="relative w-screen h-screen flex-none snap-start">
          <div className="fixed inset-0 z-0">
            <Above />  
          </div>
          <div className="relative z-10">
            <Experience />
          </div>
        </div>

        <div className="relative w-screen h-screen flex-none snap-start">
          {isLoadingSection2 ? (
            <div className="flex items-center justify-center w-full h-full bg-black">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="mt-4 text-white">加载作品集中...</p>
              </div>
            </div>
          ) : (
            <HorizontalScroll portfolio={portfolio} />
          )}
        </div>

        <div className="relative w-screen h-screen flex-none snap-start">
          {isLoadingSection3 ? (
            <div className="flex items-center justify-center w-full h-full bg-black">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="mt-4 text-white">加载3D模型中...</p>
              </div>
            </div>
          ) : (
            <Circle3D />
          )}
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
    </>
  );
}
