import type { Project, ProjectStatus } from "../../types";
import { usePopIn, useSpotlight, useReveal } from "../../hooks";

interface ProjectCardProps {
  project: Project;
  index: number; 
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  built: "Built",
  progress: "In Progress",
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, status } = project;

  const pop = usePopIn<HTMLElement>(index * 0.15);
  const onMouseMove = useSpotlight<HTMLElement>();
  const titleReveal = useReveal<HTMLHeadingElement>(0);
  const descReveal = useReveal<HTMLParagraphElement>(0.15);

  return (
    <article
      ref={pop.ref}
      className={`project-card ${pop.className}`}
      style={pop.style}
      onMouseMove={onMouseMove}
    >
      <div className="project-card__body">
        <h3
          ref={titleReveal.ref}
          className={`project-card__title ${titleReveal.className}`}
          style={titleReveal.style}
        >
          {title}
        </h3>
        <p
          ref={descReveal.ref}
          className={`project-card__description ${descReveal.className}`}
          style={descReveal.style}
        >
          {description}
        </p>
      </div>

      <div className="project-card__footer">
        <span
          className={`project-card__status project-card__status--${status}`}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;