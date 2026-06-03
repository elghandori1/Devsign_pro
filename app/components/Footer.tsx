import Link from "next/link";
import { Locale } from "@/i18n-config";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import infos from "@/app/dictionaries/global.json";
import { GithubIcon } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterTranslations {
  brandName: string;
  brandTagline: string;
  phone: string;
  address: string;
  ExplorerTitle: string;
  links: FooterLink[];
  followTitle: string;
  contactTitle: string;
  copyright: string;
}

interface FooterProps {
  footer: FooterTranslations;
  locale: Locale;
}

const socials = [
   {
    id: "linkedin",
    icon: FaLinkedinIn,
    href: infos.social.linkedin,
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
  },
  {
    id: "github",
    icon: GithubIcon,
    href: infos.social.github,
    label: "GitHub",
    bg: "bg-[#333]",
  },
  {
    id: "facebook",
    icon: FaFacebookF,
    href: infos.social.facebook,
    label: "Facebook",
    bg: "bg-[#1877F2]",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    href: infos.social.instagram,
    label: "Instagram",
    bg: "bg-gradient-to-br from-[#f9a825] via-[#f06292] to-[#7c4dff]",
  } 
];

const contacts = [
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    href: infos.whatsappLink,
    label: "WhatsApp",
    bg: "bg-[#25D366]",
  },
  {
    id: "email_personal",
    icon: MdEmail,
    href: `mailto:${infos.email_personal}`,
    label: "Personal Email",
    bg: "bg-[#D44638]",
  },
];

export default function Footer({ footer, locale }: FooterProps) {
  if (!footer) return null;

  const isRtl = locale === "ar";
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace("{year}", String(year));

  return (
    <footer
      role="contentinfo"
      dir={isRtl ? "rtl" : "ltr"}
      className="border-t border-border bg-background hero-section-light"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div>
              <p className="font-bold text-xl text-foreground leading-tight">
                {footer.brandName}
              </p>
              {/* <p className="text-sm text-muted-foreground mt-0.5">
                {footer.brandTagline}
              </p> */}
            </div>

            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${infos.email_personal}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MdEmail size={16} className="text-primary shrink-0" />
                  {infos.email_personal}
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${infos.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MdEmail size={16} className="text-primary shrink-0" />
                  {infos.email}
                </a>
              </li>

              <li>
                <a
                  href={`${infos.phoneNumberLink.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MdPhone size={16} className="text-primary shrink-0" />
                  {footer.phone}
                </a>
              </li>

              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MdLocationOn
                  size={16}
                  className="text-primary shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">{footer.address}</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5">
              {footer.ExplorerTitle}
            </h3>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials contact & Socials */}
          <div className="space-y-8">
            {/* Socials contact */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5">
                {footer.contactTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {contacts.map(({ id, icon: Icon, href, label, bg }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-5">
                {footer.followTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ id, icon: Icon, href, label, bg }) => (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-border bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center">
          <p className="text-xs sm:text-sm text-center sm:text-start">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
