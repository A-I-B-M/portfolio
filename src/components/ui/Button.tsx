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
    'bg-[var(--accent)] text-white dark:text-[#0B0B0F] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_30px_-6px_rgba(var(--accent-rgb),0.5)] hover:bg-[var(--accent-hover)] dark:hover:bg-[#34D399] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_0_36px_-4px_rgba(var(--accent-rgb),0.65)] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-transparent text-[var(--fg)] border border-[var(--border-strong)] hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 active:translate-y-0',
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
