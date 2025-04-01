"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({ portfolio }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    // 计算初始位置（距离右侧1/2屏幕）
    const startX = window.innerWidth * 1;

    // 设置初始位置
    gsap.set(cards, {
      x: startX,
    });

    // 计算总滚动距离（考虑初始位置）
    const totalWidth = cards.scrollWidth;
    const scrollDistance = totalWidth - Math.abs(startX);

    // 创建滚动动画
    gsap.to(cards, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top", // 从容器顶部开始
        end: `+=${scrollDistance}`, // 减小滚动距离使动画更快
        pin: true, // 固定容器
        scrub: 10, // 减小数值使动画更快
        invalidateOnRefresh: true, // 窗口大小改变时重新计算
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-30 h-screen overflow-hidden"
    >
      <div
        ref={cardsRef}
        className="absolute flex gap-40 -translate-y-1/2 bg-white top-1/2 will-change-transform"
      >
        {portfolio.map((item) => (
          <div key={item.slug} className="flex-shrink-0 w-1/2">
            <Card item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
