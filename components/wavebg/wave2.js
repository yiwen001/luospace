import { useRef, useEffect } from "react";
import './Waves.css';

class Grad {
  constructor(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  dot2(x, y) { return this.x * x + this.y * y; }
}

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
      new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
      new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)
    ];
    this.p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
      69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
      203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74,
      165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
      92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
      89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17,
      182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167,
      43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246,
      97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239,
      107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
      138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }
  seed(seed) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      let v = (i & 1) ? (this.p[i] ^ (seed & 255)) : (this.p[i] ^ ((seed >> 8) & 255));
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }
  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(a, b, t) { return (1 - t) * a + t * b; }
  perlin2(x, y) {
    let X = Math.floor(x), Y = Math.floor(y);
    x -= X; y -= Y; X &= 255; Y &= 255;
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
    const u = this.fade(x);
    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      this.fade(y)
    );
  }
}

const Waves = ({
  lineColor = "rgba(150, 150, 150, 0.5)", // 浅灰色线条
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = ""
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const noiseRef = useRef(new Noise(Math.random()));
  const linesRef = useRef([]);
  const mouseRef = useRef({
    x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false
  });
  const configRef = useRef({
    lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY,
    friction, tension, maxCursorMove, xGap, yGap
  });
  const frameIdRef = useRef(null);

  useEffect(() => {
    configRef.current = { lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap };
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  useEffect(() => {
    console.log("Waves mounted");
    const canvas = canvasRef.current;
    const container = containerRef.current;
    ctxRef.current = canvas.getContext("2d");

    function setSize() {
      boundingRef.current = container.getBoundingClientRect();
      canvas.width = boundingRef.current.width;
      canvas.height = boundingRef.current.height;
    }

    function setLines() {
      const { width, height } = boundingRef.current;
      linesRef.current = [];
      const { xGap } = configRef.current;
      
      // 只创建垂直线
      const totalLines = Math.ceil(width / xGap) + 4; // 多几条线确保覆盖全屏
      const xStart = (width - xGap * totalLines) / 2;
      
      // 每条线的点数
      const pointsPerLine = 30; // 每条线上的点数固定
      
      for (let i = 0; i <= totalLines; i++) {
        const pts = [];
        const x = xStart + xGap * i;
        
        // 每条线上平均分布点
        for (let j = 0; j <= pointsPerLine; j++) {
          const y = (height / pointsPerLine) * j;
          pts.push({
            x: x,
            y: y,
            baseX: x, // 记录原始 X 位置
            baseY: y, // 记录原始 Y 位置
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        linesRef.current.push(pts);
      }
    }

    function movePoints(time) {
      const lines = linesRef.current, mouse = mouseRef.current, noise = noiseRef.current;
      const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } = configRef.current;
      const { width, height } = boundingRef.current;
      const centerX = width / 2;
      
      lines.forEach((pts, lineIndex) => {
        // 每条线的波动频率稍有不同，增加变化感
        const lineOffset = lineIndex * 0.1;
        
        pts.forEach((p, pointIndex) => {
          // 使用正弦波创建向外突出的效果
          // 根据点在线上的位置调整振幅
          const yProgress = p.baseY / height; // 0-1 之间的值，表示点在线上的位置
          
          // 中间点的振幅最大，两端点的振幅最小
          const amplitudeFactor = Math.sin(yProgress * Math.PI) * 1.2;
          
          // 添加时间因素使波动随时间变化
          const waveX = Math.sin(time * waveSpeedX * 0.5 + yProgress * 5 + lineOffset) * waveAmpX * amplitudeFactor;
          
          // 只让线在 X 方向波动，保持 Y 方向不变
          p.wave.x = waveX;
          p.wave.y = 0;

          // 鼠标交互效果
          const dx = p.baseX - mouse.sx, dy = p.baseY - mouse.sy;
          const dist = Math.hypot(dx, dy);
          const influence = Math.max(200, mouse.vs);
          
          if (dist < influence) {
            // 计算鼠标影响强度，距离越近影响越大
            const strength = (1 - dist / influence) * 2;
            
            // 主要影响 X 方向，让线条向外突出
            p.cursor.vx += (dx / dist) * strength * mouse.vs * 0.001;
            
            // Y 方向的影响较小，保持线条形状
            p.cursor.vy += (dy / dist) * strength * mouse.vs * 0.0002;
          }

          // 应用弹性恢复力
          p.cursor.vx += (0 - p.cursor.x) * tension;
          p.cursor.vy += (0 - p.cursor.y) * tension;
          
          // 应用摩擦力
          p.cursor.vx *= friction;
          p.cursor.vy *= friction;
          
          // 更新位置
          p.cursor.x += p.cursor.vx;
          p.cursor.y += p.cursor.vy;
          
          // 限制最大移动距离
          p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x));
          p.cursor.y = Math.min(maxCursorMove * 0.5, Math.max(-maxCursorMove * 0.5, p.cursor.y));
        });
      });
    }

    function moved(point, withCursor = true) {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    }

    function drawLines() {
      const { width, height } = boundingRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, width, height);
      
      // 设置线条样式
      ctx.lineWidth = 1;
      ctx.strokeStyle = configRef.current.lineColor;
      
      // 为每条线单独绘制，使用平滑的曲线
      linesRef.current.forEach((points) => {
        ctx.beginPath();
        
        if (points.length > 1) {
          // 移动到第一个点
          const firstPoint = moved(points[0]);
          ctx.moveTo(firstPoint.x, firstPoint.y);
          
          // 使用三次样条曲线创建平滑的线条
          for (let i = 1; i < points.length; i++) {
            const point = moved(points[i]);
            ctx.lineTo(point.x, point.y);
          }
        }
        
        ctx.stroke();
      });
    }

    function tick(t) {
      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx, dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x; mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);
      container.style.setProperty("--x", `${mouse.sx}px`);
      container.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(t);
      drawLines();
      frameIdRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      setSize();
      setLines();
    }
    function onMouseMove(e) { updateMouse(e.clientX, e.clientY); }
    function onTouchMove(e) {
      const touch = e.touches[0];
      updateMouse(touch.clientX, touch.clientY);
    }
    function updateMouse(x, y) {
      const mouse = mouseRef.current, b = boundingRef.current;
      mouse.x = x - b.left;
      mouse.y = y - b.top;
      if (!mouse.set) {
        mouse.sx = mouse.x; mouse.sy = mouse.y;
        mouse.lx = mouse.x; mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    setSize();
    setLines();
    frameIdRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`waves ${className}`}
      style={{
        position: "absolute",
        top: 0, left: 0, margin: 0, padding: 0,
        width: "100%", height: "100%", overflow: "hidden",
        backgroundColor,
        ...style
      }}
    >
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  );
}

export default Waves;
