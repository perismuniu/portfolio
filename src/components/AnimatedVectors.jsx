import { useEffect, useRef, useMemo } from "react";

/* 0. Code Brackets — self-drawing bracket animation */
export function AnimatedCodeBrackets() {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".draw-path");
    if (!paths) return;

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.animation = `drawLine 2s ${i * 0.3}s ease forwards`;
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="animated-brackets"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="draw-path"
        d="M60 40 L30 100 L60 160"
        stroke="url(#grad1)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M140 40 L170 100 L140 160"
        stroke="url(#grad2)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M95 45 L105 155"
        stroke="url(#grad3)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="draw-path" cx="75" cy="100" r="4" stroke="#6366f1" strokeWidth="2" fill="none" />
      <circle className="draw-path" cx="125" cy="100" r="4" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      <defs>
        <linearGradient id="grad1" x1="30" y1="40" x2="60" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="grad2" x1="140" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="grad3" x1="95" y1="45" x2="105" y2="155" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* 1. Floating Geometrics — triangles, hexagons, circles drifting slowly */
export function FloatingGeometrics() {
  const shapes = useMemo(() => {
    const items = [];
    const types = ["triangle", "hexagon", "circle", "diamond", "cross"];
    for (let i = 0; i < 6; i++) {
      items.push({
        type: types[i % types.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 12 + Math.random() * 28,
        duration: 18 + Math.random() * 25,
        delay: Math.random() * -30,
        opacity: 0.04 + Math.random() * 0.06,
        rotation: Math.random() * 360,
      });
    }
    return items;
  }, []);

  return (
    <svg className="floating-geometrics" viewBox="0 0 100 100" preserveAspectRatio="none">
      {shapes.map((s, i) => {
        const style = {
          "--float-x": `${s.x}vw`,
          "--float-y": `${s.y}vh`,
          "--float-dur": `${s.duration}s`,
          "--float-delay": `${s.delay}s`,
          "--float-size": s.size,
          "--float-rot": `${s.rotation}deg`,
        };
        if (s.type === "triangle") {
          const cx = s.size / 2, cy = s.size * 0.866;
          return (
            <polygon
              key={i}
              className="float-shape"
              points={`${s.size / 2},0 0,${s.size} ${s.size},${s.size}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity={s.opacity}
              style={style}
            />
          );
        }
        if (s.type === "hexagon") {
          const pts = Array.from({ length: 6 }, (_, j) => {
            const angle = (Math.PI / 3) * j - Math.PI / 6;
            return `${s.size / 2 + (s.size / 2) * Math.cos(angle)},${s.size / 2 + (s.size / 2) * Math.sin(angle)}`;
          }).join(" ");
          return (
            <polygon
              key={i}
              className="float-shape"
              points={pts}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity={s.opacity}
              style={style}
            />
          );
        }
        if (s.type === "diamond") {
          return (
            <polygon
              key={i}
              className="float-shape"
              points={`${s.size / 2},0 ${s.size},${s.size / 2} ${s.size / 2},${s.size} 0,${s.size / 2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity={s.opacity}
              style={style}
            />
          );
        }
        if (s.type === "cross") {
          const t = s.size * 0.25;
          return (
            <path
              key={i}
              className="float-shape"
              d={`M${s.size / 2 - t},0 L${s.size / 2 + t},0 L${s.size / 2 + t},${s.size / 2 - t} L${s.size},${s.size / 2 - t} L${s.size},${s.size / 2 + t} L${s.size / 2 + t},${s.size / 2 + t} L${s.size / 2 + t},${s.size} L${s.size / 2 - t},${s.size} L${s.size / 2 - t},${s.size / 2 + t} L0,${s.size / 2 + t} L0,${s.size / 2 - t} L${s.size / 2 - t},${s.size / 2 - t} Z`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity={s.opacity}
              style={style}
            />
          );
        }
        return (
          <circle
            key={i}
            className="float-shape"
            cx={s.size / 2}
            cy={s.size / 2}
            r={s.size / 2 - 1}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity={s.opacity}
            style={style}
          />
        );
      })}
    </svg>
  );
}

/* 2. Network Nodes — connected dots that pulse */
export function NetworkNodes() {
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 12; i++) {
      pts.push({
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        r: 1 + Math.random() * 2,
        delay: Math.random() * 4,
      });
    }
    return pts;
  }, []);

  const lines = useMemo(() => {
    const result = [];
    const threshold = 25;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          result.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, delay: (nodes[i].delay + nodes[j].delay) / 2 });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <svg className="network-nodes" viewBox="0 0 100 100" preserveAspectRatio="none">
      {lines.map((l, i) => (
        <line
          key={`l${i}`}
          className="network-line"
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="currentColor"
          strokeWidth="0.15"
          opacity="0.08"
          style={{ animationDelay: `${l.delay}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`n${i}`}
          className="network-dot"
          cx={n.x} cy={n.y} r={n.r}
          fill="currentColor"
          opacity="0.12"
          style={{ animationDelay: `${n.delay}s` }}
        />
      ))}
    </svg>
  );
}

/* 3. Morphing Blobs — organic shapes that slowly change */
export function MorphingBlobs() {
  return (
    <svg className="morphing-blobs" viewBox="0 0 800 600" preserveAspectRatio="none">
      <path className="blob blob-1" d="M400,150 C500,50 700,100 700,250 C700,400 550,500 400,450 C250,500 100,400 100,250 C100,100 300,50 400,150 Z" />
      <path className="blob blob-2" d="M350,200 C450,100 650,150 650,300 C650,450 500,550 350,500 C200,550 50,450 50,300 C50,150 250,100 350,200 Z" />
      <path className="blob blob-3" d="M450,180 C550,80 720,130 720,280 C720,430 570,530 420,480 C270,530 120,430 120,280 C120,130 350,80 450,180 Z" />
    </svg>
  );
}

/* 4. Animated Rings — concentric rotating circles */
export function AnimatedRings() {
  return (
    <svg className="animated-rings" viewBox="0 0 400 400" fill="none">
      <circle className="ring ring-1" cx="200" cy="200" r="60" />
      <circle className="ring ring-2" cx="200" cy="200" r="100" />
      <circle className="ring ring-3" cx="200" cy="200" r="140" />
      <circle className="ring ring-4" cx="200" cy="200" r="180" />
      {/* Orbiting dots */}
      <circle className="orbit-dot orbit-1" cx="260" cy="200" r="3" />
      <circle className="orbit-dot orbit-2" cx="200" cy="100" r="2.5" />
      <circle className="orbit-dot orbit-3" cx="60" cy="200" r="2" />
    </svg>
  );
}

/* 5. Gradient Mesh — animated gradient blobs in background */
export function GradientMesh() {
  return (
    <div className="gradient-mesh">
      <div className="mesh-blob mesh-1" />
      <div className="mesh-blob mesh-2" />
      <div className="mesh-blob mesh-3" />
      <div className="mesh-blob mesh-4" />
    </div>
  );
}

/* 6. Diagonal Lines — subtle animated diagonal stripe pattern */
export function DiagonalLines() {
  return (
    <svg className="diagonal-lines" viewBox="0 0 200 200" preserveAspectRatio="none">
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          className="diag-line"
          x1={i * 15 - 50}
          y1={0}
          x2={i * 15 + 100}
          y2={200}
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.04"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </svg>
  );
}

/* 7. Particle Field — tiny floating particles */
export function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -20,
      opacity: 0.05 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <svg className="particle-field" viewBox="0 0 100 100" preserveAspectRatio="none">
      {particles.map((p, i) => (
        <circle
          key={i}
          className="particle"
          cx={p.x}
          cy={p.y}
          r={p.size}
          fill="currentColor"
          opacity={p.opacity}
          style={{
            "--p-dur": `${p.duration}s`,
            "--p-delay": `${p.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}

/* 8. Animated Wave — flowing wave transition */
export function AnimatedWave() {
  return (
    <svg className="wave-animation" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
        fill="rgba(99, 102, 241, 0.08)"
        className="wave-path wave-1"
      />
      <path
        d="M0,80 C360,20 720,100 1080,40 C1260,20 1380,50 1440,40 L1440,120 L0,120 Z"
        fill="rgba(139, 92, 246, 0.06)"
        className="wave-path wave-2"
      />
    </svg>
  );
}

/* 9. Animated Grid Dots — pulsing dot grid */
export function AnimatedGridDots() {
  return (
    <svg className="grid-dots" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={20 + col * 40}
            cy={20 + row * 40}
            r="2"
            fill="rgba(99, 102, 241, 0.3)"
            className="dot-pulse"
            style={{ animationDelay: `${(row + col) * 0.15}s` }}
          />
        ))
      )}
    </svg>
  );
}
