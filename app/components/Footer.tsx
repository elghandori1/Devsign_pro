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
  servicesTitle: string;
  servicesLinks: FooterLink[];
  legalLinks: FooterLink[];
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
  },
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
      dir={isRtl ? "rtl" : "ltr"}
      className="border-t border-border bg-background hero-section-light"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ── Brand & Contact (NAP — local SEO) ── */}
          <div className="space-y-6">
            <p className="font-bold text-xl text-foreground leading-tight">
              {footer.brandName}
              <span className="block text-xs font-medium text-muted-foreground mt-1">
                {footer.brandTagline}
              </span>
            </p>

            {/* address = semantic contact block for crawlers */}
            <address className="not-italic">
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${infos.email}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MdEmail
                      size={16}
                      className="text-primary shrink-0"
                      aria-hidden="true"
                    />
                    {infos.email}
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:${infos.phoneNumberLink.replace(/\s/g, "")}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MdPhone
                      size={16}
                      className="text-primary shrink-0"
                      aria-hidden="true"
                    />
                    <span dir="ltr">{footer.phone}</span>
                  </a>
                </li>

                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MdLocationOn
                    size={16}
                    className="text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{footer.address}</span>
                </li>
              </ul>
            </address>
          </div>

          {/* ── Explore ── */}
          <nav aria-labelledby="footer-explore-heading">
            <h2
              id="footer-explore-heading"
              className="text-sm font-semibold text-foreground mb-5"
            >
              {footer.ExplorerTitle}
            </h2>
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
          </nav>

          {/* ── Services — internal linking to money pages ── */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="text-sm font-semibold text-foreground mb-5"
            >
              {footer.servicesTitle}
            </h2>
            <ul className="space-y-3">
              {footer.servicesLinks.map((link) => (
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
          </nav>

          {/* ── Contact & Socials ── */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-5">
                {footer.contactTitle}
              </h2>
              <ul className="flex flex-wrap gap-3 list-none p-0">
                {contacts.map(({ id, icon: Icon, href, label, bg }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground mb-5">
                {footer.followTitle}
              </h2>
              <ul className="flex flex-wrap gap-3 list-none p-0">
                {socials.map(({ id, icon: Icon, href, label, bg }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center text-white hover:opacity-80 transition-opacity`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer bottom: copyright + legal ── */}
      <div className="border-t border-border bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-center sm:text-start order-2 sm:order-1">
            {copyright}
          </p>
          <nav aria-label="Legal" className="order-1 sm:order-2">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 list-none p-0">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  {link.href.endsWith(".xml") ? (
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-white/85 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-xs sm:text-sm text-white/85 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}