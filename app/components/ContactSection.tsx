import Link from "next/link";
import { Locale } from "@/i18n-config";
import { MdEmail } from "react-icons/md";
import { ArrowRight } from "lucide-react";
import { BsWhatsapp, BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
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
}: ContactSectionProps) {
  if (!translations) return null;
  const channels = [
    {
      id: "whatsapp",
      href:
        infos.whatsappLink ||
        `https://wa.me/${infos.whatsappNumber?.replace(/\D/g, "")}`,
      icon: BsWhatsapp,
      title: translations.whatsapp,
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
      cta: translations.emailCta,
      colors: {
        bg: "bg-orange-600",
        border: "border-orange-600/40",
        hoverBorder: "hover:border-orange-500/60",
        text: "text-orange-600 dark:text-orange-400",
      },
      external: false,
    },
    {
      id: "linkedin",
      href: infos.social?.linkedin || "#",
      icon: BsLinkedin,
      title: translations.linkedin,
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
      cta: translations.instagramCta,
      colors: {
        bg: "bg-gradient-to-tr from-[#f9a825] via-[#f06292] to-[#7c4dff]",
        border: "border-pink-500/40",
        hoverBorder: "hover:border-pink-500/60",
        text: "text-[#c13584]",
      },
      external: true
    },
  ];

  return (
    <div className="pb-4 sm:pb-8 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Heading & Description ── */}
        <div className="mb-7 text-center sm:mb-10">
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {translations.description}
          </p>
        </div>

        {/* ── Contact Cards ── */}
        <ul className="m-0 mx-auto grid max-w-5xl list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const linkProps = channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <li key={channel.id}>
                <Link
                  href={channel.href}
                  {...linkProps}
                  className={`group flex min-h-40 flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center ${channel.colors.border} hover:shadow-md ${channel.colors.hoverBorder} transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-44 sm:gap-4 sm:p-6`}
                  aria-label={`${channel.title}: ${channel.cta}`}
                >
                  {/* Icon */}
                  <div
                    className={`flex size-13 shrink-0 items-center justify-center rounded-2xl text-white sm:size-14 ${channel.colors.bg}`}
                    aria-hidden="true"
                  >
                    <Icon size={28} />
                  </div>

                  <p className="font-semibold text-base text-foreground">
                    {channel.title}
                  </p>

                  {/* CTA */}
                  <span
                    className={`text-sm font-medium ${channel.colors.text} group-hover:underline mt-auto`}
                  >
                    {channel.cta}
                    <ArrowRight className="ms-1 inline size-4 align-[-0.125em]" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
