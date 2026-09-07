import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  ChevronDown,
  Scale,
  Check
} from 'lucide-react';
import { ROLES, CLINICAL_TRIALS } from '../../data/mockData';

export default function Navbar({
  activeView,
  selectedTrialId,
  onSelectTrial,
  currentRole,
  onSwitchRole,
  onOpenSearch,
  onOpenNotifications,
  unreadAlertCount = 4
}) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef(null);

  const currentRoleObj = ROLES.find(r => r.id === currentRole) || ROLES[0];
  const currentRoleShortName = currentRoleObj.name.replace(/\s*\(.*?\)\s*/g, '').trim();

  useEffect(() => {
    function handleClickOutside(e) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target)) {
        setRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const viewTitles = {
    dashboard: currentRoleShortName,
    studies: "Clinical Trials & Protocol Workspace",
    pv: "Pharmacovigilance Command Center (PvPI)",
    ethics: "Institutional Ethics Committee (IEC) Review",
    patients: "Clinical Trial Participant Registry & Prakriti",
    audit: "Blockchain & Merkle Audit Integrity Engine",
    fhir: "Ayush-FHIR R4 Interoperability Station",
    cdisc: "CDISC SDTM Submission Studio",
    regulator: "CDSCO / Ayush Regulatory Inspection Portal"
  };

  return (
    <header className="sticky top-0 z-20 bg-ivory-50/95 backdrop-blur-sm border-b border-stone-200">
      {currentRole === 'regulator' && (
        <div className="bg-gold-700 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Scale className="w-4 h-4 shrink-0" />
            <span className="truncate">
              <strong className="font-semibold">CDSCO & MINISTRY OF AYUSH JOINT INSPECTION MODE:</strong>{' '}
              Strict read-only access active. All actions and exports are logged to the audit trail.
            </span>
          </div>
          <span className="bg-gold-800/70 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-mono border border-gold-500/30 shrink-0">
            Inspector Badge: GOI-CDSCO-AYU-882
          </span>
        </div>
      )}

      <div className="px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="text-lg font-bold text-ink-900 tracking-tight leading-tight truncate">
            {viewTitles[activeView] || "Clinical Trials Management"}
          </h2>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-xl justify-center">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ivory-100 hover:bg-stone-100 text-ink-600 hover:text-ink-900 border border-stone-200 text-xs transition-colors w-full max-w-xs justify-between group"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-ink-400 group-hover:text-copper-600 transition-colors" />
              <span className="truncate">Search trials, CTRI, SAEs...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-ivory-50 border border-stone-300 rounded text-ink-500">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-ivory-100 border border-stone-200 transition-colors"
            title="Open Statutory Action Queue"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-crimson-600 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadAlertCount}
              </span>
            )}
          </button>

          <div className="relative" ref={roleDropdownRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2.5 p-1 pl-1.5 pr-2.5 rounded-lg bg-ivory-50 hover:bg-ivory-100 border border-stone-200 text-xs font-medium text-ink-900 transition-colors group"
            >
              <div className="relative">
                {currentRole === 'pi' ? (
                  <img
                    src="/images/doctor_scientist_portrait.jpg"
                    alt={currentRoleObj.holder}
                    className="w-7 h-7 rounded-md object-cover border border-stone-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-md bg-walnut-700 text-white font-bold text-[10px] flex items-center justify-center">
                    {currentRoleObj.avatar}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-sage-500 border-2 border-ivory-50" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-[11px] font-bold leading-tight truncate max-w-[110px] group-hover:text-copper-700 transition-colors">
                  {currentRoleObj.holder.split(' ')[0]} {currentRoleObj.holder.split(' ')[1] || ''}
                </p>
                <p className="text-[9px] text-copper-700 font-bold uppercase tracking-wider truncate max-w-[110px]">
                  {currentRoleObj.badge}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-ink-400 ml-0.5 group-hover:text-ink-700 transition-colors" />
            </button>

            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-80 bg-ivory-50 rounded-xl shadow-[var(--shadow-card-hover)] border border-stone-200 p-2 z-50 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-stone-200">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ink-600">
                        Demonstration Role Personas
                      </p>
                      <span className="text-[10px] bg-sage-50 text-sage-700 border border-sage-200 px-1.5 py-0.5 rounded-full font-bold">
                        7 Roles Active
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-400 mt-0.5">
                      Click any persona to immediately switch view permissions & UI authority.
                    </p>
                  </div>

                  <div className="py-1 space-y-1 max-h-[380px] overflow-y-auto">
                    {ROLES.map((r) => {
                      const isSelected = r.id === currentRole;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            onSwitchRole(r.id);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                            isSelected
                              ? 'bg-copper-50 border border-copper-200'
                              : 'hover:bg-ivory-100 border border-transparent'
                          }`}
                        >
                          {r.id === 'pi' ? (
                            <img
                              src="/images/doctor_scientist_portrait.jpg"
                              alt={r.holder}
                              className="w-8 h-8 rounded-md object-cover border border-stone-200 shrink-0"
                            />
                          ) : (
                            <div className={`w-8 h-8 rounded-md font-bold text-xs flex items-center justify-center shrink-0 text-white ${
                              r.id === 'regulator'
                                ? 'bg-crimson-600'
                                : r.id === 'pv'
                                ? 'bg-amber-600'
                                : r.id === 'iec'
                                ? 'bg-copper-700'
                                : 'bg-walnut-700'
                            }`}>
                              {r.avatar}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-ink-900 truncate">{r.holder}</span>
                              <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded uppercase ${
                                r.id === 'regulator'
                                  ? 'bg-crimson-50 text-crimson-700'
                                  : r.id === 'pv'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-stone-100 text-ink-600'
                              }`}>
                                {r.badge}
                              </span>
                            </div>
                            <p className="text-[11px] font-medium text-ink-600 truncate mt-0.5">{r.name}</p>
                            <p className="text-[10px] text-ink-400 line-clamp-1 mt-0.5">{r.description}</p>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-copper-600 shrink-0 mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}