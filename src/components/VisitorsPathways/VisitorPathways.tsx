import { useEffect, useRef, useState } from "react";
import { useInView, usePopIn, usePrefersReducedMotion } from "../../hooks";
import VisitorPathwaySlide from "./VisitorPathwaySlide";
import { PATHWAY_SLIDES } from "./pathways";
import "./VisitorPathways.css";
import type { PointerEvent, TouchEvent } from "react";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;
const TOTAL = PATHWAY_SLIDES.length;

function VisitorPathways() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const reduceMotion = usePrefersReducedMotion();
  const pop = usePopIn<HTMLDivElement>();
  // Starts the slide text animation once the slideshow scrolls into view
  const { ref: viewportRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  const goTo = (index: number) => setCurrent((index + TOTAL) % TOTAL); // wraps around

  // Autoplay. Re-running whenever `current` changes restarts the timer,
  // which replaces restartAutoplay() from the vanilla version.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TOTAL);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [current, paused, reduceMotion]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) goTo(current + (diff < 0 ? 1 : -1));
  };

  return (
    <section id="visitor-pathways" className="visitor-pathways">
      <div
        ref={pop.ref}
        className={`visitor-pathways__slider ${pop.className}${
          inView ? " in-view" : ""
        }`}
        style={pop.style}
        // on the slider div:
onPointerEnter={(e: PointerEvent) => e.pointerType === "mouse" && setPaused(true)}
onPointerLeave={(e: PointerEvent) => e.pointerType === "mouse" && setPaused(false)}
onFocus={() => setPaused(true)}
onBlur={() => setPaused(false)}

        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          className="visitor-pathways__arrow visitor-pathways__arrow--prev"
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
        >
          &#10094;
        </button>

        <div ref={viewportRef} className="visitor-pathways__viewport">
          <div
            className="visitor-pathways__slides"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {PATHWAY_SLIDES.map((slide, index) => (
              <VisitorPathwaySlide
                key={slide.id}
                slide={slide}
                isActive={index === current}
              />
            ))}
          </div>
        </div>

        <button
          className="visitor-pathways__arrow visitor-pathways__arrow--next"
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
        >
          &#10095;
        </button>

        <div className="visitor-pathways__dots">
          {PATHWAY_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`visitor-pathways__dot${
                index === current ? " visitor-pathways__dot--active" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VisitorPathways;