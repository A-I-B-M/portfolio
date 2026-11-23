import { motion, useReducedMotion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { siteContent } from '../data/content';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

export function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const { experience, education, coursework, awards } = siteContent;

  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow="Journey"
        title="Experience & education"
        description="Teaching, leading engineering projects, and mentoring peers in competitive programming."
      />

      {/* Vertical Experience Timeline */}
      <div className="relative pl-6 sm:pl-8">
        {/* Vertical rail */}
        <div
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-strong)] to-transparent sm:left-[9px]"
          aria-hidden="true"
        />

        <ol className="space-y-6">
          {experience.map((item, idx) => (
            <motion.li
              key={item.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Timeline dot */}
              <span
                className={`absolute top-7 -left-6 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-[var(--bg)] sm:-left-8 sm:h-5 sm:w-5 ${
                  item.current
                    ? 'border-[var(--accent)] shadow-[0_0_12px_var(--accent-soft)]'
                    : 'border-[var(--border-strong)]'
                }`}
                aria-hidden="true"
              >
                {item.current && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                )}
              </span>

              <Card className="p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--fg)] sm:text-xl">
                      {item.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-[var(--fg-muted)]">
                      {item.company}
                    </p>
                  </div>
                  <Tag variant={item.current ? 'accent' : 'default'}>{item.period}</Tag>
                </div>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]/80"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Education + Awards Blocks */}
      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        {/* Education */}
        <div className="lg:col-span-6">
          <div className="mb-4 flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold text-[var(--fg)]">Education</h3>
          </div>
          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.id} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display text-base font-semibold text-[var(--fg)]">
                      {edu.institution}
                    </h4>
                    <p className="mt-0.5 text-sm text-[var(--fg-muted)]">{edu.degree}</p>
                  </div>
                  <span className="text-xs font-medium text-[var(--fg-subtle)] tabular-nums">
                    {edu.period}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Tag variant="accent">{edu.grade}</Tag>
                  {edu.details && <Tag>{edu.details}</Tag>}
                </div>
              </Card>
            ))}

            {/* Relevant Coursework */}
            <Card className="p-5 sm:p-6" hoverLift={false}>
              <p className="text-xs font-semibold tracking-wider text-[var(--fg-subtle)] uppercase">
                Core Coursework
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {coursework.map((course) => (
                  <Tag key={course}>{course}</Tag>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Honors & Awards */}
        <div className="lg:col-span-6">
          <div className="mb-4 flex items-center gap-2.5">
            <Award className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold text-[var(--fg)]">
              Awards &amp; Recognition
            </h3>
          </div>
          <Card className="p-5 sm:p-6" hoverLift={false}>
            <ul className="divide-y divide-[var(--border-subtle)]">
              {awards.map((award) => (
                <li
                  key={award.id}
                  className="flex flex-wrap items-start justify-between gap-2 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--fg)]">{award.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--fg-muted)]">
                      {award.context}
                    </p>
                  </div>
                  {award.year && (
                    <span className="shrink-0 text-xs font-medium text-[var(--fg-subtle)] tabular-nums">
                      {award.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
