"use client";

import { useState } from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp, BsInstagram, BsLinkedin } from "react-icons/bs";
import {
  MapPin, ArrowRight, MessageCircle, Calendar, Headphones,
  Clock, Coffee, Sparkles, CheckCircle, Globe, Mail, Heart, Github,
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
  copy: string;
  copied: string;
  availability: string;
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
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);

  const waLink        = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
  const instagramLink = `https://instagram.com/${instagramHandle}`;
  const githubLink    = `https://github.com/${githubHandle}`;
  const linkedinLink  = `https://linkedin.com/in/${linkedinHandle}`;

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
    { label: data.email,     href: `mailto:${email}`, icon: MdEmail,      description: data.channels.emailDescription },
    { label: data.whatsapp,  href: waLink,             icon: BsWhatsapp,   description: data.channels.whatsappDescription },
    { label: data.instagram, href: instagramLink,      icon: BsInstagram,  description: data.channels.instagramDescription },
    { label: data.linkedin,  href: linkedinLink,       icon: BsLinkedin,   description: data.channels.linkedinDescription },
  ];

  const quickResponses = [
    { icon: Clock,    text: data.quickResponses.response24h },
    { icon: Coffee,   text: data.quickResponses.freeConsultation },
    { icon: Sparkles, text: data.quickResponses.noObligation },
    { icon: Globe,    text: data.quickResponses.worldwide },
  ];

  const WHY_ICONS = [MessageCircle, Calendar, Headphones];

  return (
    <div
      className="min-h-screen bg-background transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden hero-section-light border-b border-border">
        {/* grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* ambient glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          {/* availability pill */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary
                          border border-primary/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            {data.form.availability}
          </div>

          {/* h1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight
                         text-foreground mb-5 leading-[1.1]">
            {data.heading}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {data.description}
          </p>

          {/* quick response badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {quickResponses.map((item, idx) => (
              <div key={idx}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2
                           bg-card rounded-full border border-border">
                <item.icon size={13} className="text-primary shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CONTACT GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* h2 section label */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10 sm:mb-14">
          {data.subtitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">

          {/* ── LEFT: channels + location ── */}
          <div className="flex flex-col gap-6">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground">
              <Mail size={18} className="text-primary shrink-0" aria-hidden="true" />
              {data.chooseWay}
            </h3>

            {/* 2×2 channel grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative flex flex-col p-4 sm:p-5 rounded-xl border border-border
                               bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5
                               transition-all duration-200 overflow-hidden"
                  >
                    {/* hover shimmer */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                                    via-primary/40 to-transparent opacity-0 group-hover:opacity-100
                                    transition-opacity" aria-hidden="true" />

                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center
                                    mb-3 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>

                    <span className="text-sm font-semibold text-foreground mb-0.5 leading-tight">
                      {channel.label}
                    </span>
                    <span className="text-xs text-muted-foreground mb-3 leading-relaxed flex-1">
                      {channel.description}
                    </span>

                    <div className={`inline-flex items-center gap-1 text-xs font-medium text-primary
                                     ${isRtl ? "flex-row-reverse" : ""}`}>
                      <span>{data.getInTouch}</span>
                      <ArrowRight size={11}
                        className={`transition-transform duration-200
                          group-hover:${isRtl ? "-translate-x-1" : "translate-x-1"}
                          ${isRtl ? "rotate-180" : ""}`}
                        aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* location + github strip */}
            <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center gap-3 sm:gap-4
                            p-4 sm:p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <MapPin size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground truncate">{data.location}</span>
              </div>

              <div className="w-px h-4 bg-border hidden xs:block shrink-0" aria-hidden="true" />

              <a href={githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 flex-1 min-w-0 group">
                <Github size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary
                                 transition-colors truncate">
                  @{githubHandle}
                </span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: contact form ── */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            {/* form header */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-border">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {data.form.heading}
              </h3>
              <p className="text-sm text-muted-foreground">{data.form.subheading}</p>
            </div>

            <div className="px-5 sm:px-8 py-6 sm:py-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {data.form.emailAddress}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={data.form.emailPlaceholder}
                    className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border
                               bg-background text-foreground text-sm placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                {/* project type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {data.form.projectType}
                  </label>
                  <select
                    className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border
                               bg-background text-foreground text-sm
                               focus:outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="">{data.form.projectTypePlaceholder}</option>
                    <option value="website">{data.form.projectTypes.website}</option>
                    <option value="automation">{data.form.projectTypes.automation}</option>
                    <option value="ai">{data.form.projectTypes.ai}</option>
                    <option value="design">{data.form.projectTypes.design}</option>
                    <option value="other">{data.form.projectTypes.other}</option>
                  </select>
                </div>

                {/* message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {data.form.message}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={data.form.messagePlaceholder}
                    className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border
                               bg-background text-foreground text-sm placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                  />
                </div>

                {/* submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2
                             px-6 py-3 rounded-xl bg-primary text-primary-foreground
                             text-sm sm:text-base font-semibold
                             hover:opacity-90 active:scale-95 transition-all
                             shadow-md shadow-primary/20"
                >
                  {data.sendMessage}
                  <ArrowRight size={15} className={isRtl ? "rotate-180" : ""} aria-hidden="true" />
                </button>

                {/* success feedback */}
                {formStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400
                                  text-sm font-medium">
                    <CheckCircle size={15} aria-hidden="true" />
                    {data.form.successMessage}
                  </div>
                )}
              </form>

              {/* email copy strip */}
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2.5">{data.orWrite}</p>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg
                                bg-background border border-border">
                  <Mail size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <code className="text-sm text-foreground truncate flex-1 min-w-0">{email}</code>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs px-2.5 py-1 rounded-md border border-border
                               bg-muted/15 hover:bg-muted/30 transition-colors shrink-0 font-medium"
                  >
                    {copied ? data.form.copied : data.form.copy}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY REACH OUT ── */}
      {data.whyReachOut?.reasons?.length ? (
        <section className="border-t border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="inline-flex items-center justify-center gap-2 text-2xl sm:text-3xl
                             md:text-4xl font-bold text-foreground mb-3 flex-wrap">
                <Heart size={22} className="text-primary shrink-0" aria-hidden="true" />
                {data.whyReachOut.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.whyReachOut.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {data.whyReachOut.reasons.map((reason, index) => {
                const Icon = WHY_ICONS[index % WHY_ICONS.length];
                return (
                  <div
                    key={reason.title}
                    className="group relative p-5 sm:p-6 md:p-8 rounded-2xl border border-border
                               bg-card hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5
                               transition-all duration-300"
                  >
                    {/* hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent
                                    rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity
                                    pointer-events-none" aria-hidden="true" />
                    {/* top shimmer */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                                    via-primary/40 to-transparent opacity-0 group-hover:opacity-100
                                    transition-opacity rounded-t-2xl" aria-hidden="true" />

                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10
                                      flex items-center justify-center mb-4 sm:mb-5
                                      group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
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
      ) : null}
    </div>
  );
}