import { useCallback } from "react";
import type { MouseEvent } from "react";
import { useFinePointer } from "./useMediaQuery";

export function useSpotlight<T extends HTMLElement>() {
  const finePointer = useFinePointer();

  return useCallback(
    (e: MouseEvent<T>) => {
      if (!finePointer) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    [finePointer]
  );
}