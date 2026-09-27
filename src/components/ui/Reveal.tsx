import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className,
  once = true,
}: RevealProps) {
  const dirMap = {
    up:    { y: 20, x: 0 },
    down:  { y: -20, x: 0 },
    left:  { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none:  { x: 0, y: 0 },
  };

  const { x, y } = dirMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '0px 0px -30px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container */
interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function Stagger({ children, stagger = 0.08, delay = 0, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -30px 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
