import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { siteContent } from '../data/content';
import { images } from '../data/images';
import { GitHubIcon } from './ui/BrandIcons';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [flagship, ...secondaryProjects] = siteContent.featuredProjects;
  const flagshipImage = images[flagship.imageKey];

  return (
    <Section id="projects" ariaLabelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        index="02 / PROJECTS"
        title="Selected work"
        description="Production-minded full-stack and AI projects built from scratch, plus smaller web experiments."
      />

      {/* Flagship Featured Project (Asymmetric 12-col split) */}
      <motion.article
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group grid overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--border-strong)] lg:grid-cols-12 lg:items-center"
      >
        <div className="relative aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] lg:col-span-7 lg:border-r lg:border-b-0">
          <img
            src={flagshipImage.src}
            alt={flagshipImage.alt}
            width={flagshipImage.width}
            height={flagshipImage.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="type-meta text-[var(--accent)]">Featured Project</span>
              <span className="type-meta text-[var(--text-muted)]">{flagship.year}</span>
            </div>

            <h3 className="type-h3 mt-2 text-[var(--text-primary)]">{flagship.title}</h3>

            {flagship.award && (
              <p className="type-meta mt-3 inline-flex items-center gap-1.5 rounded-[6px] border border-[var(--accent-border)] bg-[var(--accent-subtle)] px-2.5 py-1 text-[var(--accent)]">
                <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {flagship.award}
              </p>
            )}

            <p className="type-body mt-4 text-[var(--text-primary)]">{flagship.problem}</p>
            <p className="type-body mt-2.5 text-[var(--text-secondary)]">{flagship.summary}</p>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-1.5">
              {flagship.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            {(flagship.liveUrl || flagship.githubUrl) && (
              <div className="mt-6 flex items-center gap-5 border-t border-[var(--border)] pt-4">
                {flagship.liveUrl && (
                  <a
                    href={flagship.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                {flagship.githubUrl && (
                  <a
                    href={flagship.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                  >
                    <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.article>

      {/* Secondary Featured Projects (2-col grid) */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {secondaryProjects.map((project, index) => {
          const thumb = images[project.imageKey];
          return (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.3,
                delay: shouldReduceMotion ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--border-strong)]"
            >
              <div className="aspect-video w-full overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]">
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  width={thumb.width}
                  height={thumb.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="type-h3 text-[var(--text-primary)]">{project.title}</h3>
                    <span className="type-meta text-[var(--text-muted)]">{project.year}</span>
                  </div>

                  {project.award && (
                    <p className="type-meta mt-2.5 inline-flex items-center gap-1.5 rounded-[6px] border border-[var(--accent-border)] bg-[var(--accent-subtle)] px-2.5 py-1 text-[var(--accent)]">
                      <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {project.award}
                    </p>
                  )}

                  <p className="type-body mt-3.5 text-[var(--text-primary)]">{project.problem}</p>
                  <p className="type-body mt-2 text-[var(--text-secondary)]">{project.summary}</p>
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-5 flex items-center gap-5 border-t border-[var(--border)] pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)] transition-colors hover:text-[var(--text-primary)]"
                        >
                          Live Demo
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
                        >
                          <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Other Projects — Compact Editorial Table / List */}
      {siteContent.otherProjects.length > 0 && (
        <div className="mt-16">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h3 className="type-h3 text-[var(--text-primary)]">Other projects</h3>
            <span className="type-meta text-[var(--text-muted)]">
              Smaller builds &amp; front-end practice
            </span>
          </div>

          <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {siteContent.otherProjects.map((project) => (
              <li
                key={project.id}
                className="grid items-baseline gap-2 py-4 transition-colors duration-150 hover:bg-[var(--surface)]/60 sm:grid-cols-[180px_1fr_auto] sm:gap-6 sm:px-3"
              >
                <span className="font-display text-[15px] font-semibold text-[var(--text-primary)]">
                  {project.title}
                </span>

                <span className="type-body text-[var(--text-secondary)]">
                  {project.description}
                </span>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <span className="type-meta text-[var(--text-muted)]">
                    {project.tech.join(' · ')}
                  </span>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                    >
                      <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
