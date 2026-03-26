"use client";

import Image from "next/image";

const technologies = [
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Vite", logo: "https://vitejs.dev/logo.svg" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "Illustrator", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Tailwind CSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
];

export default function TechnologySlider() {
  const duplicated = [...technologies, ...technologies];

  return (
    <div className="w-full overflow-hidden py-4 sm:py-6 mt-10 sm:mt-14 bg-card border-y border-border">
      <div className="relative">

        {/* ✅ Responsive gradient edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* ✅ Responsive gap + smooth animation */}
        <div className="flex animate-scroll gap-4 sm:gap-6 md:gap-10 w-max">

          {duplicated.map((tech, index) => (
            <div
              key={index}
              className="
                flex items-center gap-2 sm:gap-3
                min-w-max
                px-3 sm:px-4 md:px-5
                py-1.5 sm:py-2
                rounded-lg sm:rounded-xl
                bg-background/60 backdrop-blur
                border border-border
                hover:scale-105
                transition-transform duration-300
              "
            >
              <Image
                src={tech.logo}
                alt={tech.name}
                width={24}
                height={24}
                className="object-contain sm:w-[26px] sm:h-[26px] md:w-[30px] md:h-[30px]"
              />

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