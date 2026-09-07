import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

/** Animates a numeric KPI value counting up on mount. Falls back to the
 * raw string for non-numeric values (e.g. "510 / 650", "1 Critical"). */
function useCountUp(value) {
  const numericMatch = typeof value === 'string' ? value.match(/^-?\d+(\.\d+)?/) : null;
  const [display, setDisplay] = useState(numericMatch ? "0" : value);

  useEffect(() => {
    if (!numericMatch) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(numericMatch[0]);
    const suffix = String(value).slice(numericMatch[0].length);
    const duration = 600;
    const start = performance.now();

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
      setDisplay(`${formatted}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}

export default function KpiCard({
  title,
  value,
  subvalue,
  trend,
  trendPositive = true,
  icon: Icon,
  iconBg = "bg-walnut-50 text-walnut-700",
  sparklineData = [40, 50, 45, 60, 55, 70, 75],
  sparklineColor = "#526B57",
  onClick,
  alertPulsing = false,
  emphasized = false
}) {
  const displayValue = useCountUp(value);

  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 84;
  const height = 30;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <SpotlightCard
      onClick={onClick}
      alertPulsing={alertPulsing}
      className={emphasized ? "border-copper-300 bg-copper-50/40" : ""}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 min-w-0">
          <p className="text-[11px] font-semibold text-ink-600 uppercase tracking-wider truncate">{title}</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold tracking-tight text-ink-900 tabular-nums">
              {displayValue}
            </span>
            {subvalue && (
              <span className="text-xs text-ink-600 font-medium truncate max-w-[130px]">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg ${iconBg} shrink-0`}>
          {Icon && <Icon className="w-4.5 h-4.5" />}
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-stone-200 flex items-center justify-between">
        {trend ? (
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                trendPositive
                  ? 'bg-sage-50 text-sage-700 border border-sage-200'
                  : 'bg-crimson-50 text-crimson-700 border border-crimson-200'
              }`}
            >
              {trend}
            </span>
            <span className="text-[11px] text-ink-400 hidden sm:inline">vs prev</span>
          </div>
        ) : (
          <span className="text-[11px] text-ink-400">AIIA Validated</span>
        )}

        <svg width={width} height={height} className="overflow-visible">
          <motion.polyline
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            fill="none"
            stroke={sparklineColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </SpotlightCard>
  );
}