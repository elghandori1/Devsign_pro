"use client";

import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { HiOutlineGlobeAlt, HiOutlineLightBulb } from "react-icons/hi";

export default function SidebarControls() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="flex justify-between items-center px-4">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow border border-gray-200 hover:border-blue-300 transition-colors group"
      >
        {theme === "light" ? (
          <>
            <FaMoon className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Dark</span>
          </>
        ) : (
          <>
            <HiOutlineLightBulb className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Light</span>
          </>
        )}
      </button>

      {/* Language Toggle */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow border border-gray-200 hover:border-blue-300 transition-colors group">
        <HiOutlineGlobeAlt className="text-blue-600" />
        <span className="text-sm font-medium text-gray-700">العربية</span>
      </button>
    </div>
  );
}