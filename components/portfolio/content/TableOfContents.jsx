"use client";

import { useState, useEffect } from "react";
import { slugify } from "@/lib/sanity/utils";

const TableOfContents = ({ blocks }) => {
  const [activeId, setActiveId] = useState(""); // 滚动观察的高亮
  const [clickedId, setClickedId] = useState(""); // 点击时的高亮
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    // 监听标题元素
    const headingsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 只在没有点击高亮时更新滚动高亮
            if (!clickedId) {
              setActiveId(entry.target.id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
      }
    );

    // 监听内容底部
    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px", // 调整这个值来控制触发点
      }
    );

    // 观察所有标题元素
    document.querySelectorAll("h2, h3").forEach((heading) => {
      headingsObserver.observe(heading);
    });

    // 观察内容底部
    const contentBottom = document.querySelector(".block-content-bottom");
    if (contentBottom) {
      bottomObserver.observe(contentBottom);
    }

    // 添加滚动事件监听器，在滚动停止后清除点击高亮
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setClickedId("");
      }, 150); // 滚动停止 150ms 后清除点击高亮
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      headingsObserver.disconnect();
      bottomObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [clickedId]);

  // 过滤出所有标题
  const headings = blocks.filter(
    (block) =>
      block._type === "block" && (block.style === "h2" || block.style === "h3")
  );

  if (headings.length === 0) return null;

  return (
    <nav
      className={`
        ${isFixed ? "fixed" : "absolute bottom-0"}
        left-8 top-52 w-64 max-h-[calc(100vh-12rem)] 
        overflow-y-auto transition-all duration-300
      `}
    >
      <ul className="space-y-2">
        {headings.map((heading) => {
          const text = heading.children?.map((child) => child.text).join("");
          const id = slugify(text);
          const isH3 = heading.style === "h3";
          const isActive = clickedId === id || (!clickedId && activeId === id);

          return (
            <li
              key={id}
              className={`
                ${isH3 ? "ml-4 text-sm" : "text-base font-semibold"}
                ${isActive ? "text-pink-500 font-medium" : "text-gray-500"}
                transition-colors duration-200
                hover:text-pink-500
              `}
            >
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setClickedId(id); // 设置点击高亮
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                • {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
