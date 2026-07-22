// components/ProjectsShowcase.tsx
import { Locale } from "@/i18n-config";
import ProjectsShowcaseSlider from "./ProjectsShowcaseSlider";

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
  description:string;
  projectsData: ProjectItem[];
  locale: Locale;
}

export default function ProjectsShowcase({
   description,
  projectsData,
  locale,
}: ProjectsShowcaseProps) {
  const isRtl = locale === "ar";
  const professionalProjects = projectsData
    .filter((p) => p.type === "professional")
    .slice(0, 3);

  return (
    <div
      className="transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        <ProjectsShowcaseSlider projects={professionalProjects} locale={locale} />
      </div>
    </div>
  );
}