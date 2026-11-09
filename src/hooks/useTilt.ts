import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "./useMediaQuery";

export function useTilt<C extends HTMLElement, T extends HTMLElement>(
  maxTilt = 18
) {
  const containerRef = useRef<C | null>(null);
  const targetRef = useRef<T | null>(null);
  const reduce = usePrefersReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target || reduce || !finePointer) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      target.style.transform = `perspective(900px) rotateY(${
        x * maxTilt
      }deg) rotateX(${-y * maxTilt}deg)`;
    };
    const onLeave = () => {
      target.style.transform = "";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      target.style.transform = "";
    };
  }, [reduce, finePointer, maxTilt]);

  return { containerRef, targetRef };
}