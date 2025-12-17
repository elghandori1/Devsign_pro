"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Palette,
  Home,
  Briefcase,
  Cpu,
  DollarSign,
  User,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const menu = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Services", href: "/services", icon: <Palette className="w-4 h-4" /> },
    { name: "Projects", href: "/projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Process", href: "/process", icon: <Cpu className="w-4 h-4" /> },
    { name: "Pricing", href: "/pricing", icon: <DollarSign className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <User className="w-4 h-4" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className="relative z-10 w-full flex-1 mb-4">
      <ul className="space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 w-full rounded-xl py-3 px-4 transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 border border-transparent hover:border-blue-200"
                  }`}
              >
                <div className={`${isActive ? "text-white" : "text-blue-500"}`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
                {isActive ? (
                  <ChevronRight className="w-4 h-4 ml-auto text-white/80" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}