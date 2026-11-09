import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "../../hooks";
import "./effects.css";

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const enabled = !reduce && finePointer;

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || !enabled) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frameId = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.classList.add("is-on");
    };
    const onLeave = () => glow.classList.remove("is-on");

    const follow = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frameId = requestAnimationFrame(follow);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    follow();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

export default CursorGlow;