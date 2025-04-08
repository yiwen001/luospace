"use client";
import Experience from "@/components/sphere/Experience";
import Above from "@/components/above";
import About from "@/components/about";
import HorizontalScroll from "@/components/portfolio";
import { useEffect } from "react";
 
export default function ClientPage({ portfolio, about }) {
  useEffect(() => {
    // 将垂直滚动转换为水平滚动
    const handleWheel = (e) => {
      const container = document.querySelector('main');
      if (e.deltaY !== 0) {
        container.scrollBy({
          left: e.deltaY,
          behavior: 'smooth'
        });
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <main>
      
      <div className="relative w-screen h-screen">
        <div className="fixed inset-0">
          <Experience />
        </div>
        <Above />
      </div>

      <div className="relative w-screen h-screen">
        <HorizontalScroll portfolio={portfolio} />
      </div>

      <div className="relative w-screen h-screen">
        <ul>
          {about.map((item, index) => {
            return <About key={index} item={item} />;
          })}
        </ul>
      </div>
      
    

    </main>
  );
}
