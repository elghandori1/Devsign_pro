import { Locale } from "@/i18n-config";
import ProjectsShowcaseSlider, { type ProjectItem } from "./ProjectsShowcaseSlider";
import TechnologySlider from "./TechnologySlider";

interface ProjectsSectionTranslations {
  sectionLabel: string;
  subtitle: string;
  projects: ProjectItem[];
}

interface ProjectsShowcaseProps {
  translations: ProjectsSectionTranslations;
  locale: Locale;
}

export default function ProjectsShowcase({
  translations,
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
        <h3 className="text-center mb-8">
          <p id="projects-heading" className="text-muted-foreground max-w-xl mx-auto">
            {translations.subtitle}
          </p>
        </h3>
        <ProjectsShowcaseSlider projects={translations.projects} locale={locale} />
      </div>
      <TechnologySlider/>
    </section>
  );
}
