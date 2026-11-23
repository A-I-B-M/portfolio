import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { siteContent } from '../data/content';
import { images } from '../data/images';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const { featuredProjects, otherProjects } = siteContent;

  return (
    <Section id="projects" ariaLabelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        eyebrow="Selected Work"
        title="Featured projects"
        description="Systems and web platforms spanning AI surveillance, real-time gamified learning, and unified healthcare management."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => {
          const thumb = images[project.imageKey];
          const hasLinks = Boolean(project.liveUrl || project.githubUrl);

          return (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.48,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group h-full"
            >
              <Card className="flex h-full flex-col overflow-hidden">
                {/* 16:9 Project Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    width={thumb.width}
                    height={thumb.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium tracking-wide text-[var(--accent)]">
                    {project.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-[var(--fg)]">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>

                  {/* Links (shown only when URLs are configured in content.ts) */}
                  {hasLinks && (
                    <div className="mt-5 flex items-center gap-4 border-t border-[var(--border-subtle)] pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
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
                          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                        >
                          <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.article>
          );
        })}
      </div>

      {/* Optional Other Projects list (renders automatically if items are added to content.ts) */}
      {otherProjects.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 font-display text-lg font-semibold text-[var(--fg)]">
            Other Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {otherProjects.map((project) => (
              <Card key={project.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display text-base font-semibold text-[var(--fg)]">
                      {project.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-[var(--fg-muted)]">{project.description}</p>
                  </div>
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex shrink-0 items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                        >
                          <SiGithub className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                        >
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
