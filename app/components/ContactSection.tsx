import Link from "next/link";
import { Locale } from "@/i18n-config";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { Users, Star } from "lucide-react";

interface ContactTranslations {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  whatsapp: string;
  instagram: string;
  location: string;
  cta: string;
}

interface ContactSectionProps {
  translations: ContactTranslations;
  locale: Locale;
  emailHref?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
}

export default function ContactSection({
  translations,
  locale,
  emailHref = "mailto:contact@devsign.com",
  whatsappNumber = "212612345678",
  instagramUrl = "https://www.instagram.com/yourpage",
}: ContactSectionProps) {
  if (!translations) return null;

  const isRtl = locale === "ar";
  const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  const phoneNumber = "+212 6 12 34 56 78";
  const emailAddress = "contact@devsign.com";

  const instagramHandle = "@yourpage";
  const followerCount = "+1K";
  const reviewCount = "20+";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-12 sm:py-16 md:py-20"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
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

          <p className="text-muted-foreground leading-relaxed">
            {translations.description}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT COLUMN — WhatsApp + Email */}
            <div className="space-y-6">

              {/* WhatsApp Card */}
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white transition-colors">
                    <BsWhatsapp size={26} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-foreground">
                      {translations.whatsapp}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <span className="text-sm font-medium text-primary group-hover:underline">
                  Chat now
                </span>
              </Link>


              {/* Email Card */}
              <Link
                href={emailHref}
                className="flex items-center justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <MdEmail size={26} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-foreground">
                      {translations.email}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {emailAddress}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <span className="text-sm font-medium text-primary group-hover:underline">
                  Send message
                </span>
              </Link>

            </div>
            {/* RIGHT COLUMN — Instagram */}
            <div className="bg-card border border-gray-200 rounded-2xl p-6 md:p-8">

              {/* Instagram Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <FaInstagram size={24} />
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-foreground">
                    {translations.instagram}
                  </h4>

                  <p className="text-gray-500 dark:text-gray-400">
                    {instagramHandle}
                  </p>
                </div>
              </div>

              {/* Instagram Stats */}
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-card/50 rounded-xl p-5 text-center border border-gray-100 dark:bg-gray-800/50 ">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                  <div className="text-2xl font-bold dark:text-white">
                    {followerCount}
                  </div>
                  <div className="text-sm text-foreground">
                    Followers
                  </div>
                </div>

                <div className="bg-card/50 rounded-xl p-5 text-center border border-gray-100 dark:bg-gray-800/50">
                  <Star className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                  <div className="text-2xl font-bold dark:text-white">
                    {reviewCount}
                  </div>
                  <div className="text-sm text-foreground">
                    Client Reviews
                  </div>
                </div>
              </div>

              {/* Instagram Link */}
              <div className="mt-6 text-center">
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-900 transition-colors dark:text-blue-400 dark:hover:text-blue-500 "
                >
                  <FaInstagram size={18} />
                  <span>Visit our Instagram</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}