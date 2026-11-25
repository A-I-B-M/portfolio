import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiCodeforces, SiGithub } from 'react-icons/si';
import { siteContent } from '../data/content';
import { images } from '../data/images';
import { TypingRoles } from './TypingRoles';
import { Button } from './ui/Button';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { personal, contact } = siteContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const socialLinks = [
    {
      label: 'GitHub',
      href: contact.socials.github,
      icon: SiGithub,
      external: true,
    },
    {
      label: 'LinkedIn',
      href: contact.socials.linkedin,
      icon: FaLinkedinIn,
      external: true,
    },
    {
      label: 'Codeforces',
      href: contact.socials.codeforces,
      icon: SiCodeforces,
      external: true,
    },
    {
      label: 'Email',
      href: `mailto:${contact.email}`,
      icon: Mail,
      external: false,
    },
  ];

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-5 pt-10 pb-20 sm:px-8 sm:pt-14 sm:pb-24"
    >
      {/* Subtle hero-only grid pattern fading toward edges */}
      <div
        aria-hidden="true"
        className="hero-grid-pattern pointer-events-none absolute inset-0 -z-10"
      />

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:gap-16">
        {/* Left column: copy & actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--fg-muted)] shadow-xs">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {personal.availability}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-[var(--fg)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            <span className="heading-gradient inline-block">{personal.name}</span>
            <TypingRoles
              roles={personal.roles}
              className="mt-2 text-xl font-semibold sm:text-3xl lg:text-[2.15rem]"
            />
          </motion.h1>

          {/* One-line value proposition */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg"
          >
            {personal.valueProposition}
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects" variant="primary" size="lg">
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Contact Me
            </Button>
            <Button
              href={personal.cvPath}
              download={personal.cvDownloadName}
              variant="ghost"
              size="lg"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex items-center gap-3"
          >
            <span className="text-xs font-medium tracking-wide text-[var(--fg-subtle)] uppercase">
              Connect
            </span>
            <span className="h-px w-6 bg-[var(--border-subtle)]" aria-hidden="true" />
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--accent)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/55 hover:bg-[var(--accent-soft)] hover:text-[var(--accent-hover)] hover:shadow-[0_0_24px_-6px_rgba(var(--accent-rgb),0.45)]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column: Profile photo */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative w-60 sm:w-72 lg:w-[340px]">
            {/* Ambient gradient glow behind portrait */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[var(--accent)]/25 via-[var(--accent)]/10 to-transparent blur-2xl"
              aria-hidden="true"
            />
            {/* Gradient hairline frame */}
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-[var(--accent)]/45 via-[var(--border-strong)] to-[var(--border-subtle)] p-[1.5px] shadow-2xl">
              <div className="overflow-hidden rounded-[calc(1.75rem-1.5px)] bg-[var(--surface)]">
                <img
                  src={images.profile.src}
                  alt={images.profile.alt}
                  width={images.profile.width}
                  height={images.profile.height}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-square w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
            {/* Subtle corner metadata chip */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--border-subtle)] bg-[var(--surface)]/95 px-3.5 py-1.5 text-xs font-medium text-[var(--fg-muted)] shadow-lg backdrop-blur-md">
              <span className="font-semibold text-[var(--fg)]">1,500+</span> CP Problems ·{' '}
              <span className="font-semibold text-[var(--fg)]">3.88</span> CGPA
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
