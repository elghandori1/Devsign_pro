import Link from "next/link";

export const LinkCard = ({ href, content }: { href: string; content: string }) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        {content}
    </div>

    <Link
      href={href}
      className="flex flex-wrap text-sm text-primary underline hover:text-primary/50 transition-colors break-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {href}
    </Link>
  </div>
);