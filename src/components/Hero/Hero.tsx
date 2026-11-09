import logo from "../../assets/images/logo.png";
import { useReveal, useTilt } from "../../hooks";
import "./Hero.css";

function Hero() {
  const heading = useReveal<HTMLHeadingElement>(0);
  const subheading = useReveal<HTMLHeadingElement>(0.15);
  const { containerRef, targetRef } = useTilt<HTMLElement, HTMLDivElement>();

  return (
    <section id="top" className="hero" ref={containerRef}>
      <div className="hero__text">
        <h1
          ref={heading.ref}
          className={`hero__heading ${heading.className}`}
          style={heading.style}
        >
          We build the tools Africa has been waiting for.
        </h1>

        <h3
          ref={subheading.ref}
          className={`hero__subheading ${subheading.className}`}
          style={subheading.style}
        >
          Deltvolve builds digital products that solve real everyday problems,
          from banking and education to faith and community.
        </h3>
      </div>

      <div className="hero__image" ref={targetRef}>
        <img src={logo} alt="DeltVolve logo" />
      </div>
    </section>
  );
}

export default Hero;