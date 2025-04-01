"use client";

import { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Model from "./Model";

const Experience = ({ galaxy }) => {
  const [active, setActive] = useState(0);

  // 提取所有board URL到一个数组中
  const boards = useMemo(() => galaxy.map((item) => item.board), [galaxy]);

  return (
    <main className="relative w-screen h-screen">
      <ul className="fixed z-10 flex flex-col gap-4 top-24 left-8">
        {galaxy.map((item, index) => {
          const { title, model, board } = item;
          return (
            <li key={index}>
              <button
                onClick={() => setActive(index)}
                className={`${active === index && "font-semibold italic"}`}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        <Environment preset="sunset" />
        <Model boards={boards} activeIndex={active} />
        <OrbitControls />
      </Canvas>
    </main>
  );
};

export default Experience;
