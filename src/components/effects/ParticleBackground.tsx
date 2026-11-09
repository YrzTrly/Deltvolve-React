import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks";
import "./effects.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const LINK_DIST = 130;
const MOUSE_DIST = 160;
const PUSH_DIST = 110;

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(25, Math.min(90, Math.floor((w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.4 + 0.8,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // gently pushed away from the cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < PUSH_DIST && md > 0) {
          p.x += (mdx / md) * 1.2;
          p.y += (mdy / md) * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 166, 255, 0.55)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(0, 166, 255, ${(1 - d / LINK_DIST) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // brighter lines to the cursor
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(120, 210, 255, ${(1 - md / MOUSE_DIST) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      frameId = requestAnimationFrame(frame);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    resize();
    frame();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}

export default ParticleBackground;