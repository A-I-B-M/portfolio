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
        {/* Fixed ambient accent glow layers (overflow-hidden prevents horizontal scroll) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* Top-center primary hero glow (~800px, blur 120px, 12% dark / 8% light) */}
          <div
            className="animate-glow-drift-a absolute -top-44 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(var(--accent-rgb), 0.13) 0%, rgba(var(--accent-rgb), 0.04) 48%, transparent 74%)',
            }}
          />

          {/* Faint mid-page right glow (~9% opacity) */}
          <div
            className="animate-glow-drift-b absolute top-[42%] -right-48 h-[520px] w-[520px] rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(circle at center, rgba(var(--accent-rgb), 0.095) 0%, transparent 70%)',
            }}
          />

          {/* Faint lower-left glow near Contact (~10% opacity) */}
          <div
            className="animate-glow-drift-a absolute -bottom-44 -left-40 h-[500px] w-[620px] rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(var(--accent-rgb), 0.10) 0%, transparent 72%)',
            }}
          />
        </div>

        {/* Soft edge vignette */}
        <div
          aria-hidden="true"
          className="bg-vignette pointer-events-none fixed inset-0 -z-10"
        />

        {/* Subtle full-page grain overlay (3.5-4% opacity) */}
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
          <div className="section-divider" aria-hidden="true" />
          <div className="section-band">
            <About />
          </div>
          <div className="section-divider" aria-hidden="true" />
          <Skills />
          <div className="section-divider" aria-hidden="true" />
          <div className="section-band">
            <Projects />
          </div>
          <div className="section-divider" aria-hidden="true" />
          <Experience />
          <div className="section-divider" aria-hidden="true" />
          <div className="section-band">
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
