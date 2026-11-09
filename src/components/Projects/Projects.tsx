import { useReveal } from "../../hooks";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "./projects";
import "./Project.css"

export default function Projects() {
  const heading = useReveal<HTMLHeadingElement>(0);
  const description = useReveal<HTMLParagraphElement>(0.15);

  return (
    <section id="projects" className="projects">
      <div className="projects__header">
        <h2
          ref={heading.ref}
          className={`projects__heading ${heading.className}`}
          style={heading.style}
        >
          Built by DeltVolve
        </h2>
        <p
          ref={description.ref}
          className={`projects__description ${description.className}`}
          style={description.style}
        >
          Explore the projects we're building to solve problems, create
          opportunities, and make a difference.
        </p>
      </div>

      <div className="projects__grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

