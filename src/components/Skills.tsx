import { siteContent, type SkillCategory } from '../data/content';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

const categoryOrder: SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
];

export function Skills() {
  return (
    <Section id="skills" ariaLabelledBy="skills-heading">
      <SectionHeading
        id="skills-heading"
        index="03 / SKILLS"
        title="Technical stack"
        description="Languages, frameworks, databases, and tools I use across coursework, personal projects, and contests."
      />

      <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {categoryOrder.map((category) => (
          <div
            key={category}
            className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-8"
          >
            <dt className="type-meta font-semibold tracking-wide text-[var(--text-primary)] uppercase">
              {category}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {siteContent.skills[category].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-[6px] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[14px] text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
