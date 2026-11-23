import { useMemo } from 'react';
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

export function App() {
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(
    () => siteContent.navLinks.map((link) => link.id),
    [],
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        {/* Ambient top gradient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] overflow-hidden"
        >
          <div className="mx-auto h-full max-w-5xl bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,var(--accent-soft),transparent_72%)]" />
        </div>

        {/* Faint texture overlay */}
        <div
          aria-hidden="true"
          className="bg-grain pointer-events-none fixed inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04]"
        />

        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={activeSection}
        />

        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
