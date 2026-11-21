import { FaWhatsapp } from "react-icons/fa";
import type { Locale } from "@/i18n-config";
import infos from "@/app/dictionaries/global.json";

interface FloatingWhatsAppProps {
  locale: Locale;
}

export default function FloatingWhatsApp({ locale }: FloatingWhatsAppProps) {
  const label = locale === "fr" ? "Discuter sur WhatsApp" : "Chat on WhatsApp";

  return (
    <aside
      className="fixed bottom-4 end-4 z-40 sm:bottom-6 sm:end-6"
      aria-label={label}
    >
      <a
        href={infos.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-14 min-w-14 items-center justify-center gap-3 rounded-full border border-white/15 bg-[#25D366] px-4 text-base font-bold text-white shadow-[0_12px_32px_rgba(37,211,102,0.3)] transition-transform duration-200 hover:-translate-y-1 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6"
        aria-label={label}
      >
        <FaWhatsapp className="size-7 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </aside>
  );
}
