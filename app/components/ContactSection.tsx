import Link from "next/link";
import { Locale } from "@/i18n-config";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { MapPin } from "lucide-react";

interface ContactTranslations {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  whatsapp: string;
  facebook: string;
  location: string;
  cta: string;
}

interface ContactSectionProps {
  translations: ContactTranslations;
  locale: Locale;
  /** Replace with your real links */
  emailHref?: string;
  whatsappNumber?: string;
  facebookUrl?: string;
}

export default function ContactSection({
  translations,
  locale,
  emailHref = "mailto:contact@devsign.com",
  whatsappNumber = "212XXXXXXXXX",
  facebookUrl = "https://www.facebook.com/yourpage",
}: ContactSectionProps) {
  if (!translations) return null;
  const isRtl = locale === "ar";
  const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  const links = [
    {
      label: translations.email,
      href: emailHref,
      icon: <MdEmail size={22} className="text-current" />,
      className: "hover:bg-primary hover:text-primary-foreground hover:border-primary",
    },
    {
      label: translations.whatsapp,
      href: waLink,
      icon: <BsWhatsapp size={22} className="text-current" />,
      className: "hover:bg-green-500 hover:text-white hover:border-green-500",
    },
    {
      label: translations.facebook,
      href: facebookUrl,
      icon: <FaFacebookF size={22} className="text-current" />,
      className: "hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-12 sm:py-16 md:py-20 transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
       
          <h2
            id="contact-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            {translations.title}
          </h2>
             <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            {translations.subtitle}
          </p>
          <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed">{translations.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-border
                bg-card text-foreground font-medium transition-all duration-300
                hover:scale-[1.02] active:scale-95
                ${item.className}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden />
          <span>{translations.location}</span>
        </div>
      </div>
    </section>
  );
}
