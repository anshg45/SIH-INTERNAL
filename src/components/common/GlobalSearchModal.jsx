import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  FlaskConical, 
  ShieldAlert, 
  UserCheck, 
  ArrowRight
} from 'lucide-react';
import { CLINICAL_TRIALS, PHARMACOVIGILANCE_EVENTS, PATIENTS_REGISTRY } from '../../data/mockData';

export default function GlobalSearchModal({ 
  isOpen, 
  onClose, 
  onNavigate 
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const q = query.toLowerCase().trim();

  // Search trials
  const filteredTrials = CLINICAL_TRIALS.filter(t => 
    t.code.toLowerCase().includes(q) || 
    t.title.toLowerCase().includes(q) || 
    t.shortTitle.toLowerCase().includes(q) ||
    t.ctriNumber.toLowerCase().includes(q) ||
    t.pi.toLowerCase().includes(q)
  );

  // Search safety events
  const filteredEvents = PHARMACOVIGILANCE_EVENTS.filter(e =>
    e.id.toLowerCase().includes(q) ||
    e.eventTerm.toLowerCase().includes(q) ||
    e.suspectDrug.toLowerCase().includes(q) ||
    e.trialCode.toLowerCase().includes(q) ||
    e.participantId.toLowerCase().includes(q)
  );

  // Search patients
  const filteredPatients = PATIENTS_REGISTRY.filter(p =>
    p.id.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.prakriti.toLowerCase().includes(q) ||
    p.trialCode.toLowerCase().includes(q)
  );

  const hasResults = filteredTrials.length > 0 || filteredEvents.length > 0 || filteredPatients.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" 
            onClick={onClose} 
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-10"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/70">
              <Search className="w-5 h-5 text-emerald-600 shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trials, CTRI numbers, SAEs, patients, or Prakriti..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden font-medium"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="text-[11px] font-mono bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {!hasResults && query && (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-sm font-semibold text-slate-700">No matching records found for "{query}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching by CTRI number, trial code, or herbal formulation.</p>
                </div>
              )}

              {/* Quick Suggestions when empty */}
              {!query && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Suggestions</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { query: "Ashwagandha", title: "Ashwagandha Extract (AYU-NEURO-004)", sub: "Critical SAE in Phase III" },
                      { query: "Virechana", title: "Virechana Panchakarma (AYU-MET-007)", sub: "CTRI Hard Gate Enforced" },
                      { query: "Arjuna", title: "Arjuna & Pushkarmool (AYU-CVD-001)", sub: "Active Phase II Recruiting" },
                      { query: "Prakriti", title: "Ayush Prakriti Registry", sub: "Dosha classification profiles" }
                    ].map((s) => (
                      <motion.button
                        key={s.query}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuery(s.query)}
                        className="p-3 rounded-xl border border-slate-200 text-left hover:bg-emerald-50/60 hover:border-emerald-300 transition-colors shadow-2xs"
                      >
                        <p className="text-xs font-bold text-slate-800">{s.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{s.sub}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trials Section */}
              {filteredTrials.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                    Clinical Trials ({filteredTrials.length})
                  </p>
                  <div className="space-y-1.5">
                    {filteredTrials.slice(0, 3).map(t => (
                      <motion.div
                        key={t.id}
                        whileHover={{ x: 3 }}
                        onClick={() => {
                          onNavigate('studies', t.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-800 font-mono">{t.code}</span>
                            <span className="text-xs text-slate-500">• {t.phase}</span>
                            <span className="text-[11px] font-mono text-slate-400">{t.ctriNumber}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                            {t.shortTitle}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Events Section */}
              {filteredEvents.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    Safety & Pharmacovigilance ({filteredEvents.length})
                  </p>
                  <div className="space-y-1.5">
                    {filteredEvents.slice(0, 2).map(e => (
                      <motion.div
                        key={e.id}
                        whileHover={{ x: 3 }}
                        onClick={() => {
                          onNavigate('pv', e.trialCode);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-rose-700 font-mono">{e.id}</span>
                            <span className="text-xs font-bold text-slate-800">{e.eventTerm}</span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {e.trialCode} • Participant {e.participantId} • {e.suspectDrug}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Patients Section */}
              {filteredPatients.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                    Participants & Prakriti ({filteredPatients.length})
                  </p>
                  <div className="space-y-1.5">
                    {filteredPatients.slice(0, 2).map(p => (
                      <motion.div
                        key={p.id}
                        whileHover={{ x: 3 }}
                        onClick={() => {
                          onNavigate('patients', p.trialCode);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-teal-800 font-mono">{p.id}</span>
                            <span className="text-xs font-bold text-slate-800">{p.name} ({p.age}y {p.sex})</span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Prakriti: <span className="text-emerald-700 font-bold">{p.prakriti}</span> • {p.trialCode}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700 font-medium">
              <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold">⌘K</kbd> anytime to open</span>
              <span>AIIA Central Search Engine</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
