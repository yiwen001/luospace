"use client";

import { useGLTF } from "@react-three/drei";

// 预加载所有模型
const preloadModels = (boards) => {
  boards.forEach((board) => {
    useGLTF.preload(board.model);
  });
};

const Model = ({ boards, activeIndex }) => {
  // 确保所有模型都被加载
  preloadModels(boards);
  const board = boards[activeIndex];

  // 使用当前激活的模型
  const { scene } = useGLTF(board.model);

  return (
    <primitive object={scene} position={[0, 0, 0]} scale={board.scale || 20} />
  );
};

export default Model;
