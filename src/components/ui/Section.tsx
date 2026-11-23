import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
}

export function Section({ id, children, className = '', ariaLabelledBy }: SectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}
