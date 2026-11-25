import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { siteContent } from '../data/content';
import { images } from '../data/images';
import { TypingRoles } from './TypingRoles';
import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import { Button } from './ui/Button';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { personal, contact } = siteContent;

  const socials = [
    { label: 'GitHub', href: contact.socials.github, icon: GitHubIcon, external: true },
    { label: 'LinkedIn', href: contact.socials.linkedin, icon: LinkedInIcon, external: true },
    { label: 'Codeforces', href: contact.socials.codeforces, icon: CodeforcesIcon, external: true },
    { label: 'Email', href: `mailto:${contact.email}`, icon: Mail, external: false },
  ];

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      {/* Single subtle atmospheric wash behind hero only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px]"
        style={{
          background:
            'radial-gradient(ellipse 68% 60% at 28% 12%, var(--hero-wash), transparent 72%)',
        }}
      />

      <div className="container-editorial grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Left editorial column */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          <p className="type-meta mb-6 inline-flex items-center gap-2 text-[var(--text-secondary)]">
            <span
              className="h-2 w-2 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            {personal.availability}
          </p>

          <h1 className="type-display text-[var(--text-primary)]">
            {personal.name}
            <TypingRoles
              roles={personal.roles}
              className="mt-2 font-display text-[1.25rem] font-medium tracking-[-0.02em] sm:text-[1.75rem] lg:text-[2rem]"
            />
          </h1>

          <p className="type-body-lg mt-6 max-w-[54ch] text-[var(--text-secondary)]">
            {personal.heroPitch}
          </p>

          {/* Two clear CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary" size="md">
              View Projects
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href={personal.cvPath}
              download={personal.cvDownloadName}
              variant="secondary"
              size="md"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </Button>
          </div>

          {/* Direct social links */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-[14px] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{social.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Right portrait slot */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-start lg:order-2 lg:col-span-5 lg:justify-end"
        >
          <div className="w-56 overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] sm:w-72 lg:w-full lg:max-w-[360px]">
            <img
              src={images.profile.src}
              alt={images.profile.alt}
              width={images.profile.width}
              height={images.profile.height}
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
