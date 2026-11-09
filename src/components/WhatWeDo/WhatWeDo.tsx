import { useReveal } from "../../hooks";
import "./WhatWeDo.css";

function WhatWeDo() {
  const eyebrow = useReveal<HTMLParagraphElement>(0);
  const heading = useReveal<HTMLHeadingElement>(0.15);
  const description = useReveal<HTMLParagraphElement>(0.3);

  return (
    <section id="what-we-do" className="what-we-do">
      <div className="what-we-do__content">
        <p
          ref={eyebrow.ref}
          className={`what-we-do__eyebrow ${eyebrow.className}`}
          style={eyebrow.style}
        >
          What We Do
        </p>

        <h2
          ref={heading.ref}
          className={`what-we-do__heading ${heading.className}`}
          style={heading.style}
        >
          We turn meaningful problems into technology that moves the world
          forward.
        </h2>

        <p
          ref={description.ref}
          className={`what-we-do__description ${description.className}`}
          style={description.style}
        >
          From building products that grow into independent startups to scaling
          ventures and creating custom software for organizations, we turn ideas
          into solutions built for real impact.
        </p>
      </div>
    </section>
  );
}

export default WhatWeDo;