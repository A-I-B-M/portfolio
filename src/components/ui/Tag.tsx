import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const styles =
    variant === 'accent'
      ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]'
      : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]';

  return (
    <span
      className={`type-meta inline-flex items-center rounded-[6px] border px-2.5 py-1 leading-none ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
