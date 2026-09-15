import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  AlertOctagon, 
  AlertTriangle, 
  Lock, 
  Clock, 
  ArrowRight, 
  CheckCheck,
  ShieldAlert
} from 'lucide-react';

export default function NotificationDrawer({ 
  isOpen, 
  onClose, 
  onNavigate 
}) {
  const notifications = [
    {
      id: "notif-1",
      urgency: "CRITICAL",
      title: "3-Day CDSCO Statutory Clock Expiring",
      message: "Expedited Grade 3 SAE (SAE-2026-0904, PT-1082) for Ashwagandha trial has only 18 hours left for mandatory Form 44 notification.",
      trialId: "AYU-NEURO-004",
      timestamp: "2 hours ago",
      targetView: "pv",
      icon: AlertOctagon,
      iconColor: "text-rose-600 bg-rose-50 border-rose-200"
    },
    {
      id: "notif-2",
      urgency: "HIGH",
      title: "IEC Annual Ethics Renewal Overdue",
      message: "Protocol AYU-IMM-002 (Guduchi + Pippali) ethical clearance is 14 days overdue for annual re-approval.",
      trialId: "AYU-IMM-002",
      timestamp: "1 day ago",
      targetView: "ethics",
      icon: AlertTriangle,
      iconColor: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      id: "notif-3",
      urgency: "WARNING",
      title: "CTRI Enrollment Hard Gate Enforced",
      message: "Trial AYU-MET-007 (Virechana NAFLD) enrollment locked pending ICMR-NIMS registration verification.",
      trialId: "AYU-MET-007",
      timestamp: "3 days ago",
      targetView: "studies",
      icon: Lock,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      id: "notif-4",
      urgency: "INFO",
      title: "Source Data Verification (SDV) Batch Ready",
      message: "CRA monitor completed 100% SDV for Cohort A subjects in Guduchi study. Blockchain leaf #82 anchored.",
      trialId: "AYU-IMM-002",
      timestamp: "4 days ago",
      targetView: "audit",
      icon: ShieldAlert,
      iconColor: "text-teal-600 bg-teal-50 border-teal-200"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Slide-in Panel with Spring Physics */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col relative z-10"
            >
              {/* Header */}
              <div className="p-4.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    Statutory Action Queue
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 rounded-full">
                    4 Pending
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Body with Staggered Item Entrance */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.map((n, idx) => {
                  const IconComp = n.icon;
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 + 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.015, x: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onNavigate(n.targetView, n.trialId);
                        onClose();
                      }}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/60 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl border ${n.iconColor} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                              {n.urgency}
                            </span>
                            <span className="text-[11px] text-slate-700 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {n.timestamp}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors">
                            {n.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {n.message}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="inline-block px-2 py-0.5 text-[11px] font-mono font-medium bg-slate-100 text-slate-700 rounded border border-slate-200">
                              {n.trialId}
                            </span>
                            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Resolve Action <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  Synced with PvPI & CTRI Registry
                </span>
                <button 
                  onClick={onClose}
                  className="text-emerald-700 hover:text-emerald-800 font-bold"
                >
                  Close Drawer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
