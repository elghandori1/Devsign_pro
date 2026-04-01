"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Award, Code2, FileCheck, ChevronDown } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string;
  image: string;
  linkLabel: string;
  category: string;
  type: string;
  href: string;
}

interface WhyChooseUs {
  title: string;
  subtitle: string;
  reasons: Array<{
    title: string;
    text: string;
  }>;
}

interface PortfolioData {
  subtitle: string;
  heading: string;
  description: string;
  viewCase: string;
  cta: string;
  projects: Project[];
  whyChooseUs?: WhyChooseUs;
}

interface PortfolioClientProps {
  data: PortfolioData;
  locale: string;
  isRtl: boolean;
}

export default function PortfolioClient({ data, locale, isRtl }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(data.projects);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const WHY_CHOOSE_ICONS = [Award, Code2, FileCheck];

  // Define filters
  const filters = [
    { id: "all", label: "All Projects", count: data.projects.length },
    { id: "professional", label: "Client Work", count: data.projects.filter((p) => p.type === "professional").length },
    { id: "personal", label: "Personal", count: data.projects.filter((p) => p.type === "personal").length },
    { id: "academic", label: "Academic", count: data.projects.filter((p) => p.type === "academic").length },
  ];

  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(data.projects);
    } else {
      setFilteredProjects(data.projects.filter((project) => project.type === activeFilter));
    }
  }, [activeFilter, data.projects]);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "professional":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "personal":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "academic":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "professional":
        return "Client";
      case "personal":
        return "Personal";
      case "academic":
        return "Academic";
      default:
        return type;
    }
  };

  const activeLabel = filters.find(f => f.id === activeFilter)?.label || "All Projects";

  return (
    <main
      className="min-h-screen bg-background hero-section-light text-foreground transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />
        <div className="px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {data.subtitle}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {data.heading}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              {data.description}
            </p>

          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="relative">
            {/* Mobile Filter Dropdown */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg text-foreground"
              >
                <span>{activeLabel}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isMobileOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setActiveFilter(filter.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                        activeFilter === filter.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span className="text-sm text-muted-foreground">({filter.count})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Filter Buttons */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`group relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {filter.label}
                  <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                    activeFilter === filter.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {filter.count}
                  </span>
                  
                  {activeFilter !== filter.id && (
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try selecting a different filter category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.title}
                  href={`/${locale}${project.href}`}
                  className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${getBadgeColor(project.type)}`}>
                        {getTypeBadge(project.type)}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Quick View Icon */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white/90 dark:bg-black/90 rounded-full p-2 backdrop-blur-sm">
                        <ExternalLink size={18} className="text-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    {project.tech && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.split(",").map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-mono bg-muted rounded-md text-muted-foreground"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* View Case Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      <span>{data.viewCase}</span>
                      <ArrowRight
                        size={16}
                        className={`transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      {data.whyChooseUs && data.whyChooseUs.reasons && data.whyChooseUs.reasons.length > 0 && (
        <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-background via-muted/5 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {data.whyChooseUs.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.whyChooseUs.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.whyChooseUs.reasons.map((reason, index) => {
                const IconComponent = WHY_CHOOSE_ICONS[index % WHY_CHOOSE_ICONS.length];
                return (
                  <div
                    key={reason.title}
                    className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to bring your vision to life?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your next project and create something amazing together.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105"
            >
              {data.cta}
              <ArrowRight
                size={18}
                className={isRtl ? "rotate-180" : "group-hover:translate-x-1 transition-transform"}
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-in {
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in {
          animation-name: fade-in;
        }

        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }

        .duration-500 {
          animation-duration: 500ms;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
}