import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const styles =
    variant === 'accent'
      ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/25'
      : 'bg-[var(--surface-elevated)] text-[var(--fg-muted)] border border-[var(--border-subtle)]';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-none tracking-tight ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
