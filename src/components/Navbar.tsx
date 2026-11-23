import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const { personal, navLinks } = siteContent;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[var(--border-subtle)] bg-[var(--nav-glass)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Logo / Monogram */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--fg)]"
          aria-label={`${personal.name} — Back to top`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] font-display text-sm font-bold tracking-tight text-[var(--fg)] transition-colors duration-200 group-hover:border-[var(--accent)]/50">
            {personal.initials}
            <span
              className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
          </span>
          <span className="hidden font-display text-[15px] font-semibold sm:inline">
            {personal.name}
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--fg)]'
                      : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 -z-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)]"
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
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
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--fg)] transition-colors hover:bg-[var(--surface-elevated)]"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface)] md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--surface-elevated)] text-[var(--fg)]'
                        : 'text-[var(--fg-muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--fg)]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
