"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";

type ContactFormData = {
  heading: string;
  subheading: string;
  availability: string;
  fullNamePlaceholder: string;
  emailAddress: string;
  emailPlaceholder: string;
  projectType: string;
  projectTypePlaceholder: string;
  projectTypes: {
    website: string;
    ecommerce: string;
    dashboard: string;
    seo: string;
    collaboration: string;
    other: string;
  };
  message: string;
  messagePlaceholder: string;
  sending: string;
  successMessage: string;
  copied: string;
  copy: string;
  responseNote: string;
  privacyNote: string;
  errors: {
    emailRequired: string;
    emailInvalid: string;
    projectTypeRequired: string;
    messageRequired: string;
    somethingWentWrong: string;
    networkError: string;
    selectProjectType: string;
  };
};

interface Props {
  formData: ContactFormData;
  sendMessage: string;
  orWrite: string;
  email: string;
}

export default function ContactForm({
  formData,
  sendMessage,
  orWrite,
  email,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [formStartTime] = useState(Date.now());

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const validateForm = (formDataObj: FormData) => {
    const errors: Record<string, string> = {};
    const emailVal = formDataObj.get("email") as string;
    const projectType = formDataObj.get("projectType") as string;
    const message = formDataObj.get("message") as string;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) errors.email = formData.errors.emailRequired;
    else if (!emailPattern.test(emailVal.trim())) errors.email = formData.errors.emailInvalid;
    if (!projectType || projectType === "")
      errors.projectType = formData.errors.projectTypeRequired;
    if (!message || message.trim().length < 10)
      errors.message = formData.errors.messageRequired;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const formDataObj = new FormData(e.currentTarget);
    if (!validateForm(formDataObj)) {
      setLoading(false);
      return;
    }

    const payload = {
      email: formDataObj.get("email"),
      projectType: formDataObj.get("projectType"),
      message: formDataObj.get("message"),
      company: formDataObj.get("company"),
      formTime: formStartTime,
    };

    try {
      const response = await fetch("/api/Email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { success: false, error: await response.text() };

      if (response.ok && result.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(result.error || formData.errors.somethingWentWrong);
      }
    } catch (err) {
      setError(formData.errors.networkError);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-0 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-border">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
          {formData.heading}
        </h3>
        <p className="text-sm text-muted-foreground">{formData.subheading}</p>
      </div>

      <div className="px-5 sm:px-8 py-6 sm:py-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 sm:space-y-5"
        >
          {/* Honeypot */}
          <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
              {formData.emailAddress} <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              id="contact-email"
              type="email"
              required
              placeholder={formData.emailPlaceholder}
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              className="min-h-12 w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {fieldErrors.email && (
              <p id="contact-email-error" className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="contact-project-type" className="block text-sm font-medium text-foreground mb-1.5">
              {formData.projectType} <span className="text-red-500">*</span>
            </label>
            <select
              name="projectType"
              id="contact-project-type"
              required
              aria-invalid={Boolean(fieldErrors.projectType)}
              aria-describedby={fieldErrors.projectType ? "contact-project-type-error" : undefined}
              className="min-h-12 min-w-0 max-w-full w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              <option value="">{formData.projectTypePlaceholder}</option>
              <option value="seo">{formData.projectTypes.seo}</option>
              <option value="website">{formData.projectTypes.website}</option>
              <option value="ecommerce">{formData.projectTypes.ecommerce}</option>
              <option value="dashboard">{formData.projectTypes.dashboard}</option>
              <option value="collaboration">{formData.projectTypes.collaboration}</option>
              <option value="other">{formData.projectTypes.other}</option>
            </select>
            {fieldErrors.projectType && (
              <p id="contact-project-type-error" className="text-red-500 text-xs mt-1">{fieldErrors.projectType}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
              {formData.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              required
              name="message"
              id="contact-message"
              placeholder={formData.messagePlaceholder}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-y"
            />
            {fieldErrors.message && (
              <p id="contact-message-error" className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div role="alert" className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}
          {success && (
            <div role="status" aria-live="polite" className="p-3 text-sm text-green-600 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center gap-2">
              <CheckCircle size={16} />
              {formData.successMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="min-h-12 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{loading ? formData.sending : sendMessage}</span>
            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          </button>
          <p className="text-center text-xs leading-relaxed text-muted-foreground">{formData.responseNote}</p>
          <p className="text-center text-xs leading-relaxed text-muted-foreground">{formData.privacyNote}</p>
        </form>

        {/* Copy email strip */}
        <div className="mt-6 pt-5 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2.5">{orWrite}</p>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg bg-background border border-border">
            <Mail
              size={13}
              className="text-muted-foreground shrink-0"
              aria-hidden="true"
            />
            <code className="text-sm text-foreground truncate flex-1 min-w-0">
              {email}
            </code>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="min-h-11 text-xs px-3 py-2 rounded-md border border-border bg-muted/15 hover:bg-muted/30 transition-colors shrink-0 font-medium"
            >
              {copied ? formData.copied : formData.copy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
