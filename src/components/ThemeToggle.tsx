import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--fg-muted)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:text-[var(--fg)]"
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-200" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-200" aria-hidden="true" />
      )}
    </button>
  );
}
