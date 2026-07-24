// components/TechnologySlider.tsx
import Image from "next/image";

const technologies = [
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
];

export default function TechnologySlider() {
  if (technologies.length === 0) return null;

  const duplicated = [...technologies, ...technologies];

  return (
    <div
      className="w-full overflow-hidden py-3 sm:py-4 md:py-6 bg-card border-y border-border"
      dir="ltr"
      aria-label="Technology stack carousel"
    >
      <div className="relative">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-background to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-l from-background to-transparent z-10"
          aria-hidden="true"
        />

        <ul className="flex animate-scroll hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-max p-0 m-0 list-none">
          {duplicated.map((tech, index) => (
            
            <li
              key={`${tech.name}-${index}`}
              aria-hidden={index >= technologies.length ? "true" : "false"}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-max px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl bg-background/60 backdrop-blur border border-border hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
                <Image
                  src={tech.logo}
                  alt={index >= technologies.length ? "" : `${tech.name} logo`}
                  fill
                  className="object-contain"
                  sizes="32px"
                  loading="lazy"
                  decoding="async"
                  unoptimized={tech.logo.includes("vectorlogo.zone")}
                />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-foreground/80 whitespace-nowrap">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}