import { ArrowUp } from 'lucide-react';
import { siteContent } from '../data/content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface)]/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-[var(--fg-subtle)] sm:flex-row sm:px-8">
        <p>
          &copy; {year} {siteContent.personal.name}. All rights reserved.
        </p>

        <a
          href="#top"
          aria-label="Back to top"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
