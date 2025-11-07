import { motion, useInView } from 'framer-motion';
import { PropsWithChildren, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type AnimatedInViewProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function AnimatedInView({ children, className, delay = 0 }: AnimatedInViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
