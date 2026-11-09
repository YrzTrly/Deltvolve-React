import type { CSSProperties } from "react";
import { useInView } from "./useInView";

export function useReveal<T extends HTMLElement>(delay = 0) {
  const { ref, inView } = useInView<T>({
    threshold: 0.15,
    rootMargin: "0px 0px -8% 0px",
  });

  return {
    ref,
    className: `reveal${inView ? " reveal--visible" : ""}`,
    style: { "--reveal-delay": `${delay}s` } as CSSProperties,
  };
}