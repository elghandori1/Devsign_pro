import { JSX } from "react";

export interface CVOption {
  id: string;
  label: string;
  color: string;
  ringColor: string;
  fileName: string;
  description: string;
  icon: JSX.Element;
}

export function getCVOptions(t: any): CVOption[] {
  return [
    {
      id: 'web',
      label: t.hero.cv_web || 'Web Development',
      color: 'bg-blue-500',
      ringColor: 'ring-blue-500/20',
      fileName: 'cv-web-dev.pdf',
      description: t.hero.cv_web_desc || 'Next.js, React, Node.js, Full-Stack',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'devops',
      label: t.hero.cv_devops || 'DevOps & Cloud',
      color: 'bg-green-500',
      ringColor: 'ring-green-500/20',
      fileName: 'cv-devops.pdf',
      description: t.hero.cv_devops_desc || 'Docker, K8s, CI/CD, AWS/GCP',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    }
  ];
}