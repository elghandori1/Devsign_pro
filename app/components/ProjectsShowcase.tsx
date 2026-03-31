// components/ProjectsShowcase.tsx
import { Locale } from "@/i18n-config";
import ProjectsShowcaseSlider, { ProjectItem } from "./ProjectsShowcaseSlider";
import TechnologySlider from "./TechnologySlider";


interface ProjectsShowcaseProps {
  translations: string;
  projectsData: ProjectItem[];
  locale: Locale;
}

export default function ProjectsShowcase({
  translations,
  projectsData,
  locale,
}: ProjectsShowcaseProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="projects"
      className="pt-8 md:pt-10 bg-muted/10 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p id="projects-heading" className="text-muted-foreground max-w-xl mx-auto">
            {translations}
          </p>
        </div>
        <ProjectsShowcaseSlider projects={projectsData} locale={locale} />
      </div>
      <TechnologySlider />
    </section>
  );
}