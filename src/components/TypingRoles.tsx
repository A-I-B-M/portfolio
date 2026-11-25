import { useEffect, useState } from 'react';

interface TypingRolesProps {
  roles: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

type Phase = 'typing' | 'pausing' | 'deleting';

function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function TypingRoles({
  roles,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
  className = '',
}: TypingRolesProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    getInitialReducedMotion,
  );
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || roles.length === 0) {
      return;
    }

    const currentRole = roles[roleIndex % roles.length];
    let timerId: number;

    if (phase === 'typing') {
      if (charCount < currentRole.length) {
        timerId = window.setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timerId = window.setTimeout(() => {
          setPhase('pausing');
        }, 0);
      }
    } else if (phase === 'pausing') {
      timerId = window.setTimeout(() => {
        setPhase('deleting');
      }, pauseDuration);
    } else {
      if (charCount > 0) {
        timerId = window.setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        timerId = window.setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setPhase('typing');
        }, typingSpeed);
      }
    }

    return () => {
      window.clearTimeout(timerId);
    };
  }, [
    prefersReducedMotion,
    roles,
    roleIndex,
    charCount,
    phase,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  if (roles.length === 0) {
    return null;
  }

  const currentRole = roles[roleIndex % roles.length];
  const visibleText = prefersReducedMotion
    ? roles[0]
    : currentRole.slice(0, charCount);

  return (
    <span
      aria-label={roles.join(', ')}
      className={`flex min-h-[1.35em] max-w-full items-center whitespace-nowrap leading-[1.3] text-[var(--accent)] ${className}`}
    >
      <span aria-hidden="true">{visibleText}</span>
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="typing-cursor ml-1 inline-block h-[0.95em] w-[2px] shrink-0 rounded-full bg-[var(--accent)]"
        />
      )}
    </span>
  );
}
