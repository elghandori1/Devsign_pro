import Link from "next/link";
import { Locale } from "@/i18n-config";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { Users } from "lucide-react";

interface ContactTranslations {
  sectionLabel: string;
  description: string;
  cta: string;
  email: string;
  emailAddress: string;
  emailHref: string;
  emailCta: string;
  whatsapp: string;
  phoneNumber: string;
  whatsappNumber: string;
  whatsappCta: string;
  instagram: string;
  instagramUrl: string;
  instagramLabel: string;
  instagramCta: string;
  instagramHandle: string;
  instagramFollowers: string;
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

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            {translations.sectionLabel}
          </h2>
          <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            {translations.description}
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"  dir="ltr">
          {/* WhatsApp */}
          <Link
            href={`https://wa.me/${translations.whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-4 p-6 bg-card border border-green-500/40 rounded-2xl hover:shadow-md hover:border-green-500/60 transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center text-white">
              <BsWhatsapp size={30} />
            </div>

            <div>
              <h4 className="font-semibold text-base">
                {translations.whatsapp}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {translations.phoneNumber}
              </p>
            </div>

            <span className="text-sm font-medium text-green-600 dark:text-green-400 group-hover:underline">
              {translations.whatsappCta} →
            </span>
          </Link>

          {/* Email */}
          <Link
            href={translations.emailHref}
            className="flex flex-col items-center text-center gap-4 p-6 bg-card border border-blue-500/40 rounded-2xl hover:shadow-md hover:border-blue-500/60 transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
              <MdEmail size={30} />
            </div>

            <div>
              <h4 className="font-semibold text-base">
                {translations.email}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {translations.emailAddress}
              </p>
            </div>

            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
              {translations.emailCta} →
            </span>
          </Link>

          {/* Instagram */}
          <Link
            href={translations.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-4 p-6 bg-card border border-pink-500/40 rounded-2xl hover:shadow-md hover:border-pink-500/60 transition group"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
              style={{
                background:
                  "radial-gradient(circle at 30% 110%, #f9a825 0%, #f06292 40%, #ce93d8 70%, #7c4dff 100%)",
              }}
            >
              <FaInstagram size={30} />
            </div>

            <div>
              <h4 className="font-semibold text-base">
                {translations.brandName}
              </h4>

              <p className="text-sm text-muted-foreground mt-1">
                {translations.instagramHandle}
              </p>

              <div className="flex items-center justify-center gap-1 mt-2 text-xs">
                <span className="font-semibold text-pink-600">
                  {translations.instagramFollowers}
                </span>
                <Users size={12} className="text-pink-500" />
                <span className="text-muted-foreground">
                  {translations.instagramLabel}
                </span>
              </div>
            </div>

            <span
              className="text-sm font-medium group-hover:underline"
              style={{ color: "#c13584" }}
            >
              {translations.instagramCta} →
            </span>
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <i className="inline-flex px-6 py-3 text-primary font-semibold">
           "{translations.cta}" 
          </i>
        </div>
      </div>
    </section>
  );
}