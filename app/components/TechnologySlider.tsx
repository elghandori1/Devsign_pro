"use client";

import Image from "next/image";

const technologies = [
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Nginx",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  { name: "Vite", logo: "https://vitejs.dev/logo.svg" },
  {
    name: "Bash",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  },
  {
    name: "Illustrator",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
  },
];

export default function TechnologySlider() {
  const duplicated = [...technologies, ...technologies];

  if (technologies.length === 0) {
    return null;
  }
  return (
    <div
      className="w-full overflow-hidden py-3 sm:py-4 md:py-6 mt-8 sm:mt-10 md:mt-14 bg-card border-y border-border"
      dir="ltr"
    >
      <div className="relative">
        {/* Gradient overlays - responsive widths */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-12 md:w-16 lg:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-scroll gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-max">
          {duplicated.map((tech, index) => (
            <div
              key={index}
              className="
                flex items-center gap-1.5 sm:gap-2 md:gap-3
                min-w-max
                px-2 sm:px-3 md:px-4 lg:px-5
                py-1 sm:py-1.5 md:py-2
                rounded-lg sm:rounded-xl
                bg-background/60 backdrop-blur
                border border-border
                hover:scale-105
                transition-transform duration-300
                cursor-pointer
              "
            >
              {/* Responsive image sizing */}
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, (max-width: 1024px) 28px, 32px"
                />
              </div>

              {/* Responsive text sizing */}
              <span className="text-xs sm:text-sm md:text-base font-medium text-foreground/80 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
