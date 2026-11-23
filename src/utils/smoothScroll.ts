const STICKY_NAV_OFFSET = 84;

let activeFrameId: number | null = null;
let cleanupListeners: (() => void) | null = null;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function cancelSmoothScroll(): void {
  if (activeFrameId !== null) {
    window.cancelAnimationFrame(activeFrameId);
    activeFrameId = null;
  }
  if (cleanupListeners) {
    cleanupListeners();
    cleanupListeners = null;
  }
}

export function smoothScrollToHash(hash: string): boolean {
  if (!hash || !hash.startsWith('#')) return false;

  const id = hash.slice(1);
  let targetY = 0;

  if (id !== 'top' && id !== '') {
    const target = document.getElementById(id);
    if (!target) return false;
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const rawY = target.getBoundingClientRect().top + window.scrollY - STICKY_NAV_OFFSET;
    targetY = Math.min(Math.max(0, rawY), maxScroll);
  }

  cancelSmoothScroll();

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    return true;
  }

  // Scale duration smoothly between 520ms and 880ms based on travel distance
  const duration = Math.min(880, Math.max(520, Math.abs(distance) * 0.42));
  const startTime = performance.now();

  const root = document.documentElement;
  const prevScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  const onUserInterrupt = () => {
    cancelSmoothScroll();
  };

  window.addEventListener('wheel', onUserInterrupt, { passive: true });
  window.addEventListener('touchstart', onUserInterrupt, { passive: true });
  window.addEventListener('keydown', onUserInterrupt);

  cleanupListeners = () => {
    root.style.scrollBehavior = prevScrollBehavior;
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchstart', onUserInterrupt);
    window.removeEventListener('keydown', onUserInterrupt);
  };

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startY + distance * eased));

    if (progress < 1) {
      activeFrameId = window.requestAnimationFrame(step);
    } else {
      cancelSmoothScroll();
    }
  };

  activeFrameId = window.requestAnimationFrame(step);

  if (window.history && typeof window.history.pushState === 'function') {
    const nextUrl = id === 'top' ? window.location.pathname + window.location.search : hash;
    window.history.pushState(null, '', nextUrl);
  }

  return true;
}
