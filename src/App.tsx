import { useEffect, useMemo } from 'react';
import { MotionConfig } from 'framer-motion';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { siteContent } from './data/content';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';
import { cancelSmoothScroll, smoothScrollToHash } from './utils/smoothScroll';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(
    () => siteContent.navLinks.map((link) => link.id),
    [],
  );
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      if (smoothScrollToHash(href)) {
        event.preventDefault();
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelSmoothScroll();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={activeSection}
        />

        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
