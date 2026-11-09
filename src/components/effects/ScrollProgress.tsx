import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks";
import "./effects.css";

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || reduce) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce]);

  if (reduce) return null;
  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}

export default ScrollProgress;