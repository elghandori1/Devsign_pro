"use client";

import { useState } from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp, BsInstagram, BsLinkedin } from "react-icons/bs";
import {
  MapPin,
  ArrowRight,
  MessageCircle,
  Calendar,
  Headphones,
  Clock,
  Coffee,
  Sparkles,
  CheckCircle,
  Globe,
  Mail,
  Heart,
  Github,
} from "lucide-react";

interface ContactData {
  subtitle: string;
  heading: string;
  description: string;
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  location: string;
  sendMessage: string;
  orWrite: string;
  chooseWay: string;
  getInTouch: string;
  quickResponses: {
    response24h: string;
    freeConsultation: string;
    noObligation: string;
    worldwide: string;
  };
  channels: {
    emailDescription: string;
    whatsappDescription: string;
    instagramDescription: string;
    linkedinDescription: string;
  };
  form: {
    heading: string;
    subheading: string;
    fullNamePlaceholder: string;
    emailAddress: string;
    emailPlaceholder: string;
    projectType: string;
    projectTypePlaceholder: string;
    projectTypes: {
      website: string;
      automation: string;
      ai: string;
      design: string;
      other: string;
    };
    message: string;
    messagePlaceholder: string;
    successMessage: string;
  };
  whyReachOut?: {
    title: string;
    subtitle: string;
    reasons: Array<{ title: string; text: string }>;
  };
}

interface ContactClientProps {
  data: ContactData;
  locale: string;
  isRtl: boolean;
  email: string;
  whatsappNumber: string;
  instagramHandle: string;
  githubHandle: string;
  linkedinHandle: string;
}

export default function ContactClient({
  data,
  isRtl,
  email,
  whatsappNumber,
  instagramHandle,
  githubHandle,
  linkedinHandle,
}: ContactClientProps) {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null,
  );

  const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
  const instagramLink = `https://instagram.com/${instagramHandle}`;
  const githubLink = `https://github.com/${githubHandle}`;
  const linkedinLink = `https://linkedin.com/in/${linkedinHandle}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => setFormStatus(null), 3000);
  };

  const channels = [
    {
      label: data.email,
      href: `mailto:${email}`,
      icon: MdEmail,
      description: data.channels.emailDescription,
    },
    {
      label: data.whatsapp,
      href: waLink,
      icon: BsWhatsapp,
      description: data.channels.whatsappDescription,
    },
    {
      label: data.instagram,
      href: instagramLink,
      icon: BsInstagram,
      description: data.channels.instagramDescription,
    },
    {
      label: data.linkedin,
      href: linkedinLink,
      icon: BsLinkedin,
      description: data.channels.linkedinDescription,
    },
  ];
  const quickResponses = [
    { icon: Clock, text: data.quickResponses.response24h },
    { icon: Coffee, text: data.quickResponses.freeConsultation },
    { icon: Sparkles, text: data.quickResponses.noObligation },
    { icon: Globe, text: data.quickResponses.worldwide },
  ];

  return (
    <div
      className="min-h-screen bg-background hero-section-light overflow-hidden transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 ">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 px-2">
              {data.heading}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 px-4">
              {data.description}
            </p>

            {/* Quick Response Stats */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 px-4">
              {quickResponses.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-card rounded-full border border-border"
                >
                  <item.icon size={14} className="text-primary sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">
            {data.subtitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 flex items-center gap-2">
                <Mail size={20} className="text-primary sm:w-6 sm:h-6" />
                {data.chooseWay}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {channels.map((channel, idx) => {
                  const Icon = channel.icon;
                  return (
                    <Link
                      key={channel.label}
                      href={channel.href}
                      target={
                        channel.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        channel.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`group relative overflow-hidden p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-transparent`}
                    >
                      <div
                        className={`absolute inset-0 card opacity-0 group-hover:opacity-100 transition-opacity`}
                      />
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                          <Icon
                            size={20}
                            className="text-primary sm:w-6 sm:h-6 transition-colors"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                          {channel.label}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                          {channel.description}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-primary">
                          <span>{data.getInTouch}</span>
                          <ArrowRight
                            size={12}
                            className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Location */}
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin
                      size={18}
                      className="text-primary sm:w-5 sm:h-5 flex-shrink-0"
                    />
                    <span className="text-sm sm:text-base text-foreground font-medium">
                      {data.location}
                    </span>
                  </div>

                  {/* GitHub Link */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Github
                      size={18}
                      className="text-primary sm:w-5 sm:h-5 flex-shrink-0"
                    />
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-foreground font-medium hover:text-primary transition-colors"
                    >
                      @{githubHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-border bg-card shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                {data.form.heading}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
                {data.form.subheading}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {data.form.emailAddress}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background text-foreground text-sm sm:text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {data.form.projectType}
                  </label>
                  <select className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary transition">
                    <option value="">{data.form.projectTypePlaceholder}</option>
                    <option value="website">
                      {data.form.projectTypes.website}
                    </option>
                    <option value="automation">
                      {data.form.projectTypes.automation}
                    </option>
                    <option value="ai">{data.form.projectTypes.ai}</option>
                    <option value="design">
                      {data.form.projectTypes.design}
                    </option>
                    <option value="other">
                      {data.form.projectTypes.other}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {data.form.message}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={data.form.messagePlaceholder}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background text-foreground text-sm sm:text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-medium hover:opacity-90 transition"
                >
                  {data.sendMessage}
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </button>

                {formStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600 text-xs sm:text-sm font-medium mt-2">
                    <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                    {data.form.successMessage}
                  </div>
                )}
              </form>

              {/* Email Copy */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  {data.orWrite}
                </p>

                <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-hidden">
                    <Mail size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                    <code className="text-foreground truncate">{email}</code>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-border hover:bg-muted transition flex-shrink-0"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Reach Out Section */}
      {data.whyReachOut?.reasons && data.whyReachOut.reasons.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-muted/10 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap px-4">
                <Heart size={24} className="text-primary sm:w-8 sm:h-8" />
                {data.whyReachOut.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                {data.whyReachOut.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {data.whyReachOut.reasons.map((reason, index) => {
                const icons = [MessageCircle, Calendar, Headphones];
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={reason.title}
                    className="group relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
