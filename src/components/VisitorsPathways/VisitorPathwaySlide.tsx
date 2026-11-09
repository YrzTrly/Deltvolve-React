import type { PathwaySlide } from "../../types";

interface VisitorPathwaySlideProps {
  slide: PathwaySlide;
  isActive: boolean;
}

function VisitorPathwaySlide({ slide, isActive }: VisitorPathwaySlideProps) {
  const { variant, heading, description, linkLabel, linkHref } = slide;

  return (
    <div
      className={`visitor-pathways__slide visitor-pathways__slide--${variant}${
        isActive ? " is-active" : ""
      }`}
      aria-hidden={!isActive}
    >
      <div className="visitor-pathways__content">
        <h2 className="visitor-pathways__heading">{heading}</h2>
        <p className="visitor-pathways__description">{description}</p>
        <a
          href={linkHref}
          className="visitor-pathways__link"
          tabIndex={isActive ? 0 : -1}
        >
          {linkLabel}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default VisitorPathwaySlide;