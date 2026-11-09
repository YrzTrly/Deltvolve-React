import "./Marquee.css";

interface MarqueeProps {
  variant: "first" | "second";
  phrase?: string;
}

const REPEATS = 5; // phrases per copy; two identical copies make the loop seamless

function Marquee({
  variant,
  phrase = "Disrupt. Build. Evolve. Iterate.",
}: MarqueeProps) {
  const words = phrase.trim().split(/\s+/);

  const renderCopy = (copy: number) => (
    <div className="marquee__content" key={copy} aria-hidden={copy === 1}>
      {Array.from({ length: REPEATS }, (_, i) => (
        <span className="marquee__phrase" key={i}>
          {words.map((word, w) => (
            <b
              key={w}
              className={`glitch glitch--${(w % 4) + 1}`}
              data-text={word}
            >
              {word}
            </b>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee marquee--${variant}`}
      role="marquee"
      aria-label={phrase}
    >
      <div className="marquee__track">
        {renderCopy(0)}
        {renderCopy(1)}
      </div>
    </div>
  );
}

export default Marquee;