import { useEffect, useState } from 'react';

interface TypingRolesProps {
  roles: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  respectReducedMotion?: boolean;
  className?: string;
}

function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function TypingRoles({
  roles,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
  respectReducedMotion = false,
  className = '',
}: TypingRolesProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    getInitialReducedMotion,
  );
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const isStatic = respectReducedMotion && prefersReducedMotion;

  useEffect(() => {
    if (!respectReducedMotion) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [respectReducedMotion]);

  useEffect(() => {
    if (isStatic || roles.length === 0) {
      return;
    }

    const currentRole = roles[roleIndex % roles.length];
    let delay = typingSpeed;

    if (!isDeleting && charCount === currentRole.length) {
      delay = pauseDuration;
    } else if (isDeleting && charCount > 0) {
      delay = deletingSpeed;
    } else if (isDeleting && charCount === 0) {
      delay = 220;
    }

    const timerId = window.setTimeout(() => {
      if (!isDeleting) {
        if (charCount < currentRole.length) {
          setCharCount((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charCount > 0) {
          setCharCount((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, delay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [
    isStatic,
    roles,
    roleIndex,
    charCount,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  if (roles.length === 0) {
    return null;
  }

  const currentRole = roles[roleIndex % roles.length];
  const visibleText = isStatic ? roles[0] : currentRole.slice(0, charCount);

  return (
    <span
      aria-label={roles.join(', ')}
      className={`flex min-h-[1.35em] max-w-full items-center whitespace-nowrap leading-[1.3] text-[var(--accent)] ${className}`}
    >
      <span aria-hidden="true">{visibleText}</span>
      {!isStatic && (
        <span
          aria-hidden="true"
          className="typing-cursor ml-1 inline-block h-[0.95em] w-[2px] shrink-0 rounded-full bg-[var(--accent)]"
        />
      )}
    </span>
  );
}
