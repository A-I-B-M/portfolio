import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--accent)] text-white dark:text-[#0A0A0B] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.2),0_0_24px_var(--accent-soft)] hover:bg-[var(--accent-hover)] dark:hover:bg-[#A5B4FC] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-[var(--surface)] text-[var(--fg)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-elevated)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 cursor-pointer select-none disabled:opacity-55 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
