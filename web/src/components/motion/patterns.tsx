'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { motion } from 'motion/react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

type MotionCardProps = ComponentPropsWithoutRef<typeof motion.article> & {
  delay?: number;
  glow?: boolean;
};

export function MotionCard({
  children,
  className = '',
  delay = 0,
  glow = false,
  ...rest
}: MotionCardProps) {
  return (
    <motion.article
      {...rest}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay }}
    >
      {glow ? (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-brand-pink/15 via-transparent to-cyan-300/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      ) : null}
      {children}
    </motion.article>
  );
}

type ShimmerLinkProps = ComponentPropsWithoutRef<'a'> & {
  pulse?: boolean;
};

export function ShimmerLink({
  children,
  className = '',
  pulse = true,
  ...rest
}: ShimmerLinkProps) {
  return (
    <motion.a
      {...rest}
      className={`relative inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors ${className}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-pink/30 via-white/10 to-brand-pink/30"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
      {pulse ? (
        <motion.span
          className="absolute inset-0 rounded-full border border-white/15"
          style={{ mixBlendMode: 'screen' }}
          animate={{ opacity: [0.28, 0.55, 0.28], scale: [1, 1.015, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
    </motion.a>
  );
}
