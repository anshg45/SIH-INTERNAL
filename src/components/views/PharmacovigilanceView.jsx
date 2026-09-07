import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertOctagon,
  Clock,
  FileCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Search,
  Plus,
  Send,
  Download
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import StatusBadge from '../common/StatusBadge';
import { PHARMACOVIGILANCE_EVENTS, CLINICAL_TRIALS } from '../../data/mockData';
import { ROLE_TAB_CONFIG } from '../../data/roleDashboardConfig';
import { getPersonalizedDashboard } from '../../data/roleDashboardConfig';

export default function PharmacovigilanceView({
  onOpenSaeModal,
  selectedTrialId,
  currentRole,
  currentUserName,
  currentUserEmail
}) {
  const [events, setEvents] = useState(PHARMACOVIGILANCE_EVENTS);
  const [filterType, setFilterType] = useState("ALL");
  const [selectedCase, setSelectedCase] = useState(PHARMACOVIGILANCE_EVENTS[0]);
  const [transmittedNotice, setTransmittedNotice] = useState(false);
  const allowedTabs = ROLE_TAB_CONFIG.pv?.[currentRole] || ['all'];
  const [workspaceTab, setWorkspaceTab] = useState(allowedTabs[0]);
  const assignedTrialCodes = new Set(getPersonalizedDashboard(currentRole, currentUserName, currentUserEmail).assignedTrials?.map((trial) => trial.code) || []);

  const isRegulator = currentRole === 'regulator';

  const filteredEvents = events.filter(e => {
    if (currentRole === 'iec' && e.type !== 'SAE') return false;
    if (currentRole === 'pi' && !assignedTrialCodes.has(e.trialId)) return false;
    if (filterType === "SAE" || workspaceTab === 'sae') return e.type === "SAE";
    if (filterType === "AE" || workspaceTab === 'ae') return e.type === "AE";
    return true;
  });

  const handleTransmitCdsco = () => {
    setTransmittedNotice(true);
    setTimeout(() => {
      alert("Form 44 Expedited Notification successfully transmitted to CDSCO & Licensing Authority. Cryptographic leaf anchored to Polygon Amoy.");
    }, 400);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-rose-950 via-slate-900 to-rose-950 p-6 rounded-2xl text-white shadow-md border border-rose-900/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-900/80 text-rose-200 border border-rose-600/40">
              National Pharmacovigilance Programme of India
            </span>
            <span className="text-xs text-rose-300 font-medium">
              Peripheral PvPI-Ayush Center, AIIA
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            Pharmacovigilance & Safety Surveillance Command
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Real-time adverse event triage, Naranjo causality scoring, MedDRA coding, and statutory 3-day CDSCO notification management under New Drugs & Clinical Trials Rules 2019.
          </p>
        </div>

        {!isRegulator && (
          <button
            onClick={() => onOpenSaeModal(selectedTrialId)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-950/50 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Report Adverse Event / SAE</span>
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {allowedTabs.map((tab) => (
          <button key={tab} onClick={() => { setWorkspaceTab(tab); setFilterType(tab === 'sae' || tab === 'ae' ? tab.toUpperCase() : 'ALL'); }} className={`px-3 py-2 rounded-lg text-xs font-bold capitalize ${workspaceTab === tab ? 'bg-rose-700 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* 4 Urgency KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Open AE/SAE Cases"
          value={`${events.length} Total`}
          subvalue="All Protocols"
          trend="Active Surveillance"
          trendPositive={true}
          icon={ShieldAlert}
          iconBg="bg-amber-50 text-amber-700"
          sparklineData={[2, 3, 2, 4, 3, 4]}
          sparklineColor="#d97706"
        />
        <KpiCard
          title="Critical Expedited (SAE)"
          value="1 Active"
          subvalue="Angioedema (PT-1082)"
          trend="18h Remaining"
          trendPositive={false}
          icon={AlertOctagon}
          iconBg="bg-rose-50 text-rose-700"
          alertPulsing={true}
          sparklineData={[0, 0, 1, 0, 1, 1]}
          sparklineColor="#e11d48"
        />
        <KpiCard
          title="Naranjo Probable"
          value="2 Cases"
          subvalue="Score >= 5"
          trend="Herb-Drug Assessed"
          trendPositive={true}
          icon={Calculator}
          iconBg="bg-teal-50 text-teal-700"
          sparklineData={[1, 1, 2, 2, 2, 2]}
          sparklineColor="#0d9488"
        />
        <KpiCard
          title="CDSCO Form 44"
          value="1 Pending Sign"
          subvalue="Statutory 72h Gate"
          trend="Due Tomorrow"
          trendPositive={false}
          icon={FileCheck}
          iconBg="bg-indigo-50 text-indigo-700"
          sparklineData={[0, 0, 0, 1, 1, 1]}
          sparklineColor="#4f46e5"
        />
      </div>

      {/* Pulsing Statutory Urgency Box: AYU-NEURO-004 */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-rose-50 via-amber-50 to-rose-50 border-2 border-rose-300 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                  SAE-2026-0904
                </span>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                  Expedited CDSCO Clock: 18 Hours Remaining
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Severe Maculopapular Rash with Periorbital Angioedema (PT-1082)
              </h3>
              <p className="text-xs text-slate-600">
                Trial: <strong>AYU-NEURO-004</strong> (Standardized Ashwagandha 500mg BD) • Onset: <strong>2026-09-02 08:30 IST</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTransmitCdsco}
              disabled={transmittedNotice || isRegulator}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
                transmittedNotice
                  ? 'bg-emerald-600 text-white cursor-default'
                  : isRegulator
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              {transmittedNotice ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Form 44 Transmitted (Ref #CDSCO-9912)</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Sign & Expedite Form 44 to CDSCO</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 border-t border-rose-200 text-xs text-slate-700">
          <div><strong>Naranjo Rating:</strong> Score 6 (Probable Causality)</div>
          <div><strong>Ayush Etiology:</strong> Asatmya (Idiosyncratic Allergy)</div>
          <div><strong>Current Status:</strong> Inpatient Hospitalized (Stabilized)</div>
          <div><strong>DSMB Directive:</strong> Batch WS-EXT-2025-B04 Paused</div>
        </div>
      </div>

      {/* Main Inbox & Case Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AE/SAE Inbox Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Adverse Events Triage Inbox</h3>
                <p className="text-xs text-slate-500">Categorized by statutory urgency</p>
              </div>

              <div className="flex items-center bg-slate-200/70 p-0.5 rounded-xl text-xs font-semibold">
                {["ALL", "SAE", "AE"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      filterType === type ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedCase(evt)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-50 ${
                    selectedCase?.id === evt.id
                      ? 'bg-rose-50/60 border-l-4 border-rose-600'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          evt.type === 'SAE' ? 'bg-rose-100 text-rose-900' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {evt.id}
                        </span>
                        <span className="font-mono text-xs text-slate-500">• {evt.trialCode}</span>
                        <span className="text-xs text-slate-600">Subject {evt.participantId}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {evt.eventTerm}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        {evt.suspectDrug} (Batch: {evt.batchNumber})
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        evt.urgencyLevel === 'CRITICAL'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : evt.urgencyLevel === 'MEDIUM'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {evt.urgencyLevel}
                      </span>
                      <p className="text-[11px] font-semibold text-slate-500 mt-1">
                        {evt.deadlineHoursRemaining < 72 ? `${evt.deadlineHoursRemaining}h left` : 'Routine'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Peripheral Center ID: PvPI-AYU-DL-001</span>
            <span>Total Logged: {events.length} Events</span>
          </div>
        </div>

        {/* Right: Detailed Dossier & Causality Card (5 Cols) */}
        {selectedCase && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-mono">
                  {selectedCase.type} CASE DOSSIER
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedCase.eventTerm}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedCase.medDraTerm}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-slate-500 text-[11px]">Participant</p>
                  <p className="font-bold text-slate-800">{selectedCase.participantId} ({selectedCase.participantAge}y {selectedCase.participantSex})</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-slate-500 text-[11px]">Severity Grade</p>
                  <p className="font-bold text-rose-700">{selectedCase.severity}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
                <p className="font-bold text-teal-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-teal-700" />
                  Naranjo Adverse Drug Reaction Algorithm
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span>Computed Score: <strong className="font-mono text-sm text-teal-900">{selectedCase.naranjoScore} / 10</strong></span>
                  <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    {selectedCase.naranjoCausality}
                  </span>
                </div>
                <p className="text-[11px] text-teal-900 pt-1">
                  <strong>Ayush Specific Etiology:</strong> {selectedCase.ayushSpecificCausality}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-semibold text-slate-700">Clinical Investigator Observations:</p>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedCase.investigatorNotes}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-slate-700">Clinical Outcome:</p>
                <p className="text-slate-800 font-medium">{selectedCase.outcome}</p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-slate-700">Action Required:</p>
                <p className="text-rose-700 font-semibold">{selectedCase.actionRequired}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">PvPI Officer: {selectedCase.pvLead}</span>
              <button className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Export CIOMS / Form 44
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
