"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type ProjectType = "professional" | "personal" | "academic";

interface Project {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
  category: string;
  type: ProjectType;
  href: string;
}

interface FiltersDict {
  all: string;
  professional: string;
  personal: string;
  academic: string;
}

interface TypeBadgesDict {
  professional: string;
  personal: string;
  academic: string;
}

interface Props {
  projects: Project[];
  filters: FiltersDict;
  typeBadges: TypeBadgesDict;
  viewCase: string;
  isRtl: boolean;
}

type FilterKey = "all" | ProjectType;

const filterKeys: FilterKey[] = ["all", "professional", "personal", "academic"];

export default function ProjectsGrid({
  projects,
  filters,
  typeBadges,
  viewCase,
  isRtl,
}: Props) {
  const [active, setActive] = useState<FilterKey>("all");
  const [visible, setVisible] = useState(true);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.type === active);

  // Animate indicator under active tab
  useEffect(() => {
    const idx = filterKeys.indexOf(active);
    const btn = tabRefs.current[idx];
    if (btn) {
      setIndicatorStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [active]);

  function handleFilter(key: FilterKey) {
    if (key === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(key);
      setVisible(true);
    }, 220);
  }

  const badgeColor: Record<ProjectType, string> = {
    professional: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    personal: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    academic: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <div className="mt-12">
      {/* Filter Tabs */}
      <div className="relative inline-flex bg-muted/60 rounded-xl p-1 mb-10 border border-border/50 backdrop-blur-sm">
        {/* Sliding indicator */}
        <span
          className="absolute top-1 bottom-1 rounded-lg bg-background shadow-sm border border-border/70 transition-all duration-300 ease-out"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          aria-hidden
        />
        {filterKeys.map((key, i) => (
          <button
            key={key}
            ref={(el) => { tabRefs.current[i] = el; }}
            onClick={() => handleFilter(key)}
            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap
              ${active === key ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
          >
            {filters[key]}
            {key !== "all" && (
              <span className="ml-2 text-xs font-normal opacity-60">
                {projects.filter((p) => p.type === key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.title + i}
            project={project}
            badge={typeBadges[project.type]}
            badgeClass={badgeColor[project.type]}
            viewCase={viewCase}
            isRtl={isRtl}
            index={i}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-24 text-center text-muted-foreground">
          <p className="text-lg">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}

/* ─── Individual card ──────────────────────────────────────────────── */
function ProjectCard({
  project,
  badge,
  badgeClass,
  viewCase,
  isRtl,
  index,
}: {
  project: Project;
  badge: string;
  badgeClass: string;
  viewCase: string;
  isRtl: boolean;
  index: number;
}) {
  const techList = project.tech.split(",").map((t) => t.trim());

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type badge — top corner */}
        <div className={`absolute top-3 ${isRtl ? "left-3" : "right-3"}`}>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${badgeClass}`}
          >
            {badge}
          </span>
        </div>

        {/* Category chip — bottom left */}
        <div className={`absolute bottom-3 ${isRtl ? "right-3" : "left-3"}`}>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background/80 text-foreground border border-border/60 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {techList.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs rounded-md bg-muted text-muted-foreground border border-border/50 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA link */}
        <Link
          href={project.href}
          className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          {viewCase}
          <ArrowUpRight size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Subtle left accent bar on hover */}
      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
    </article>
  );
}