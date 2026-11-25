import { siteContent } from '../data/content';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

export function Experience() {
  const { experience, education, coursework, awards } = siteContent;

  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        index="04 / EXPERIENCE"
        title="Experience & education"
        description="Teaching labs, leading student software teams, and mentoring peers in competitive programming."
      />

      {/* Clean timeline rows */}
      <ol className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {experience.map((item) => (
          <li
            key={item.id}
            className="grid gap-3 py-7 sm:grid-cols-[210px_1fr] sm:gap-8"
          >
            <div className="flex items-start gap-2.5 pt-1">
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  item.current ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
                }`}
                aria-hidden="true"
              />
              <span className="type-meta text-[var(--text-muted)] tabular-nums">
                {item.period}
              </span>
            </div>

            <div>
              <h3 className="type-h3 text-[var(--text-primary)]">{item.role}</h3>
              <p className="type-body mt-0.5 text-[var(--text-muted)]">{item.company}</p>
              <ul className="mt-3 max-w-[65ch] space-y-1.5">
                {item.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="type-body flex items-start gap-2.5 text-[var(--text-secondary)]"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--text-muted)]"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {/* Education & Awards compact block */}
      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h3 className="type-meta mb-5 font-semibold tracking-wide text-[var(--text-primary)] uppercase">
            Education
          </h3>
          <ul className="space-y-6">
            {education.map((edu) => (
              <li
                key={edu.id}
                className="border-l border-[var(--border-strong)] pl-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-[16px] font-semibold text-[var(--text-primary)]">
                    {edu.institution}
                  </h4>
                  <span className="type-meta text-[var(--text-muted)] tabular-nums">
                    {edu.period}
                  </span>
                </div>
                <p className="type-body mt-0.5 text-[var(--text-secondary)]">{edu.degree}</p>
                <p className="type-meta mt-1.5 text-[var(--accent)]">
                  {edu.grade}
                  {edu.details ? ` · ${edu.details}` : ''}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-[var(--border)] pt-5">
            <p className="type-meta text-[var(--text-muted)]">Core Coursework</p>
            <p className="type-body mt-1.5 text-[var(--text-secondary)]">
              {coursework.join(' · ')}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h3 className="type-meta mb-5 font-semibold tracking-wide text-[var(--text-primary)] uppercase">
            Awards &amp; Recognition
          </h3>
          <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {awards.map((award) => (
              <li
                key={award.id}
                className="flex items-baseline justify-between gap-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-[var(--text-primary)]">
                    {award.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[var(--text-muted)]">{award.context}</p>
                </div>
                {award.year && (
                  <span className="type-meta shrink-0 text-[var(--text-muted)] tabular-nums">
                    {award.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
