import Link from "next/link";
import { Locale } from "@/i18n-config";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterTranslations {
  brandName: string;
  brandTagline: string;
  email: string;
  phone: string;
  address: string;
  aboutTitle: string;
  links: FooterLink[];
  followTitle: string;
  copyright: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
}

interface FooterProps {
  footer: FooterTranslations;
  locale: Locale;
}

const socials = [
  {
    id: "facebook",
    icon: FaFacebookF,
    href: "https://facebook.com/devsignpro",
    label: "Facebook",
    bg: "bg-[#1877F2]",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    href: "https://instagram.com/devsign_pro",
    label: "Instagram",
    bg: "bg-gradient-to-br from-[#f9a825] via-[#f06292] to-[#7c4dff]",
  },
  {
    id: "linkedin",
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/mohammed_devsign",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    href: "https://wa.me/+212612345678",
    label: "WhatsApp",
    bg: "bg-[#25D366]",
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
      className="border-t border-border bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand & Contact */}
          <div className="space-y-6">
            <div>
              <p className="font-bold text-xl text-foreground leading-tight">{footer.brandName}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{footer.brandTagline}</p>
            </div>

            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MdEmail size={16} className="text-primary shrink-0" />
                  {footer.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MdLocationOn size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{footer.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${footer.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MdPhone size={16} className="text-primary shrink-0" />
                  {footer.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5">{footer.aboutTitle}</h3>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-5">{footer.followTitle}</h3>
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

      {/* Footer bottom */}
      <div className="border-t border-border bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center">
          <p className="text-xs sm:text-sm text-primary-foreground/80 text-center sm:text-start">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}