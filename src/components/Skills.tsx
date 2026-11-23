import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Globe, Radio } from 'lucide-react';
import { FaJava } from 'react-icons/fa6';
import {
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiSpringboot,
  SiUbuntu,
} from 'react-icons/si';
import { siteContent, type SkillCategory, type SkillItem } from '../data/content';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

const skillIconMap: Record<string, IconComponent> = {
  c: SiC,
  cpp: SiCplusplus,
  java: FaJava,
  python: SiPython,
  javascript: SiJavascript,
  php: SiPhp,
  html: SiHtml5,
  css: SiCss,
  react: SiReact,
  springboot: SiSpringboot,
  nodejs: SiNodedotjs,
  express: SiExpress,
  pytorch: SiPytorch,
  bootstrap: SiBootstrap,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  rest: Globe,
  websocket: Radio,
  postman: SiPostman,
  gemini: SiGooglegemini,
  figma: SiFigma,
  linux: SiUbuntu,
  jupyter: SiJupyter,
};

const categoryOrder: SkillCategory[] = ['Languages', 'Frameworks', 'Tools'];

function SkillIcon({ iconKey }: { iconKey: string }) {
  const Icon = skillIconMap[iconKey] ?? Code2;
  return <Icon className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden={true} />;
}

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const allSkills: SkillItem[] = [
    ...siteContent.skills.Languages,
    ...siteContent.skills.Frameworks,
    ...siteContent.skills.Tools,
  ];

  return (
    <Section id="skills" ariaLabelledBy="skills-heading">
      <SectionHeading
        id="skills-heading"
        eyebrow="Skills"
        title="Technical stack & tooling"
        description="Languages, frameworks, and tools I use across full-stack software development, AI workflows, and competitive programming."
      />

      {/* Grouped Skill Cards */}
      <div className="grid gap-5 lg:grid-cols-3">
        {categoryOrder.map((category, categoryIdx) => {
          const items = siteContent.skills[category];
          return (
            <motion.div
              key={category}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : categoryIdx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className="h-full p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                    {category}
                  </h3>
                  <span className="rounded-full bg-[var(--surface-elevated)] px-2.5 py-0.5 text-xs font-medium text-[var(--fg-subtle)] tabular-nums">
                    {items.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li key={skill.name}>
                      <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/70 px-3 py-2 text-xs font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--accent)]/40">
                        <SkillIcon iconKey={skill.iconKey} />
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Infinite Auto-Scrolling Tech Marquee */}
      <div
        className="marquee-wrapper relative mt-10 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/60 py-5"
        aria-label="Technologies marquee"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="animate-marquee gap-3">
          {[0, 1].map((dupIndex) => (
            <div
              key={dupIndex}
              aria-hidden={dupIndex === 1}
              className="flex shrink-0 items-center gap-3 pr-3"
            >
              {allSkills.map((skill) => (
                <div
                  key={`${dupIndex}-${skill.name}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-2 text-xs font-medium whitespace-nowrap text-[var(--fg-muted)]"
                >
                  <SkillIcon iconKey={skill.iconKey} />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
