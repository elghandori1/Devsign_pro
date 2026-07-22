import Link from "next/link";
import { Locale } from "@/i18n-config";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { Users } from "lucide-react";
import infos from "@/app/dictionaries/global.json";

interface ContactTranslations {
  sectionLabel: string;
  description: string;
  whatsapp: string;
  whatsappCta: string;
  email: string;
  emailCta: string;
  linkedin: string;
  linkedinCta: string;
  instagram: string;
  instagramLabel: string;
  instagramCta: string;
  brandName: string;
}

interface ContactSectionProps {
  translations: ContactTranslations;
  locale: Locale;
}

export default function ContactSection({
  translations,
  locale,
}: ContactSectionProps) {
  if (!translations) return null;
  const isRtl = locale === "ar";

  const channels = [
    {
      id: "whatsapp",
      href:
        infos.whatsappLink ||
        `https://wa.me/${infos.phoneNumber?.replace(/\D/g, "")}`,
      icon: BsWhatsapp,
      title: translations.whatsapp,
      detail: infos.phoneNumber,
      cta: translations.whatsappCta,
      colors: {
        bg: "bg-green-600",
        border: "border-green-600/40",
        hoverBorder: "hover:border-green-600/60",
        text: "text-green-700 dark:text-green-500",
      },
      external: true,
    },
    {
      id: "email",
      href: infos.emailHref_personal || `mailto:${infos.email_personal}`,
      icon: MdEmail,
      title: translations.email,
      detail: infos.email_personal,
      cta: translations.emailCta,
      colors: {
        bg: "bg-red-800",
        border: "border-red-500/40",
        hoverBorder: "hover:border-red-500/60",
        text: "text-red-600 dark:text-red-400",
      },
      external: false,
    },
    {
      id: "linkedin",
      href: infos.social?.linkedin || "#",
      icon: BsLinkedin,
      title: translations.linkedin,
      detail: infos.linkedinName || "LinkedIn",
      cta: translations.linkedinCta,
      colors: {
        bg: "bg-[#0A66C2]",
        border: "border-[#0A66C2]/40",
        hoverBorder: "hover:border-[#0A66C2]/60",
        text: "text-[#0A66C2] dark:text-[#5fa8f3]",
      },
      external: true,
    },
    {
      id: "instagram",
      href: infos.social?.instagram || "#",
      icon: FaInstagram,
      title: translations.brandName,
      detail: infos.instagramHandle,
      cta: translations.instagramCta,
      colors: {
        bg: "bg-gradient-to-tr from-[#f9a825] via-[#f06292] to-[#7c4dff]",
        border: "border-pink-500/40",
        hoverBorder: "hover:border-pink-500/60",
        text: "text-[#c13584]",
      },
      external: true,
      extra: infos.instagramFollowers ? (
        <div className="flex items-center justify-center gap-1 mt-2 text-xs">
          <span className="font-semibold text-pink-600">
            {infos.instagramFollowers}
          </span>
          <Users size={12} className="text-pink-500" aria-hidden="true" />
          <span className="text-muted-foreground">
            {translations.instagramLabel}
          </span>
        </div>
      ) : null,
    },
  ];

  return (
    <div className="pb-10 sm:pb-14 md:pb-20" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Heading & Description ── */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {translations.description}
          </p>
        </div>

        {/* ── Contact Cards ── */}
        <div
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
        >
          {channels.map((channel) => {
            const Icon = channel.icon;
            const linkProps = channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Link
                key={channel.id}
                href={channel.href}
                {...linkProps}
                className={`group flex flex-col items-center text-center gap-4 p-6 bg-card border ${channel.colors.border} rounded-2xl hover:shadow-md ${channel.colors.hoverBorder} transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                role="listitem"
                aria-label={`${channel.cta}: ${channel.detail}`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${channel.colors.bg} flex items-center justify-center text-white shrink-0`}
                  aria-hidden="true"
                >
                  <Icon size={28} />
                </div>

                {/* Info */}
                <div className="min-w-0 w-full">
                  <p className="font-semibold text-base text-foreground">
                    {channel.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 truncate px-2">
                    {channel.detail}
                  </p>
                  {channel.extra}
                </div>

                {/* CTA */}
                <span
                  className={`text-sm font-medium ${channel.colors.text} group-hover:underline mt-auto`}
                >
                  {channel.cta}
                  <span aria-hidden="true"> →</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
