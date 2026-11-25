interface SectionHeadingProps {
  id: string;
  index: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, index, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-[65ch]">
      <p className="type-meta mb-3 text-[var(--text-muted)]">{index}</p>
      <h2 id={id} className="type-h2 text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="type-body mt-3 text-[var(--text-secondary)]">{description}</p>
      )}
    </div>
  );
}
