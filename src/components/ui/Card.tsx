import type { MouseEvent, ReactNode } from 'react';
import { useCallback, useRef } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export function Card({ children, className = '', hoverLift = true }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card rounded-2xl ${
        hoverLift ? 'hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
