import Image from "next/image";
import { Sparkles } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaLinkedinIn,
} from "react-icons/fa";
import SidebarNav from "./SidebarNav"; // Client Component
import SidebarControls from "./SidebarControls"; // Client Component

export default function Sidebar() {
  return (
    <aside className="w-80 h-auto sticky top-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-2xl flex flex-col items-center px-8 py-10 border-r border-blue-100 overflow-hidden">
      {/* Background Decor - Static */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-cyan-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-100/20 to-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Logo Section - Static */}
      <div className="relative z-10 flex flex-col items-center mb-3">
        <div className="relative mb-2">
          <div className="relative w-22 h-22 rounded-full bg-blue-500 shadow-xl p-1">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-gray-50 p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="/logo/devsign-logo.jpg"
                  alt="Devsign logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold shadow-lg">
            PRO
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
            Devsign
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <p className="text-sm font-medium text-blue-700">
              Design & Development
            </p>
          </div>
        </div>
      </div>

      {/* Client Side Navigation */}
      <SidebarNav />

      {/* Social Media & Footer - Static wrapper with Client Controls */}
      <div className="relative z-10 w-full space-y-6">
        {/* Social Icons - Static (No state needed) */}
        <div className="flex justify-center gap-3">
          <SocialLink href="#" icon={<FaInstagram className="text-gradient-to-r from-pink-500 to-orange-500 text-lg" />} />
          <SocialLink href="#" icon={<FaFacebookF className="text-blue-600 text-lg" />} />
          <SocialLink href="#" icon={<FaLinkedinIn className="text-blue-700 text-lg" />} />
          <SocialLink href="#" icon={<FaEnvelope className="text-cyan-600 text-lg" />} />
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-gradient-to-b from-white to-gray-50 text-gray-500">
              Options
            </span>
          </div>
        </div>

        {/* Client Side Theme/Language Controls */}
        <SidebarControls />

        {/* Copyright - Static */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Devsign pro
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Crafting Digital Excellence
          </p>
        </div>
      </div>
    </aside>
  );
}

// Small helper for social links to keep main file clean
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="p-3 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-blue-100 group"
    >
      {icon}
    </a>
  );
}