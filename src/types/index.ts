export type ProjectStatus = "built" | "progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
}

export interface PathwaySlide {
  id: string;
  variant: "deltron" | "services" | "partners";
  heading: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}