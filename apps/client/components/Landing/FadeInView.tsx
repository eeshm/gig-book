"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "up" (default) | "left" | "right" | "none" */
  direction?: "up" | "left" | "right" | "none";
}

/**
 * Thin client boundary — wraps static Server Component content with a
 * whileInView fade/slide animation. Import this from Server Components
 * so only this tiny file ships as JS, not the whole parent component.
 */
export default function FadeInView({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInViewProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 20 : 0,
    x: direction === "left" ? -12 : direction === "right" ? 12 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
