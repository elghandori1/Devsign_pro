interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Kept for call-site compatibility; the CSS reveal is driven by scroll position. */
  delay?: number;
  subtle?: boolean;
}

/**
 * Fade-and-rise on scroll with no JavaScript.
 *
 * The animation is a CSS scroll-driven animation (see `.scroll-reveal` in
 * globals.css). Content is fully visible in the HTML, so crawlers, browsers
 * without `animation-timeline` support and users who prefer reduced motion all
 * see it immediately.
 */
export default function ScrollReveal({
  children,
  className = "",
  subtle = false,
}: ScrollRevealProps) {
  return (
    <div
      className={`scroll-reveal ${subtle ? "scroll-reveal-subtle" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
