interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
        <span className="h-px w-5 bg-[var(--accent)]" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="heading-gradient inline-block text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-[var(--fg-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
