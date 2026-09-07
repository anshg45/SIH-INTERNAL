import React from 'react';
import { motion } from 'framer-motion';

/**
 * Base card primitive used across the dashboard.
 * Restrained by design: hairline border, near-imperceptible shadow,
 * a small hover lift for interactive cards. No cursor-tracking glow —
 * that reads as decorative rather than institutional.
 *
 * `spotlightColor` is kept for backward compatibility with existing call
 * sites but is now only used to tint the hover border, very subtly.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor,
  onClick,
  alertPulsing = false
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.995 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative rounded-2xl bg-ivory-50 border p-5 shadow-[var(--shadow-card)] transition-shadow duration-200 ${
        alertPulsing
          ? 'border-crimson-200 ring-1 ring-crimson-100'
          : 'border-stone-200 hover:shadow-[var(--shadow-card-hover)] hover:border-stone-300'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}