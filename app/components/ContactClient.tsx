"use client";

import { useState } from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp, BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
import {
  MapPin,
  ArrowRight,
  MessageCircle,
  Calendar,
  Headphones,
  Clock,
  Coffee,
  Sparkles,
  Send,
  CheckCircle,
  Globe,
  Mail,
  Heart,
} from "lucide-react";

interface ContactData {
  subtitle: string;
  heading: string;
  description: string;
  email: string;
  whatsapp: string;
  instagram?: string;
  location: string;
  sendMessage: string;
  orWrite: string;
  whyReachOut?: {
    title: string;
    reasons: Array<{
      title: string;
      text: string;
    }>;
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
  linkedinHandle
}: ContactClientProps) {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

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
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => setFormStatus(null), 3000);
  };

  const channels = [
    {
      label: data.email,
      href: `mailto:${email}`,
      icon: MdEmail,
      color: "hover:bg-primary hover:text-primary-foreground",
      bgColor: "bg-primary/10",
      description: "Response within 24 hours",
    },
    {
      label: data.whatsapp,
      href: waLink,
      icon: BsWhatsapp,
      color: "hover:bg-green-500 hover:text-white",
      bgColor: "bg-green-500/10",
      description: "Fastest response",
    },
    {
      label: "Instagram",
      href: instagramLink,
      icon: BsInstagram,
      color: "hover:bg-pink-500 hover:text-white",
      bgColor: "bg-pink-500/10",
      description: "DM for quick questions",
    },
    {
      label: "LinkedIn",
      href: linkedinLink,
      icon: BsLinkedin,
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-600/10",
      description: "Professional network",
    },
  ];

  const socialLinks = [
    { icon: BsGithub, href: githubLink, label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: BsInstagram, href: instagramLink, label: "Instagram", color: "hover:text-pink-500" },
    { icon: BsLinkedin, href: linkedinLink, label: "LinkedIn", color: "hover:text-blue-600" },
  ];

  const quickResponses = [
    { icon: Clock, text: "Response within 24h" },
    { icon: Coffee, text: "Free consultation" },
    { icon: Sparkles, text: "No obligation quotes" },
    { icon: Globe, text: "Worldwide service" },
  ];

  return (
    <div
      className="min-h-screen min-h-screen bg-background hero-section-light transition-colors duration-300"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <section className="relative overflow-hidden">
        <div className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
          
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {data.heading}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              {data.description}
            </p>

            {/* Quick Response Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              {quickResponses.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                  <item.icon size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
            <h2 className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MessageCircle size={14} />
              {data.subtitle}
            </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Cards */}
            
            <div className="space-y-6">
              
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Mail size={24} className="text-primary" />
                Choose your preferred way
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {channels.map((channel, idx) => {
                  const Icon = channel.icon;
                  return (
                    <Link
                      key={channel.label}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`group relative overflow-hidden p-6 rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${channel.color}`}
                    >
                      <div className={`absolute inset-0 ${channel.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon size={24} className="text-primary group-hover:text-inherit transition-colors" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{channel.label}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <span>Get in touch</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Location & Social */}
              <div className="p-6 rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-foreground font-medium">{data.location}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Send a Message</h2>
              <p className="text-muted-foreground mb-6">I'll get back to you within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-foreground mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select a project type</option>
                    <option value="website">Website Development</option>
                    <option value="automation">Business Automation</option>
                    <option value="ai">AI Integration</option>
                    <option value="design">Ad Design & Branding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
                >
                  <span>{data.sendMessage || "Send Message"}</span>
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                {formStatus === 'success' && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg animate-in fade-in">
                    <CheckCircle size={18} />
                    <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}
              </form>

              {/* Email Quick Copy */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">{data.orWrite}</p>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <code className="flex-1 text-sm font-mono text-foreground">{email}</code>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
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
        <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-muted/10 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                <Heart size={32} className="text-primary" />
                {data.whyReachOut.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here's what makes working with me different
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.whyReachOut.reasons.map((reason, index) => {
                const icons = [MessageCircle, Calendar, Headphones];
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={reason.title}
                    className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-in {
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in {
          animation-name: fade-in;
        }

        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }

        .duration-500 {
          animation-duration: 500ms;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}