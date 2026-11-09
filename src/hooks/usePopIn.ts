import type { CSSProperties } from "react";
import { useInView } from "./useInView";

export function usePopIn<T extends HTMLElement>(delay = 0) {
  const { ref, inView } = useInView<T>({
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  });

  return {
    ref,
    className: `pop${inView ? " pop--in" : ""}`,
    style: { "--pop-delay": `${delay}s` } as CSSProperties,
  };
}