import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Users,
  AlertOctagon,
  Calendar,
  FileText,
  Blocks,
  FileCode2,
  FileOutput,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Plus,
  Info
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import {
  CLINICAL_TRIALS,
  PATIENTS_REGISTRY,
  PHARMACOVIGILANCE_EVENTS,
  BLOCKCHAIN_AUDIT_LOG,
  FHIR_R4_RESOURCES,
  CDISC_SDTM_DATASETS
} from '../../data/mockData';
import { ROLE_TAB_CONFIG } from '../../data/roleDashboardConfig';

export default function StudyDetailView({
  selectedTrialId,
  onSelectTrial,
  onOpenScreeningModal,
  onOpenSaeModal,
  currentRole
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Fallback to first trial if not provided
  const trial = CLINICAL_TRIALS.find(t => t.id === selectedTrialId) || CLINICAL_TRIALS[0];
  const isRegulator = currentRole === 'regulator';
  const allowedTabs = ROLE_TAB_CONFIG.studies?.[currentRole] || [];

  // Filter trial-specific data
  const trialPatients = PATIENTS_REGISTRY.filter(p => p.trialId === trial.id);
  const trialSafetyEvents = PHARMACOVIGILANCE_EVENTS.filter(e => e.trialId === trial.id);
  const trialAuditLogs = BLOCKCHAIN_AUDIT_LOG.filter(l => l.studyId === trial.id);

  const tabs = [
    { id: "overview", label: "Overview & Protocol", icon: Info },
    { id: "enrollment", label: `Enrollment (${trial.currentEnrollment}/${trial.targetEnrollment})`, icon: Users },
    { id: "visits", label: "Patient Visits & eCRF", icon: Calendar },
    { id: "deviations", label: `Deviations (${trial.openDeviations})`, icon: AlertTriangle },
    { id: "safety", label: `Safety & PvPI (${trial.safetyEventsCount})`, icon: AlertOctagon },
    { id: "milestones", label: "Milestones", icon: Clock },
    { id: "documents", label: "Documents & ICF", icon: FileText },
    { id: "audit", label: "Blockchain Trail", icon: Blocks },
    { id: "fhir", label: "FHIR R4 JSON", icon: FileCode2 },
    { id: "cdisc", label: "CDISC SDTM", icon: FileOutput }
  ].filter((tab) => allowedTabs.includes(tab.id));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Study Header & CTRI Hard Gate Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        {/* Trial Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap mr-1">
            Active Study:
          </span>
          {CLINICAL_TRIALS.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTrial(t.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                trial.id === t.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{t.code}</span>
              {t.ctriLocked && <Lock className="w-3 h-3 text-amber-400" />}
              {t.criticalSaeAlert && <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />}
            </button>
          ))}
        </div>

        {/* Title, Metadata & Enrollment Action */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md border border-emerald-300">
                {trial.code}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {trial.phase}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                {trial.domain}
              </span>
              <StatusBadge status={trial.status} size="md" />
            </div>

            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {trial.title}
            </h1>

            {/* Visual Scientist & Formulation Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1.5 pb-0.5">
              <div className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-xl border border-slate-200/80">
                <img
                  src="/images/doctor_scientist_portrait.jpg"
                  alt={trial.pi}
                  className="w-9 h-9 rounded-lg object-cover border border-emerald-400/40 shadow-xs"
                />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Principal Investigator</p>
                  <p className="text-xs font-bold text-slate-800">{trial.pi}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-xl border border-slate-200/80">
                <img
                  src="/images/ayurvedic_lab_research.jpg"
                  alt="Standardized Formulation"
                  className="w-9 h-9 rounded-lg object-cover border border-teal-400/40 shadow-xs"
                />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Standardized Regimen</p>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{trial.formulation}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
              <span>Site: <strong className="text-slate-800">{trial.site}</strong></span>
              <span>•</span>
              <span>IEC Clearance: <strong className="text-slate-800 font-mono">{trial.iecClearance}</strong></span>
              <span>•</span>
              <span>CTRI Status: <strong className="text-emerald-700 font-semibold">{trial.ctriStatus}</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2 shrink-0">
            {trial.ctriLocked ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>Enrollment Locked</span>
                </div>
                <p className="text-[11px] text-amber-800 mt-1 max-w-[200px]">
                  CTRI registration pending verification under Rule 75.
                </p>
                <button
                  disabled
                  className="mt-2 w-full py-2 rounded-lg bg-slate-200 text-slate-400 font-bold text-xs cursor-not-allowed"
                >
                  🔒 Enroll Participant
                </button>
              </div>
            ) : (
              <>
                {!isRegulator && (
                  <button
                    onClick={() => onOpenScreeningModal(trial.id)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Screen & Enroll Patient</span>
                  </button>
                )}
                {!isRegulator && (
                  <button
                    onClick={() => onOpenSaeModal(trial.id)}
                    className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    <span>Report Adverse Event</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTRI Hard Gate Warning Banner when trial is locked */}
        {trial.ctriLocked && (
          <div className="p-4 rounded-xl bg-amber-50/90 border-2 border-amber-400 text-amber-950 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-200 text-amber-900 shrink-0 mt-0.5">
              <Lock className="w-5 h-5 text-amber-800 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-amber-950">
                  🔒 STATUTORY HARD GATE ENFORCED: CTRI REGISTRATION REQUIRED BEFORE PATIENT ENROLLMENT
                </h4>
                <span className="font-mono text-[11px] bg-amber-200 px-2 py-0.5 rounded font-bold">
                  Rule 75 NDCT Rules 2019
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {trial.ctriLockReason}
              </p>
              <div className="pt-1 flex items-center gap-3 text-xs">
                <span>ICMR Reference: <strong className="font-mono">{trial.ctriNumber}</strong></span>
                <span>•</span>
                <span>IEC Clearance Status: <strong className="text-emerald-800">Approved ({trial.iecClearance})</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Study Milestones Progress Timeline */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Regulatory & Clinical Milestones Timeline</span>
            <span className="text-emerald-700 font-bold">
              {trial.completionRate}% Accrual Completed
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900">
              <p className="font-bold text-[11px]">1. Protocol</p>
              <p className="text-[10px] text-emerald-700">✓ Submitted</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900">
              <p className="font-bold text-[11px]">2. IEC Ethics</p>
              <p className="text-[10px] text-emerald-700">✓ Approved</p>
            </div>
            <div className={`p-2 rounded-lg border ${
              trial.ctriLocked
                ? 'bg-amber-100 border-amber-300 text-amber-950 ring-2 ring-amber-400'
                : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
            }`}>
              <p className="font-bold text-[11px]">3. CTRI Reg</p>
              <p className={`text-[10px] font-semibold ${trial.ctriLocked ? 'text-amber-800' : 'text-emerald-700'}`}>
                {trial.ctriLocked ? '⏳ Pending' : '✓ Verified'}
              </p>
            </div>
            <div className={`p-2 rounded-lg border ${
              trial.ctriLocked
                ? 'bg-slate-50 border-slate-200 text-slate-400'
                : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
            }`}>
              <p className="font-bold text-[11px]">4. Site Active</p>
              <p className="text-[10px] text-emerald-700">{trial.ctriLocked ? 'Locked' : '✓ Ready'}</p>
            </div>
            <div className={`p-2 rounded-lg border ${
              trial.currentEnrollment > 0
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <p className="font-bold text-[11px]">5. Enrolling</p>
              <p className="text-[10px] text-emerald-700">{trial.currentEnrollment} Subjects</p>
            </div>
            <div className={`p-2 rounded-lg border ${
              trial.status === 'Database Lock'
                ? 'bg-blue-100 border-blue-300 text-blue-950'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <p className="font-bold text-[11px]">6. Closeout</p>
              <p className="text-[10px] text-slate-500">{trial.status === 'Database Lock' ? 'In Progress' : 'Pending'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10 Workspace Tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl overflow-x-auto border border-slate-200/80 shadow-2xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                isActive
                  ? 'text-emerald-950'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeStudyTabIndicator"
                  className="absolute inset-0 bg-white rounded-xl shadow-xs border border-emerald-600/20"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Protocol Synopsis</h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {trial.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Primary Efficacy Endpoint</h3>
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium">
                    {trial.primaryEndpoint}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Secondary Endpoints</h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {trial.secondaryEndpoints.map((ep, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Investigational Medicinal Product (IMP) Specification
                  </h3>
                  <div className="space-y-2 text-xs text-slate-700">
                    <p><strong>Formulation:</strong> {trial.formulation}</p>
                    <p><strong>Ayurvedic Classification:</strong> {trial.domain}</p>
                    <p><strong>Storage:</strong> Standard Room Temperature (20-25°C), Controlled Humidity</p>
                    <p><strong>Dispensation Protocol:</strong> Controlled pharmacy dispensation via CTMS e-Prescription</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Statutory Approvals & Registrations
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">CTRI Registration:</span>
                      <span className="font-mono font-bold text-emerald-800">{trial.ctriNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">IEC Ethical Clearance:</span>
                      <span className="font-mono font-bold text-slate-800">{trial.iecClearance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Blockchain Block Anchor:</span>
                      <span className="font-mono font-bold text-teal-800">Polygon Amoy #{trial.lastAuditBlock}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ENROLLMENT TAB */}
        {activeTab === 'enrollment' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Enrolled Trial Participants</h3>
                <p className="text-xs text-slate-500">
                  {trial.currentEnrollment} participants assigned to this protocol
                </p>
              </div>
              {!trial.ctriLocked && !isRegulator && (
                <button
                  onClick={() => onOpenScreeningModal(trial.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Screen New Subject
                </button>
              )}
            </div>

            {trialPatients.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <Lock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">No Participants Enrolled</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {trial.ctriLocked
                    ? "Patient enrollment is locked by statutory gate until CTRI registration verification clears."
                    : "Click 'Screen New Subject' to initiate the 3-step screening protocol."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-2.5 px-3">Subject ID</th>
                      <th className="py-2.5 px-3">Name & Age</th>
                      <th className="py-2.5 px-3">Ayurvedic Prakriti</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">eCRF Completion</th>
                      <th className="py-2.5 px-3">Next Visit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {trialPatients.map((pt) => (
                      <tr key={pt.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{pt.id}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{pt.name} ({pt.age}y {pt.sex})</td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {pt.prakriti}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">{pt.status}</td>
                        <td className="py-2.5 px-3 font-mono">{pt.eCrfCompletion}%</td>
                        <td className="py-2.5 px-3 text-slate-600">{pt.nextVisitDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 3. VISITS TAB */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Protocol Visit Matrix & eCRF Status</h3>
            <p className="text-xs text-slate-500">
              Standardized visit intervals: Day 0 (Screening), Day 14 (V2), Day 30 (V3), Day 60 (V4), Day 90 (V5 Closeout)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {[
                { name: "Visit 1 (Day 0)", desc: "Screening & Baseline Prakriti", status: "Completed", count: trial.currentEnrollment },
                { name: "Visit 2 (Day 14)", desc: "Tolerability & Dose Check", status: "Active", count: Math.floor(trial.currentEnrollment * 0.85) },
                { name: "Visit 3 (Day 30)", desc: "Primary Biomarker Panel", status: "Active", count: Math.floor(trial.currentEnrollment * 0.7) },
                { name: "Visit 4 (Day 60)", desc: "Efficacy Assessment", status: "Active", count: Math.floor(trial.currentEnrollment * 0.5) },
                { name: "Visit 5 (Day 90)", desc: "Closeout & Endpoint Audit", status: "Upcoming", count: Math.floor(trial.currentEnrollment * 0.25) }
              ].map((v, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                    Step {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{v.name}</h4>
                  <p className="text-[11px] text-slate-500">{v.desc}</p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-700">{v.count} Completed</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      {v.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. DEVIATIONS TAB */}
        {activeTab === 'deviations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Protocol Deviations Register</h3>
                <p className="text-xs text-slate-500">
                  Monitored under ICH E6(R2) GCP Quality Management
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                {trial.openDeviations} Active Deviation
              </span>
            </div>

            {trial.openDeviations > 0 ? (
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-orange-950 font-mono">DEV-2026-003</span>
                  <span className="px-2 py-0.5 bg-orange-200 text-orange-900 rounded text-[10px]">
                    Minor Deviation
                  </span>
                </div>
                <p className="text-orange-900">
                  <strong>Description:</strong> Subject PT-1033 completed Visit 3 on Day 34 instead of protocol target Day 30 (+4 day visit window deviation due to patient travel).
                </p>
                <p className="text-orange-800">
                  <strong>Corrective Action:</strong> Investigational product accountability verified. No missed doses. PI approved continuation.
                </p>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">Zero Protocol Deviations</p>
                <p className="text-xs text-slate-400 mt-0.5">Trial is operating within strict GCP compliance parameters.</p>
              </div>
            )}
          </div>
        )}

        {/* 5. SAFETY TAB */}
        {activeTab === 'safety' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Trial Safety & Adverse Events Log</h3>
                <p className="text-xs text-slate-500">
                  PvPI-Ayush surveillance and statutory notification status
                </p>
              </div>
              {!isRegulator && (
                <button
                  onClick={() => onOpenSaeModal(trial.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <AlertOctagon className="w-3.5 h-3.5" /> Report Safety Event
                </button>
              )}
            </div>

            {trialSafetyEvents.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">No Adverse Events Logged</p>
                <p className="text-xs text-slate-400 mt-0.5">No treatment-emergent adverse reactions reported to date.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {trialSafetyEvents.map((e) => (
                  <div key={e.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-rose-800">{e.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900 uppercase">
                          {e.type} • {e.severity}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-rose-700">
                        {e.statutoryDeadline} ({e.deadlineHoursRemaining}h remaining)
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{e.eventTerm}</p>
                    <p className="text-slate-600">{e.investigatorNotes}</p>
                    <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Naranjo Rating: <strong>Score {e.naranjoScore} ({e.naranjoCausality})</strong></span>
                      <span>Suspect Formulation: <strong>{e.suspectDrug}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. MILESTONES TAB */}
        {activeTab === 'milestones' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">GCP Clinical Milestones & Deliverables</h3>
            <div className="space-y-2 text-xs">
              {[
                { title: "Protocol Finalization & Bioethics Submission", date: trial.iecApprovalDate, status: "Completed" },
                { title: "CTRI Public Registry Verification", date: trial.startDate, status: trial.ctriLocked ? "Pending Verification" : "Completed" },
                { title: "Site Initiation Visit (SIV) & GCP Training", date: "2025-05-05", status: trial.ctriLocked ? "Locked" : "Completed" },
                { title: "50% Participant Accrual Interim Analysis", date: "2026-02-15", status: trial.currentEnrollment >= 90 ? "Completed" : "Active" },
                { title: "Final Participant Last Visit (LPLV)", date: trial.targetEndDate, status: "Planned" }
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{m.title}</p>
                    <p className="text-[11px] text-slate-500">Target Date: {m.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    m.status.includes('Pending') || m.status === 'Locked' ? 'bg-amber-100 text-amber-900' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Trial Master File (TMF) Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { name: `${trial.code}_Clinical_Protocol_v2.1.pdf`, type: "Study Protocol", size: "3.4 MB", status: "IEC Approved" },
                { name: `Informed_Consent_Form_Hindi_English_v2.1.pdf`, type: "Patient ICF", size: "1.2 MB", status: "IEC Approved" },
                { name: `Investigator_Brochure_Ayush_IMP_v3.pdf`, type: "Investigator Brochure", size: "5.8 MB", status: "Verified" },
                { name: `CTRI_Registration_Certificate.pdf`, type: "Regulatory", size: "850 KB", status: trial.ctriLocked ? "Pending" : "Active" }
              ].map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-mono font-bold text-slate-800">{doc.name}</p>
                    <p className="text-[11px] text-slate-500">{doc.type} • {doc.size}</p>
                    <span className="inline-block text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded">
                      {doc.status}
                    </span>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-emerald-700 transition-colors" title="Download Document">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. AUDIT TRAIL TAB */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Trial Cryptographic Audit Chain</h3>
                <p className="text-xs text-slate-500">Immutable SHA-256 blocks anchored on Polygon Amoy testnet</p>
              </div>
              <span className="font-mono text-xs text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                Block #{trial.lastAuditBlock}
              </span>
            </div>

            <div className="space-y-2">
              {trialAuditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{log.event}</span>
                    <span className="text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                  <div className="pt-1 font-mono text-[11px] text-emerald-800 flex items-center justify-between">
                    <span>Hash: {log.currentHash}</span>
                    <span className="text-teal-700">Polygon Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. FHIR TAB */}
        {activeTab === 'fhir' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ayush-FHIR R4 ResearchStudy Resource</h3>
                <p className="text-xs text-slate-500">HL7 FHIR R4 JSON representation with Ayush extensions</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-mono font-semibold">
                FHIR R4 Compliant
              </span>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto max-h-[380px]">
              {JSON.stringify(FHIR_R4_RESOURCES.ResearchStudy, null, 2)}
            </pre>
          </div>
        )}

        {/* 10. CDISC SDTM TAB */}
        {activeTab === 'cdisc' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">CDISC SDTM Submission Preview</h3>
                <p className="text-xs text-slate-500">Standardized SDTM Demographics (DM) Dataset for {trial.code}</p>
              </div>
              <button className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Export SDTM CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-mono text-[11px]">
                    {CDISC_SDTM_DATASETS.DM.columns.map((c) => (
                      <th key={c} className="py-2 px-2.5 border border-slate-200">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CDISC_SDTM_DATASETS.DM.rows.filter(r => r.STUDYID === trial.id).map((row, idx) => (
                    <tr key={idx} className="font-mono text-slate-800 hover:bg-slate-50">
                      {CDISC_SDTM_DATASETS.DM.columns.map((c) => (
                        <td key={c} className="py-2 px-2.5 border border-slate-200">{row[c] || "-"}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
