import { Briefcase, Compass, MapPin, Terminal } from 'lucide-react';
import { siteContent } from '../data/content';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';

export function About() {
  const { personal, stats, contact } = siteContent;

  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow="About"
        title="Engineering with algorithmic precision"
        description="Combining competitive programming rigor with practical full-stack and AI development."
      />

      {/* Bento Grid */}
      <div className="grid gap-4 md:grid-cols-12">
        {/* Bio Card (spans 7 cols on desktop) */}
        <Card className="p-6 sm:p-8 md:col-span-7" hoverLift={false}>
          <div className="flex h-full flex-col justify-between gap-5">
            <div className="space-y-4 text-[15px] leading-relaxed text-[var(--fg-muted)] sm:text-base">
              {personal.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border-subtle)] pt-4 text-xs font-medium text-[var(--fg-subtle)]">
              <span>B.Sc. in CSE · UIU</span>
              <span aria-hidden="true">·</span>
              <a
                href={contact.socials.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                Codeforces: amdadul (Pupil, 1200+)
              </a>
            </div>
          </div>
        </Card>

        {/* Highlights Bento Column (spans 5 cols) */}
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
          <Card className="p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-[var(--fg-subtle)] uppercase">
                  Base / Institution
                </p>
                <p className="mt-1 font-display text-base font-semibold text-[var(--fg)]">
                  {personal.location}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Briefcase className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-[var(--fg-subtle)] uppercase">
                  Experience
                </p>
                <p className="mt-1 font-display text-base font-semibold text-[var(--fg)]">
                  {personal.yearsOfExperience}{' '}
                  <span className="font-sans text-xs font-normal text-[var(--fg-muted)]">
                    ({personal.experienceSpan})
                  </span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6 sm:col-span-2 md:col-span-1">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Compass className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-[var(--fg-subtle)] uppercase">
                  Current Focus
                </p>
                <p className="mt-1 font-display text-base font-semibold text-[var(--fg)]">
                  {personal.currentFocus}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Real CV Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:col-span-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold tracking-tight text-[var(--fg)] tabular-nums sm:text-3xl">
                  {stat.value}
                </span>
                <Terminal className="h-4 w-4 text-[var(--accent)] opacity-75" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--fg)]">{stat.label}</p>
              <p className="mt-1 text-xs leading-snug text-[var(--fg-subtle)]">{stat.sublabel}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
