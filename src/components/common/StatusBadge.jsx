import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lock,
  Clock,
  ShieldCheck,
  XCircle,
  Activity,
  AlertOctagon
} from 'lucide-react';

/**
 * Consistent status language used across the entire CTMS.
 * Four semantic tones only: neutral, success (sage), warning (amber), critical (crimson).
 * Colors never change meaning from page to page.
 */
export default function StatusBadge({ status, size = "sm" }) {
  const normalized = String(status || "").toLowerCase().trim();

  let tone = "bg-stone-100 text-ink-700 border-stone-300";
  let icon = <Clock className="w-3.5 h-3.5" />;
  let label = status;
  let pulse = false;

  if (normalized.includes("recruiting")) {
    tone = "bg-sage-50 text-sage-700 border-sage-200";
    icon = <Activity className="w-3.5 h-3.5 text-sage-600" />;
    label = "Recruiting";
    pulse = true;
  } else if (normalized.includes("locked") || normalized.includes("ctri pending")) {
    tone = "bg-amber-50 text-amber-800 border-amber-200";
    icon = <Lock className="w-3.5 h-3.5 text-amber-600" />;
    label = "Enrollment Locked";
  } else if (normalized.includes("database lock")) {
    tone = "bg-copper-50 text-copper-800 border-copper-200";
    icon = <Lock className="w-3.5 h-3.5 text-copper-600" />;
    label = "Database Lock";
  } else if (normalized.includes("site activated") || normalized.includes("activated")) {
    tone = "bg-sage-50 text-sage-700 border-sage-200";
    icon = <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />;
    label = "Site Activated";
  } else if (normalized.includes("active - follow-up") || normalized.includes("follow-up")) {
    tone = "bg-copper-50 text-copper-800 border-copper-200";
    icon = <Clock className="w-3.5 h-3.5 text-copper-600" />;
    label = "Active - Follow-up";
  } else if (normalized.includes("critical") || normalized.includes("sae") || normalized.includes("severe")) {
    tone = "bg-crimson-50 text-crimson-700 border-crimson-200 font-semibold";
    icon = <AlertOctagon className="w-3.5 h-3.5 text-crimson-600" />;
    label = status;
  } else if (normalized.includes("approved") || normalized.includes("verified")) {
    tone = "bg-sage-50 text-sage-700 border-sage-200";
    icon = <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />;
    label = status;
  } else if (normalized.includes("revision") || normalized.includes("overdue")) {
    tone = "bg-amber-50 text-amber-800 border-amber-200";
    icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
    label = status;
  } else if (normalized.includes("rejected")) {
    tone = "bg-crimson-50 text-crimson-700 border-crimson-200";
    icon = <XCircle className="w-3.5 h-3.5 text-crimson-600" />;
    label = "Rejected";
  }

  const sizeClasses = size === "lg"
    ? "px-3 py-1.5 text-xs gap-2"
    : size === "md"
    ? "px-2.5 py-1 text-xs gap-1.5"
    : "px-2 py-0.5 text-[11px] gap-1";

  return (
    <span className={`inline-flex items-center rounded-md border font-medium whitespace-nowrap ${sizeClasses} ${tone}`}>
      <span className={pulse ? "animate-status-breathe" : ""}>{icon}</span>
      <span>{label}</span>
    </span>
  );
}