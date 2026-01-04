'use client';

import { motion } from 'motion/react';

import { FadeIn, MotionCard, ShimmerLink } from '@/components/motion/patterns';

const revealItems = [
  {
    label: 'Hero copy',
    detail: 'Fade-in met lichte slide voor direct focus.',
    time: '120ms',
  },
  {
    label: 'Cards',
    detail: 'Staggered lift; nauwelijks merkbaar maar voelt premium.',
    time: '60ms',
  },
  {
    label: 'CTA',
    detail: 'Kleine scale en glans op hover.',
    time: '0ms + hover',
  },
];

export function AnimationDemos() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MotionCard
        glow
        className="rounded-2xl border border-white/10 bg-white/5 p-4"
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-gray-400">
          <span className="text-brand-pink">Scroll reveal</span>
          <span className="text-gray-500">ease-out</span>
        </div>
        <div className="mt-4 space-y-3">
          {revealItems.map((item, idx) => (
            <FadeIn
              key={item.label}
              delay={0.04 * idx}
              className="rounded-xl border border-white/10 bg-brand-dark/70 px-3 py-2.5"
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-200">
                <span>{item.label}</span>
                <span className="text-[10px] text-gray-500">{item.time}</span>
              </div>
              <p className="mt-1.5 text-sm text-gray-300 leading-relaxed">
                {item.detail}
              </p>
            </FadeIn>
          ))}
        </div>
      </MotionCard>

      <MotionCard
        glow
        className="rounded-2xl border border-white/10 bg-brand-dark/70 p-4"
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-gray-400">
          <span className="text-brand-pink">Hover lift</span>
          <span className="text-gray-500">spring</span>
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-300 leading-relaxed">
            Kaarten liften 6px omhoog met een zachte spring en een subtiele
            gloed. Geeft net dat beetje feedback zonder drukte.
          </p>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-gray-400">
              <span>Hover demo</span>
              <span className="text-brand-pink">6px lift</span>
            </div>
            <motion.div
              className="mt-3 h-16 rounded-lg bg-gradient-to-r from-brand-pink/25 via-white/10 to-cyan-300/10"
              animate={{ x: ['0%', '6%', '-3%', '0%'] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </MotionCard>

      <MotionCard
        className="rounded-2xl border border-white/10 bg-white/5 p-4"
        glow
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-gray-400">
          <span className="text-brand-pink">CTA shimmer</span>
          <span className="text-gray-500">hover</span>
        </div>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          CTA&apos;s krijgen een lichte glans en micro-scale op hover. Past bij
          de brand pink en valt net genoeg op.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ShimmerLink href="https://motion.dev" target="_blank" rel="noopener noreferrer">
            Bekijk motion.dev
          </ShimmerLink>
          <ShimmerLink
            href="https://www.linkedin.com/in/bkeetman"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-dark bg-brand-pink hover:text-brand-dark"
          >
            LinkedIn CTA
          </ShimmerLink>
        </div>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full w-1/2 bg-gradient-to-r from-brand-pink via-white/80 to-brand-pink"
            animate={{ x: ['-20%', '70%', '-10%'] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </MotionCard>
    </div>
  );
}

export default AnimationDemos;
