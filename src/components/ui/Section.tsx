import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
}

export function Section({ id, children, className = '', ariaLabelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`border-t border-[var(--border)] py-16 lg:py-28 ${className}`}
    >
      <div className="container-editorial">{children}</div>
    </section>
  );
}
