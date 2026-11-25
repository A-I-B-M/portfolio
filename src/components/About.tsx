import { siteContent } from '../data/content';
import { Section } from './ui/Section';

export function About() {
  const { personal, facts, contact } = siteContent;

  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left editorial anchor column */}
        <div className="lg:col-span-4">
          <p className="type-meta mb-3 text-[var(--text-muted)]">01 / ABOUT</p>
          <h2 id="about-heading" className="type-h2 text-[var(--text-primary)]">
            Background
          </h2>
          <dl className="mt-6 space-y-3 border-t border-[var(--border)] pt-5">
            <div>
              <dt className="type-meta text-[var(--text-muted)]">Based at</dt>
              <dd className="type-body mt-0.5 text-[var(--text-primary)]">
                {personal.location}
              </dd>
            </div>
            <div>
              <dt className="type-meta text-[var(--text-muted)]">Experience</dt>
              <dd className="type-body mt-0.5 text-[var(--text-primary)]">
                {personal.experienceSpan}
              </dd>
            </div>
            <div>
              <dt className="type-meta text-[var(--text-muted)]">Competitive Programming</dt>
              <dd className="type-body mt-0.5">
                <a
                  href={contact.socials.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline decoration-[var(--accent-border)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                >
                  Codeforces · amdadul_
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right natural prose + crisp metrics strip */}
        <div className="lg:col-span-8">
          <div className="max-w-[65ch] space-y-5">
            {personal.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="type-body-lg text-[var(--text-secondary)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--border)] pt-8 sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.value}>
                <dt className="font-display text-[1.75rem] font-semibold tracking-tight text-[var(--text-primary)] tabular-nums">
                  {fact.value}
                </dt>
                <dd className="type-meta mt-1.5 font-sans text-[13px] leading-snug text-[var(--text-muted)]">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
