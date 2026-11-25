import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { siteContent } from '../data/content';
import type { Theme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
}

export function Navbar({ theme, onToggleTheme, activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { personal, navLinks } = siteContent;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[6px] focus:bg-[var(--accent-strong)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary navigation"
        className="container-editorial flex h-16 items-center justify-between"
      >
        <a
          href="#top"
          className="font-display text-[15px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
          aria-label={`${personal.name} — Back to top`}
        >
          {personal.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative py-1 text-[14px] transition-colors duration-200 ${
                    isActive
                      ? 'font-medium text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute right-0 -bottom-[21px] left-0 h-[2px] bg-[var(--accent)]"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop right controls */}
        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button
            href={personal.cvPath}
            download={personal.cvDownloadName}
            variant="secondary"
            size="sm"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download CV
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[6px] border border-[var(--border)] bg-transparent text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border)] bg-[var(--surface)] md:hidden"
        >
          <div className="container-editorial flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`rounded-[6px] px-3 py-2.5 text-[14px] transition-colors ${
                    isActive
                      ? 'bg-[var(--surface-hover)] font-medium text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="mt-3 border-t border-[var(--border)] pt-3">
              <Button
                href={personal.cvPath}
                download={personal.cvDownloadName}
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
