import { ArrowUp } from 'lucide-react';
import { siteContent } from '../data/content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container-editorial flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="type-meta text-[var(--text-muted)]">
          &copy; {year} {siteContent.personal.name}
        </p>
        <a
          href="#top"
          aria-label="Back to top"
          className="type-meta inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
