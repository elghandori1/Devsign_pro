import { Locale } from "@/i18n-config";
import { flattenPortfolioProjects } from "@/app/lib/portfolio";
import ProjectsShowcaseScroller from "./ProjectsShowcaseScroller";

export interface ProjectItem {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
  category?: string;
  type?: string;
  status?: string;
  href: string;
}

interface ProjectsShowcaseProps {
  description: string;
  projectsData: ProjectItem[];
  locale: Locale;
  heading: string;
  headingId?: string;
}

const FEATURED_PROJECTS = [
  "/portfolio/corporate-website",
  "/portfolio/nutritia-shopify-store",
  "/portfolio/business-automation-dashboard",
];

/**
 * Selects a small project summary on the server so detailed case-study data is
 * not sent to the homepage client bundle. All cards remain in the rendered HTML.
 */
export default function ProjectsShowcase({
  description,
  projectsData,
  locale,
  heading,
  headingId = "projects-heading",
}: ProjectsShowcaseProps) {
  const projects = flattenPortfolioProjects<ProjectItem>(projectsData)
    .filter((project) => FEATURED_PROJECTS.includes(project.href))
    .sort(
      (first, second) =>
        FEATURED_PROJECTS.indexOf(first.href) - FEATURED_PROJECTS.indexOf(second.href),
    )
    .slice(0, 3)
    .map(
      ({
        title,
        description: projectDescription,
        tech,
        image,
        linkLabel,
        category,
        href,
      }) => ({
        title,
        description: projectDescription,
        tech,
        image,
        linkLabel,
        category,
        href,
      }),
    );

  if (!projects.length) return null;

  return (
    <div className="px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:pt-20">
      <header className="mx-auto mb-9 max-w-4xl text-center sm:mb-12">
        <h2
          id={headingId}
          className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          {description}
        </p>
      </header>

      <ProjectsShowcaseScroller projects={projects} locale={locale} />
    </div>
  );
}
